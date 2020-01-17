import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import {
  createLevelheadAPI,
  LevelheadAPI
} from "./api";

type HttpMethod = "get"|"post"|"patch"|"put"|"delete";
type RumpusServer = "local"|"dev"|"beta";
export type VersionedItem = 'privacy'|'terms'|'terms-rce'|'rumpus';

export interface DelegationOptions {
  delegationKey?: string,
  doNotUseKey?: boolean
}

export interface RequestOptions extends DelegationOptions {
  body?: any,
  query?: {[param:string]:string|number|boolean|undefined}
}

export interface RumpusResponse {
  status: number,
  data: any,
  meta?: any,
  message?: string,
  location?: string,
  next?: string,
  errors: any[],
  headers: {[header:string]:string},
  requestId: string,
  remainingRequests: number,
}

/** Class for interacting with the Rumpus CE API. */
export default class RumpusCE {

  private _server: RumpusServer;
  private _request: AxiosInstance;
  private _levelheadAPI: LevelheadAPI;
  private _baseUrl: string;

  constructor(
    public defaultDelegationKey:string|undefined = process.env.RUMPUS_DELEGATION_KEY,
    server:RumpusServer = 'beta',
    auth?:{username:string,password:string}
  ){
    this._server = server;
    this._baseUrl = server == 'local'
      ? 'http://localhost:8080'
      : `https://${this._server}.bscotch.net`;
    this._request = axios.create({baseURL:this._baseUrl,auth});
    this._levelheadAPI = createLevelheadAPI(this);
  }

  /** Rumpus has multiple servers for different stages of development. */
  get server(){
    return this._server;
  }

  /** Given the specific Rumpus server this RumpusCE instance is talking to, the base URL making up the root of all requests. */
  get baseUrl(){ return this._baseUrl; }

  /** The Rumpus CE Levelhead API, as a nested collection of methods. */
  get levelhead(){ return this._levelheadAPI; }

  /** Fetch version information from Rumpus, including server and legal doc versions.
   * Useful for triggering events on change (e.g. when the server version changes,
   * that might indicate broken or new funcionality; when legal docs change, the change
   * in version is considered your notice).
   * */
  async version(){
    const res = await this.get('/api/version',{doNotUseKey:true});
    return {
      server: this._server,
      rumpus: res.data as string,
      terms: res.headers['version-terms'],
      'terms-rce': res.headers['version-terms-rce'],
      privacy: res.headers['version-privacy']
    };
  }

  /** Get the list of permissions for a given Delegation Key.
   * Useful for verifying that your calls to Rumpus CE will succeed.
   */
  async delegationKeyPermissions(delegationKey?:string){
    const res = await this.get('/api/delegation/keys/@this',{delegationKey});
    if(res.status==200){
      return {
        userId: res.data.userId,
        passId: res.data.passId,
        permissions: res.data.permissions
      };
    }
    else if([400,403].includes(res.status)){
      throw new Error("Malformed or missing delegation key.");
    }
    else if(res.status==401){
      throw new Error("Expired delegation key.");
    }
    else{
      throw new Error("Unexpected server response.");
    }
  }

  /** Send a GET request to Rumpus CE. */
  get (url:string,options?:RequestOptions){
    return this.request('get',url,options);
  }

  /** Send a POST request to Rumpus CE. */
  post (url:string,options?:RequestOptions){
    return this.request('post',url,options);
  }

  /** Send a PUT request to Rumpus CE. */
  put (url:string,options?:RequestOptions){
    return this.request('put',url,options);
  }

  /** Send a PATCH request to Rumpus CE. */
  patch (url:string,options?:RequestOptions){
    return this.request('patch',url,options);
  }

  delete (url:string,options?:RequestOptions){
    return this.request('delete',url,options);
  }

  /** Send a request to Rumpus CE. */
  async request(method:HttpMethod,url:string,options?:RequestOptions){
    const headers: {'Rumpus-Delegation-Key'?:string} = {};
    const key = options?.delegationKey || this.defaultDelegationKey;
    if(!options?.doNotUseKey && key){
      headers['Rumpus-Delegation-Key'] = key;
    }
    const reqOpts: AxiosRequestConfig = {
      method,
      url,
      headers,
      responseType: 'json',
    };
    reqOpts.data = options?.body;
    reqOpts.params = options?.query;
    let res: AxiosResponse;
    try{
      res = await this._request(reqOpts);
    }
    catch(err){
      if(!err.response){
        // Something terrible has happened!
        throw err;
      }
      // Don't assume that an 'error' response truly is an error,
      // since the meaning of e.g. a 404 is endpoint-specific.
      res = err.response;
    }
    return {
      ...res.data,
      headers:res.headers,
      status: res.status,
      requestId: res.headers['x-request-id'],
      remainingRequests: res.headers['x-rate-limit-remaining']
    } as RumpusResponse;
  }
}

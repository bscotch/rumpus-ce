import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import {createLevelheadAPI,LevelheadAPI} from "./api";

type Method = "get"|"post"|"patch"|"put"|"delete";
type Server = "dev"|"beta";
export type VersionedItem = 'privacy'|'terms'|'terms-rce'|'rumpus';

export interface DelegationOptions {
  delegationKey?: string,
  doNotUseKey?: boolean
}

interface RequestOptions extends DelegationOptions {
  body?: any,
  query?: {[param:string]:string|number|boolean|undefined}
}

interface RumpusResponse {
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

export default class RumpusCE {

  private _server: Server;
  private _request: AxiosInstance;
  private _levelheadAPI: LevelheadAPI;

  constructor(
    public defaultDelegationKey:string|undefined = process.env.RUMPUS_DELEGATION_KEY,
    server:Server = 'beta'
  ){
    this._server = server;
    this._request = axios.create({baseURL:`https://${this._server}.bscotch.net`});
    this._levelheadAPI = createLevelheadAPI(this);
  }

  get levelhead(){
    return this._levelheadAPI;
  }

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
      throw new Error("Unexpected server responsel.");
    }
  }

  get (url:string,options?:RequestOptions){
    return this.request('get',url,options);
  }

  post (url:string,options?:RequestOptions){
    return this.request('post',url,options);
  }

  put (url:string,options?:RequestOptions){
    return this.request('put',url,options);
  }

  patch (url:string,options?:RequestOptions){
    return this.request('patch',url,options);
  }

  delete (url:string,options?:RequestOptions){
    return this.request('delete',url,options);
  }

  async request(method:Method,url:string,options?:RequestOptions): Promise<RumpusResponse>{
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
    };
  }
}

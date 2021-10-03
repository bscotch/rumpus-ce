// Prevent Typescript errors on the Node side in Axios:
/// <reference lib="DOM" />

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type { DelegationKey } from '../types/auth.js';
import { createLevelheadAPI, LevelheadAPI } from './api/index.js';

type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';
type RumpusServer = 'local' | 'dev' | 'beta';
export type VersionedItem = 'privacy' | 'terms' | 'terms-rce' | 'rumpus';

export interface DelegationOptions {
  delegationKey?: string;
  doNotUseKey?: boolean;
}

export interface RequestOptions extends DelegationOptions {
  body?: Record<string, any>;
  query?: { [param: string]: string | number | boolean | undefined };
}

export interface RumpusResponse<Data = any> {
  status: number;
  data: Data;
  meta?: any;
  message?: string;
  location?: string;
  next?: string;
  errors: any[];
  headers: { [header: string]: string };
  requestId: string;
  remainingRequests: number;
}

/** Class for interacting with the Rumpus CE API. */
export default class RumpusCE {
  private _server: RumpusServer;
  private _request: AxiosInstance;
  private _levelheadAPI: LevelheadAPI;
  private _baseUrl: string;

  constructor(
    public defaultDelegationKey: string | undefined = process.env
      .RUMPUS_DELEGATION_KEY,
    server: RumpusServer = 'beta',
    auth?: { username: string; password: string },
  ) {
    this._server = server;
    this._baseUrl =
      server == 'local'
        ? 'http://localhost:8080'
        : `https://${this._server}.bscotch.net`;
    this._request = axios.create({ baseURL: this._baseUrl, auth });
    this._levelheadAPI = createLevelheadAPI(this);
  }

  /** Rumpus has multiple servers for different stages of development. */
  get server() {
    return this._server;
  }

  /** Given the specific Rumpus server this RumpusCE instance is talking to, the base URL making up the root of all requests. */
  get baseUrl() {
    return this._baseUrl;
  }

  /** The Rumpus CE Levelhead API, as a nested collection of methods. */
  get levelhead() {
    return this._levelheadAPI;
  }

  /** Fetch version information from Rumpus, including server and legal doc versions.
   * Useful for triggering events on change (e.g. when the server version changes,
   * that might indicate broken or new funcionality; when legal docs change, the change
   * in version is considered your notice).
   * */
  async version() {
    const res = await this.get<string>('/api/version', {
      doNotUseKey: true,
    });
    return {
      server: this._server,
      rumpus: res.data,
      terms: res.headers['version-terms'],
      'terms-rce': res.headers['version-terms-rce'],
      privacy: res.headers['version-privacy'],
    };
  }

  /** Get the list of permissions for a given Delegation Key.
   * Useful for verifying that your calls to Rumpus CE will succeed.
   */
  async delegationKeyPermissions(delegationKey?: string) {
    const res = await this.get<DelegationKey>('/api/delegation/keys/@this', {
      delegationKey,
    });
    if (res.status == 200) {
      return {
        userId: res.data.userId,
        passId: res.data._id,
        permissions: res.data.permissions,
      };
    } else if ([400, 403].includes(res.status)) {
      throw new Error('Malformed or missing delegation key.');
    } else if (res.status == 401) {
      throw new Error('Expired delegation key.');
    } else {
      throw new Error('Unexpected server response.');
    }
  }

  /** Send a GET request to Rumpus CE. */
  get<Data>(url: string, options?: Omit<RequestOptions, 'body'>) {
    return this.request<Data>('get', url, options);
  }

  /** Send a POST request to Rumpus CE. */
  post<Data>(url: string, options?: RequestOptions) {
    return this.request<Data>('post', url, options);
  }

  /** Send a PUT request to Rumpus CE. */
  put<Data>(url: string, options?: RequestOptions) {
    return this.request<Data>('put', url, options);
  }

  /** Send a PATCH request to Rumpus CE. */
  patch<Data>(url: string, options?: RequestOptions) {
    return this.request<Data>('patch', url, options);
  }

  delete<Data>(url: string, options?: Omit<RequestOptions, 'body'>) {
    return this.request<Data>('delete', url, options);
  }

  /** Send a request to Rumpus CE. */
  async request<Data>(
    method: HttpMethod,
    url: string,
    options?: RequestOptions,
  ) {
    const headers: { 'Rumpus-Delegation-Key'?: string } = {};
    const key = options?.delegationKey || this.defaultDelegationKey;
    if (!options?.doNotUseKey && key) {
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
    let res: AxiosResponse<RumpusResponse<Data>>;
    try {
      res = await this._request(reqOpts);
    } catch (err: any) {
      if (!err.response) {
        // Something terrible has happened!
        throw err;
      }
      // Don't assume that an 'error' response truly is an error,
      // since the meaning of e.g. a 404 is endpoint-specific.
      res = err.response;
    }
    return {
      ...res.data,
      headers: res.headers,
      status: res.status,
      requestId: res.headers['x-request-id'],
      remainingRequests: +res.headers['x-rate-limit-remaining'],
    } as RumpusResponse<Data>;
  }

  createLogoUrl(size: number) {
    size = Math.round(Math.min(Math.max(size, 16), 256));
    return `https://img.bscotch.net/fit-in/${size}x${size}/logos/rumpus-ce.png`;
  }
}

import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {csv} from "../../utility";

export interface AliasSearchOptions extends DelegationOptions {
  onlySafe?: boolean,
  maxReports?: number
}

export interface Alias {
  userId: string,
  alias: string,
  avatarId: string,
  context: string
}

export async function getLevelheadAliases(this:RumpusCE, userIds: string[], options?: AliasSearchOptions){
  const query: {userIds:string, onlySafe?:boolean, maxReports?: number} = {
    userIds: csv(userIds)
  };
  const opts: DelegationOptions = {};
  opts.delegationKey = options?.delegationKey;
  opts.doNotUseKey = options?.doNotUseKey;
  if(options?.maxReports && typeof options?.maxReports=='number'){
    query.maxReports = options?.maxReports;
  }
  if(options?.onlySafe){
    query.onlySafe = Boolean(options?.onlySafe);
  }
  const res = await this.get(`/api/levelhead/aliases`,{...opts,query});
  if(res.status==200){
    return res.data as Alias[];
  }
  else{
    throw new Error(`Alias search failed with status ${res.status}`);
  }
}

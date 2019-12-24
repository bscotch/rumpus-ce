import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {cleanQuery,csv} from "../../utility";

export type AliasSearchOptions = {
  userIds: string[]|string,
  onlySafe?: boolean,
  maxReports?: number
}

export interface Alias {
  userId: string,
  alias: string,
  avatarId: string,
  context: string
}

export async function getLevelheadAliases(this:RumpusCE
  , userIds: string|string[]
  , query?: AliasSearchOptions
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/aliases`,{
    ...options,
    query: cleanQuery({...query,userIds:csv(userIds)})
  });
  if(res.status==200){
    return res.data as Alias[];
  }
  else{
    throw new Error(`Alias search failed with status ${res.status}`);
  }
}

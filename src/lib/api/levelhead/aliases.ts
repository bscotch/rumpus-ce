import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {
  cleanQuery,
  csv,
  attachAvatarUrlToArrayItems
} from "../../utility";
import {
  AliasSearch,
  Alias
} from "../../../types/aliases";

/** Search Levelhead aliases. */
export async function getLevelheadAliases(this:RumpusCE
  , userIds: string|string[]
  , query?: AliasSearch
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/aliases`,{
    ...options,
    query: cleanQuery({...query,userIds:csv(userIds)})
  });
  if(res.status==200){
    const aliases = res.data as Alias[];
    attachAvatarUrlToArrayItems(aliases);
    return aliases;
  }
  else{
    throw new Error(`Alias search failed with status ${res.status}`);
  }
}

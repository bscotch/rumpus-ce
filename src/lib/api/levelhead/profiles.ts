import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {cleanQuery} from "../../utility";
import {
  LevelheadProfile,
  LevelheadProfileSearch
} from "./profiles.d";

export async function getLevelheadProfiles(this:RumpusCE
  , query?: LevelheadProfileSearch
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/players`,{
    ...options,
    query:cleanQuery(query)
  });
  if(res.status==200){
    return res.data as LevelheadProfile[];
  }
  else{
    throw new Error(`Profile search failed with status ${res.status}`);
  }
}

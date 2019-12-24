import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {cleanQuery} from "../../utility";
import {
  LevelSearchQueryParams,
  LevelheadLevel
} from "./levels.d";

export async function getLevelheadLevels(this:RumpusCE
  , query?: LevelSearchQueryParams
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/levels`,{
    ...options,
    query:cleanQuery(query)
  });
  if(res.status==200){
    return res.data as LevelheadLevel[];
  }
  else{
    throw new Error(`Level search failed with status ${res.status}`);
  }
}

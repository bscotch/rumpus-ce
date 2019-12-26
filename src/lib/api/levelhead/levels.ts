import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {cleanQuery} from "../../utility";
import {
  LevelheadLevelSearch,
  LevelheadLevel,
  LevelheadLevelTag
} from "./levels.d";

let _cachedlocalizedTags: {[tag:string]:string};

export async function getLevelheadLevelTags(this:RumpusCE
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/level-tags/counts`,{...options});
  if(res.status==200){
    const tags = res.data as LevelheadLevelTag[];
    _cachedlocalizedTags = {};
    for(const tag of tags){
      _cachedlocalizedTags[tag.tag] = tag.name;
    }
    return tags;
  }
  else{
    throw new Error(`Level tags request failed with status ${res.status}`);
  }
}

export async function getLevelheadLevels(this:RumpusCE
  , query?: LevelheadLevelSearch
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/levels`,{
    ...options,
    query:cleanQuery(query)
  });
  if(res.status==200){
    const levels = res.data as LevelheadLevel[];
    for(const level of levels){
      const localizedTags = [];
      for(const tag of level.tags){
        localizedTags.push(_cachedlocalizedTags[tag]);
      }
      level.localizedTags = localizedTags.filter(x=>x);
    }
    return levels;
  }
  else{
    throw new Error(`Level search failed with status ${res.status}`);
  }
}

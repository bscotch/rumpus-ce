import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {cleanQuery} from "../../utility";
import {
  LevelheadLevel,
  LevelheadLevelTag,
  LevelheadLevelSearch,
  LevelheadLevelDownload
} from "./levels.d";

let _cachedlocalizedTags: {[tag:string]:string};

// export function addLevelFunctionality(level:LevelheadLevelDownload){
//   const fancyLevel = level as LevelheadLevel;
//   // fancyLevel.toggleLike()=>{};
// }

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
    const levels = res.data as LevelheadLevelDownload[];
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

async function getLevelheadLevelList(this:RumpusCE
  , listType: 'likes'|'favorites'
  , levelId: string
  , query?: {limit?:number,userIds?:string|string[],beforeId?:string,includeAliases?:boolean}
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/levels/${levelId}/${listType}`,{
    ...options,
    query:cleanQuery(query)
  });
  if(res.status==200){
    // TODO: Add .nextPage() function
    // TODO: Add .aliases() function that returns a list of alias objects per entry
    return res.data as string[];
  }
  else{
    console.log(res);
    throw new Error(`Level ${listType} failed with status ${res.status}`);
  }
}

/** Get the list of userIds for users who liked this level. */
export async function getLevelheadLevelLikes(this:RumpusCE
  , levelId: string
  , query?: {limit?:number,userIds?:string|string[],beforeId?:string,includeAliases?:boolean}
  , options?: DelegationOptions
){
  return getLevelheadLevelList.call(this,'likes',levelId,query,options);
}

/** Get the list of userIds for users who favorited this level. */
export async function getLevelheadLevelFavorites(this:RumpusCE
  , levelId: string
  , query?: {limit?:number,userIds?:string|string[],beforeId?:string,includeAliases?:boolean}
  , options?: DelegationOptions
){
  return getLevelheadLevelList.call(this,'favorites',levelId,query,options);
}


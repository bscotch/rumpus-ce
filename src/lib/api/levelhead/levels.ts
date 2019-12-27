import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {cleanQuery} from "../../utility";
import {
  LevelheadLevel,
  LevelheadLevelTag,
  LevelheadLevelSearch,
  LevelheadLevelDownload
} from "./levels.d";
import {ResultsPage, blankResultsPage} from "..";

let _cachedlocalizedTags: {[tag:string]:string} = {};

// export function addLevelFunctionality(level:LevelheadLevelDownload){
//   const fancyLevel = level as LevelheadLevel ;
//   fancyLevel.getLikes
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

async function getLevelheadLevelUserList(this:RumpusCE
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
    const users = res.data as ResultsPage<{_id:string,userId:string,alias?:string}>;
    const lastId = users.length && (!query?.limit || query.limit == users.length)
      ? users[users.length-1]._id
      : false ;
    users.nextPage = ()=>{
      if(lastId){
        const newQuery = {...query,beforeId:lastId};
        return getLevelheadLevelUserList.bind(this)(listType,levelId,newQuery,options);
      }
      return blankResultsPage();
    };
    return users;
  }
  else{
    throw new Error(`Level ${listType} failed with status ${res.status}`);
  }
}

/** Get the list of userIds for users who liked this level. */
export async function getLevelheadLevelLikes(this:RumpusCE
  , levelId: string
  , query?: {limit?:number,userIds?:string|string[],beforeId?:string,includeAliases?:boolean}
  , options?: DelegationOptions
){
  return getLevelheadLevelUserList.call(this,'likes',levelId,query,options);
}

/** Get the list of userIds for users who favorited this level. */
export async function getLevelheadLevelFavorites(this:RumpusCE
  , levelId: string
  , query?: {limit?:number,userIds?:string|string[],beforeId?:string,includeAliases?:boolean}
  , options?: DelegationOptions
){
  return getLevelheadLevelUserList.call(this,'favorites',levelId,query,options);
}


import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {cleanQuery} from "../../utility";
import {
  ListedUserId,
  LevelheadLevel,
  LevelheadLevelTag,
  LevelheadLevelSearch,
  LevelheadLevelDownload
} from "./levels.d";
import {ResultsPage, blankResultsPage} from "..";

export async function getLevelheadLevelTags(this:RumpusCE
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/level-tags/counts`,{...options});
  if(res.status==200){
    const tags = res.data as LevelheadLevelTag[];
    return tags;
  }
  else{
    throw new Error(`Level tags request failed with status ${res.status}`);
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
    const users = res.data as ResultsPage<ListedUserId>;
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

export interface LevelheadLevelLikesSearch{
  limit?:number,
  userIds?:string|string[],
  beforeId?:string,
  includeAliases?:boolean
}

/** Get the list of userIds for users who liked this level. */
export async function getLevelheadLevelLikes(this:RumpusCE
  , levelId: string
  , query?: LevelheadLevelLikesSearch
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

export function addLevelFunctionality(client:RumpusCE,level:LevelheadLevelDownload){
  const fancyLevel = level as LevelheadLevel ;
  fancyLevel.getLikes = (
    query?: LevelheadLevelLikesSearch,
    options?: DelegationOptions
  )=>getLevelheadLevelLikes.call(client,level.levelId,query,options);
  fancyLevel.getFavorites = (
    query?: LevelheadLevelLikesSearch,
    options?: DelegationOptions
  )=>getLevelheadLevelFavorites.call(client,level.levelId,query,options);
  return fancyLevel;
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
    return levels;
  }
  else{
    throw new Error(`Level search failed with status ${res.status}`);
  }
}

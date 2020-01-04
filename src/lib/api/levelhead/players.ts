import {default as RumpusCE, DelegationOptions} from "../../RumpusCE";
import {cleanQuery} from "../../utility";
import {
  LevelheadPlayerDownload,
  LevelheadPlayer,
  LevelheadPlayerSearch,
  ListedLevelId
} from "./players.d";
import {ResultsPage, blankResultsPage} from "..";

async function getLevelheadPlayerLevelList(this:RumpusCE
  , listType: 'likes'|'favorites'
  , userId: string
  , query?: {limit?:number,levelIds?:string|string[],beforeId?:string,includeAliases?:boolean}
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/players/${userId}/${listType}`,{
    ...options,
    query:cleanQuery(query)
  });
  if(res.status==200){
    const levels = res.data as ResultsPage<ListedLevelId>;
    const lastId = levels.length && (!query?.limit || query.limit == levels.length)
      ? levels[levels.length-1]._id
      : false ;
    levels.nextPage = ()=>{
      if(lastId){
        const newQuery = {...query,beforeId:lastId};
        return getLevelheadPlayerLevelList.bind(this)(listType,userId,newQuery,options);
      }
      return blankResultsPage();
    };
    return levels;
  }
  else{
    throw new Error(`Level ${listType} failed with status ${res.status}`);
  }
}

export interface LevelheadPlayerLikesSearch{
  limit?:number,
  levelIds?:string|string[],
  beforeId?:string
}

/** Get the list of levels liked by a user. */
export async function getLevelheadLikedLevels(this:RumpusCE
  , userId: string
  , query?: LevelheadPlayerLikesSearch
  , options?: DelegationOptions
){
  return getLevelheadPlayerLevelList.call(this,'likes',userId,query,options);
}

/** Get the list of levels favorited by a user. */
export async function getLevelheadFavoritedLevels(this:RumpusCE
  , userId: string
  , query?: LevelheadPlayerLikesSearch
  , options?: DelegationOptions
){
  return getLevelheadPlayerLevelList.call(this,'favorites',userId,query,options);
}

export function addPlayerFunctionality(client:RumpusCE
  , player: LevelheadPlayerDownload
){
  const fancyPlayer = player as LevelheadPlayer ;
  fancyPlayer.getLikedLevels = (
    query?: LevelheadPlayerLikesSearch,
    options?: DelegationOptions
  )=>getLevelheadLikedLevels.call(client,player.userId,query,options);
  fancyPlayer.getFavoritedLevels = (
    query?: LevelheadPlayerLikesSearch,
    options?: DelegationOptions
  )=>getLevelheadFavoritedLevels.call(client,player.userId,query,options);
  return fancyPlayer;
}

export async function getLevelheadPlayers(this:RumpusCE
  , query?: LevelheadPlayerSearch
  , options?: DelegationOptions
){
  const res = await this.get(`/api/levelhead/players`,{
    ...options,
    query:cleanQuery(query)
  });
  if(res.status==200){
    const players = res.data as LevelheadPlayerDownload[];
    return players.map(player=>addPlayerFunctionality(this,player));
  }
  else{
    throw new Error(`Player search failed with status ${res.status}`);
  }
}

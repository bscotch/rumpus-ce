import {
  default as RumpusCE,
  DelegationOptions
} from "../../RumpusCE";
import {
  cleanQuery,
  csv
} from "../../utility";
import {
  BookmarkSearch,
  Bookmark
} from "../../../types/bookmarks";

export async function getLevelheadBookmarks(this:RumpusCE
  , query?: BookmarkSearch
  , options?: DelegationOptions
){
  const queryParams: BookmarkSearch = {...query};
  queryParams.sort = queryParams.sort || 'createdAt';
  const res = await this.get(`/api/levelhead/bookmarks`,{
    ...options,
    query: cleanQuery()
  });
  if(res.status==200){
    return res.data as Bookmark[];
  }
  else{
    throw new Error(`Bookmark search failed with status ${res.status}`);
  }
}


export async function bookmarkLevelheadLevel(this:RumpusCE
  , levelId: string
  , options?: DelegationOptions
){
  const res = await this.put(`/api/levelhead/bookmarks/${levelId}`,options);
  if(res.status != 204){
    console.log(res);
    throw new Error(res.status==404 ? 'Level does not exist!' : 'Unable to bookmark level');
  }
  return true;
}

export async function unbookmarkLevelheadLevel(this:RumpusCE
  , levelId: string
  , options?: DelegationOptions
){
  const res = await this.delete(`/api/levelhead/bookmarks/${levelId}`,options);
  if(res.status != 204){
    console.log(res);
    throw new Error('Unable to unbookmark level');
  }
  return true;
}

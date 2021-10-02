import { default as RumpusCE, DelegationOptions } from '../../RumpusCE.js';
import { cleanQuery } from '../../utility.js';
import type { BookmarkSearch, Bookmark } from '../../../types/bookmarks.js';

/** Search the current user's bookmarks. */
export async function getLevelheadBookmarks(
  this: RumpusCE,
  query?: BookmarkSearch,
  options?: DelegationOptions,
) {
  const queryParams: BookmarkSearch = { ...query };
  queryParams.sort = queryParams.sort || 'createdAt';
  const res = await this.get(`/api/levelhead/bookmarks`, {
    ...options,
    query: cleanQuery(query),
  });
  if (res.status == 200) {
    return res.data as Bookmark[];
  }
  throw new Error(`Bookmark search failed with status ${res.status}`);
}

/** Bookmark a given Levelhead level. */
export async function bookmarkLevelheadLevel(
  this: RumpusCE,
  levelId: string,
  options?: DelegationOptions,
) {
  const res = await this.put(`/api/levelhead/bookmarks/${levelId}`, options);
  if (res.status != 204) {
    console.log(res);
    throw new Error(
      res.status == 404 ? 'Level does not exist!' : 'Unable to bookmark level',
    );
  }
  return true;
}

/** Remove the bookmark for a given Levelhead level (if that bookmark exists). */
export async function unbookmarkLevelheadLevel(
  this: RumpusCE,
  levelId: string,
  options?: DelegationOptions,
) {
  const res = await this.delete(`/api/levelhead/bookmarks/${levelId}`, options);
  if (res.status != 204) {
    console.log(res);
    throw new Error('Unable to unbookmark level');
  }
  return true;
}

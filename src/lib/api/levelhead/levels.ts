import { default as RumpusCE, DelegationOptions } from '../../RumpusCE.js';
import { cleanQuery, attachAvatarUrlToArrayItems } from '../../utility.js';
import type {
  LevelheadLevel,
  LevelheadLevelTag,
  LevelheadLevelSearch,
  LevelheadLevelDownload,
  LevelheadLevelLikesSearch,
} from '../../../types/levels.js';
import type { ListedUserId } from '../../../types/players.js';
import {
  bookmarkLevelheadLevel,
  unbookmarkLevelheadLevel,
} from './bookmarks.js';
import {
  addNextPageSearchFunction,
  ResultsPage,
  blankResultsPage,
} from '../paging.js';

/** Fetch stats and information about all the creator-chosen level tags. */
export async function getLevelheadLevelTags(
  this: RumpusCE,
  options?: DelegationOptions,
) {
  const res = await this.get(`/api/levelhead/level-tags/counts`, {
    ...options,
  });
  if (res.status == 200) {
    const tags = res.data as LevelheadLevelTag[];
    return tags;
  } else {
    throw new Error(`Level tags request failed with status ${res.status}`);
  }
}

/** Get the list of users who liked or favorited a given Level. */
async function getLevelheadLevelUserList(
  this: RumpusCE,
  listType: 'likes' | 'favorites',
  levelId: string,
  query?: LevelheadLevelLikesSearch,
  options?: DelegationOptions,
) {
  const res = await this.get(`/api/levelhead/levels/${levelId}/${listType}`, {
    ...options,
    query: cleanQuery(query),
  });
  if (res.status == 200) {
    const users = res.data as ResultsPage<ListedUserId>;
    const lastId =
      users.length && (!query?.limit || query.limit == users.length)
        ? users[users.length - 1]._id
        : false;
    users.nextPage = () => {
      if (lastId) {
        const newQuery = { ...query, beforeId: lastId };
        return getLevelheadLevelUserList.bind(this)(
          listType,
          levelId,
          newQuery,
          options,
        );
      }
      return blankResultsPage();
    };
    return users;
  } else {
    throw new Error(`Level ${listType} failed with status ${res.status}`);
  }
}

/** Get the list of userIds for users who liked this level. */
export async function getLevelheadLevelLikes(
  this: RumpusCE,
  levelId: string,
  query?: LevelheadLevelLikesSearch,
  options?: DelegationOptions,
) {
  return getLevelheadLevelUserList.call(this, 'likes', levelId, query, options);
}

/** Get the list of userIds for users who favorited this level. */
export async function getLevelheadLevelFavorites(
  this: RumpusCE,
  levelId: string,
  query?: {
    limit?: number;
    userIds?: string | string[];
    beforeId?: string;
    includeAliases?: boolean;
  },
  options?: DelegationOptions,
) {
  return getLevelheadLevelUserList.call(
    this,
    'favorites',
    levelId,
    query,
    options,
  );
}

/** Decorate Level object withs additional convenience functions. */
function addLevelFunctionality(
  client: RumpusCE,
  level: LevelheadLevelDownload,
) {
  const fancyLevel = level as LevelheadLevel;

  fancyLevel.getLikes = (
    query?: LevelheadLevelLikesSearch,
    options?: DelegationOptions,
  ) => getLevelheadLevelLikes.call(client, level.levelId, query, options);

  fancyLevel.getFavorites = (
    query?: LevelheadLevelLikesSearch,
    options?: DelegationOptions,
  ) => getLevelheadLevelFavorites.call(client, level.levelId, query, options);

  fancyLevel.bookmark = (options?: DelegationOptions) =>
    bookmarkLevelheadLevel.call(client, level.levelId, options);

  fancyLevel.unbookmark = (options?: DelegationOptions) =>
    unbookmarkLevelheadLevel.call(client, level.levelId, options);

  return fancyLevel;
}

/** Search for Levelhead levels. */
export async function getLevelheadLevels(
  this: RumpusCE,
  query?: LevelheadLevelSearch,
  options?: DelegationOptions,
) {
  const queryParams: LevelheadLevelSearch = { ...query };
  queryParams.sort = queryParams.sort || 'createdAt';
  const res = await this.get(`/api/levelhead/levels`, {
    ...options,
    query: cleanQuery(queryParams),
  });
  if (res.status == 200) {
    const levels = (res.data as LevelheadLevelDownload[]).map((level) =>
      addLevelFunctionality(this, level),
    ) as ResultsPage<LevelheadLevel>;
    attachAvatarUrlToArrayItems(levels);
    addNextPageSearchFunction(
      this,
      levels,
      res.next,
      queryParams,
      options,
      getLevelheadLevels,
    );
    return levels;
  } else {
    throw new Error(`Level search failed with status ${res.status}`);
  }
}

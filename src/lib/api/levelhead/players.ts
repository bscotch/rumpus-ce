import { default as RumpusCE, DelegationOptions } from '../../RumpusCE.js';
import { cleanQuery } from '../../utility.js';
import type {
  ListedUserId,
  LevelheadPlayerSearch,
  LevelheadPlayerDownload,
  LevelheadPlayerLikesSearch,
  LevelheadPlayerFollowsSearch,
} from '../../../types/players.js';
import type { ListedLevelId } from '../../../types/levels.js';
import {
  ResultsPage,
  blankResultsPage,
  addNextPageSearchFunction,
} from '../paging.js';
import { LevelheadPlayer } from '../classes/LevelheadPlayer.js';

/** Fetch the levels liked or favorited by a given user. */
async function getLevelheadPlayerLevelList(
  this: RumpusCE,
  listType: 'likes' | 'favorites',
  userId: string,
  query?: LevelheadPlayerLikesSearch,
  options?: DelegationOptions,
) {
  const res = await this.get(`/api/levelhead/players/${userId}/${listType}`, {
    ...options,
    query: cleanQuery(query),
  });
  if (res.status == 200) {
    const levels = res.data as ResultsPage<ListedLevelId>;
    const lastId =
      levels.length && (!query?.limit || query.limit == levels.length)
        ? levels[levels.length - 1]._id
        : false;
    levels.nextPage = () => {
      if (lastId) {
        const newQuery = { ...query, beforeId: lastId };
        return getLevelheadPlayerLevelList.bind(this)(
          listType,
          userId,
          newQuery,
          options,
        );
      }
      return blankResultsPage();
    };
    return levels;
  } else {
    throw new Error(`Level ${listType} failed with status ${res.status}`);
  }
}

/** Get the list of levels liked by a user. */
export async function getLevelheadLikedLevels(
  this: RumpusCE,
  userId = '@me',
  query?: LevelheadPlayerLikesSearch,
  options?: DelegationOptions,
) {
  return getLevelheadPlayerLevelList.call(
    this,
    'likes',
    userId,
    query,
    options,
  );
}

/** Get the list of levels favorited by a user. */
export async function getLevelheadFavoritedLevels(
  this: RumpusCE,
  userId = '@me',
  query?: LevelheadPlayerLikesSearch,
  options?: DelegationOptions,
) {
  return getLevelheadPlayerLevelList.call(
    this,
    'favorites',
    userId,
    query,
    options,
  );
}

/** Get the list of followers for a given user, or those the user is following. */
async function getLevelheadPlayerFollows(
  this: RumpusCE,
  listType: 'following' | 'followers',
  userId: string,
  query?: LevelheadPlayerFollowsSearch,
  options?: DelegationOptions,
) {
  const res = await this.get(`/api/levelhead/players/${userId}/${listType}`, {
    ...options,
    query: cleanQuery(query),
  });
  if (res.status == 200) {
    const players = res.data as ResultsPage<ListedUserId>;
    const lastId =
      players.length && (!query?.limit || query.limit == players.length)
        ? players[players.length - 1]._id
        : false;
    players.nextPage = () => {
      if (lastId) {
        const newQuery = { ...query, beforeId: lastId };
        return getLevelheadPlayerFollows.bind(this)(
          listType,
          userId,
          newQuery,
          options,
        );
      }
      return blankResultsPage();
    };
    return players;
  } else {
    throw new Error(
      `Player ${listType} search failed with status ${res.status}`,
    );
  }
}

/** Get the list of users following a given user. */
export async function getLevelheadPlayerFollowers(
  this: RumpusCE,
  userId = '@me',
  query?: LevelheadPlayerFollowsSearch,
  options?: DelegationOptions,
) {
  return getLevelheadPlayerFollows.call(
    this,
    'followers',
    userId,
    query,
    options,
  );
}

/** Get the list of users followed by a given user. */
export async function getLevelheadPlayerFollowing(
  this: RumpusCE,
  userId = '@me',
  query?: LevelheadPlayerFollowsSearch,
  options?: DelegationOptions,
) {
  return getLevelheadPlayerFollows.call(
    this,
    'following',
    userId,
    query,
    options,
  );
}

/** Add a user to the current user's following list. */
export async function followLevelheadPlayer(
  this: RumpusCE,
  userId: string,
  options?: DelegationOptions,
) {
  const res = await this.put(`/api/levelhead/following/${userId}`, options);
  if (res.status != 204) {
    throw new Error(
      res.status == 404 ? 'Player does not exist!' : 'Unable to follow player',
    );
  }
  return true;
}

/** Remove a user from the current user's following list. */
export async function unfollowLevelheadPlayer(
  this: RumpusCE,
  userId: string,
  options?: DelegationOptions,
) {
  const res = await this.delete(`/api/levelhead/following/${userId}`, options);
  if (res.status != 204) {
    throw new Error('Unable to unfollow player');
  }
  return true;
}

/** Search for Levelhead player profiles. */
export async function getLevelheadPlayers(
  this: RumpusCE,
  query?: LevelheadPlayerSearch,
  options?: DelegationOptions,
) {
  const queryParams: LevelheadPlayerSearch = { ...query };
  queryParams.sort = queryParams.sort || 'createdAt';
  const res = await this.get<LevelheadPlayerDownload[]>(
    `/api/levelhead/players`,
    {
      ...options,
      query: cleanQuery(queryParams),
    },
  );
  if (res.status == 200) {
    const players = res.data.map(
      (player) => new LevelheadPlayer(this, player),
    ) as ResultsPage<LevelheadPlayer>;
    addNextPageSearchFunction(
      this,
      players,
      res.next,
      queryParams,
      options,
      getLevelheadPlayers,
    );
    return players;
  } else {
    throw new Error(`Player search failed with status ${res.status}`);
  }
}

/** Get a specific Levelhead player's profile information. */
export async function getLevelheadPlayer(
  this: RumpusCE,
  userId = '@me',
  options?: DelegationOptions,
) {
  const players = await getLevelheadPlayers.call(
    this,
    { userIds: userId, limit: 1 },
    options,
  );
  if (!players.length) {
    throw new Error('That player does not exist');
  }
  return players[0];
}

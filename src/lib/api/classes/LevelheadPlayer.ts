import { LevelheadLevelSearch } from '../../../index.js';
import type {
  LevelheadPlayerDownload,
  LevelheadPlayerLikesSearch,
  LevelheadPlayerFollowsSearch,
} from '../../../types/players.js';
import type { DelegationOptions } from '../../RumpusCE.js';
import type RumpusCE from '../../RumpusCE.js';
import { getLevelheadLevels } from '../levelhead/levels.js';
import {
  followLevelheadPlayer,
  getLevelheadFavoritedLevels,
  getLevelheadLikedLevels,
  getLevelheadPlayerFollowers,
  getLevelheadPlayerFollowing,
  unfollowLevelheadPlayer,
} from '../levelhead/players.js';
import { Alias } from './Alias.js';
import { Base } from './Base.js';

export class LevelheadPlayer extends Base<LevelheadPlayerDownload> {
  private _alias!: Promise<Alias>;

  constructor(client: RumpusCE, data: LevelheadPlayerDownload) {
    super(client, data);
    if (data.alias) {
      this._alias = Promise.resolve(new Alias(client, data.alias));
    }
  }

  get userId() {
    return this.data.userId;
  }

  get createdAt() {
    return new Date(this.data.createdAt);
  }

  get updatedAt() {
    return new Date(this.data.updatedAt);
  }

  get stats() {
    return { ...this.data.stats };
  }

  get alias() {
    if (this._alias) {
      return this._alias;
    }
    this._alias = this.client.levelhead.aliases
      .search(this.userId)
      .then((aliases) => aliases[0]);
    return this._alias;
  }

  get avatarId() {
    return this.alias.then((alias) => alias.avatarId);
  }

  async createAvatarUrl(size: number) {
    return (await this.alias).createAvatarUrl(size);
  }

  /** Get levels published by this user */
  async getLevels(
    this: RumpusCE,
    query?: Omit<LevelheadLevelSearch, 'userIds' | 'levelIds'>,
    options?: DelegationOptions,
  ) {
    return await getLevelheadLevels.call(this, query, options);
  }

  async getLikedLevels(
    query?: LevelheadPlayerLikesSearch,
    options?: DelegationOptions,
  ) {
    return await getLevelheadLikedLevels.call(
      this.client,
      this.userId,
      query,
      options,
    );
  }

  async getFavoritedLevels(
    query?: LevelheadPlayerLikesSearch,
    options?: DelegationOptions,
  ) {
    return await getLevelheadFavoritedLevels.call(
      this.client,
      this.userId,
      query,
      options,
    );
  }

  async getFollowers(
    query?: LevelheadPlayerFollowsSearch,
    options?: DelegationOptions,
  ) {
    return await getLevelheadPlayerFollowers.call(
      this.client,
      this.userId,
      query,
      options,
    );
  }

  async getFollowing(
    query?: LevelheadPlayerFollowsSearch,
    options?: DelegationOptions,
  ) {
    return await getLevelheadPlayerFollowing.call(
      this.client,
      this.userId,
      query,
      options,
    );
  }

  async follow(options?: DelegationOptions) {
    return await followLevelheadPlayer.call(this.client, this.userId, options);
  }

  async unfollow(options?: DelegationOptions) {
    return await unfollowLevelheadPlayer.call(
      this.client,
      this.userId,
      options,
    );
  }
}

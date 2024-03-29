import type { AliasDownload } from './aliases';

type PlayerSearchSortOption =
  | 'createdAt'
  | 'updatedAt'
  | 'Subscribers'
  | 'PlayTime'
  | 'Trophies'
  | '-createdAt'
  | '-updatedAt'
  | '-Subscribers'
  | '-PlayTime'
  | '-Trophies';

export type LevelheadPlayerSearch = {
  userIds?: string | string[];
  sort?: PlayerSearchSortOption;
  limit?: number;
  includeAliases?: boolean;
  tiebreakerItemId?: string;
  minSubscribers?: number;
  maxSubscribers?: number;
  minPlayTime?: number;
  maxPlayTime?: number;
  minUpdatedAt?: string;
  maxUpdatedAt?: string;
  minCreatedAt?: string;
  maxCreatedAt?: string;
};

export interface LevelheadPlayerDownload {
  _id: string;
  userId: string;
  alias?: AliasDownload;
  createdAt: string;
  updatedAt: string;
  stats: {
    Subscribers: number;
    Published: number;
    Plays: number;
    PlayTime: number;
    Crowns: number;
    Shoes: number;
    LevelsPlayed: number;
    Wins: number;
    Fails: number;
    NumFollowing: number;
    DBComp: number;
    ChalWins: number;
    TimeTrophies: number;
    FaveGen: number;
    LikeGen: number;
    BucksTipped: number;
    TipsGotten: number;
    AchPoints: number;
    CampaignProg: number;
  };
}

export type LevelheadPlayerFollowsSearch = {
  limit?: number;
  userIds?: string | string[];
  beforeId?: string;
  includeAliases?: boolean;
};

export type LevelheadPlayerLikesSearch = {
  limit?: number;
  levelIds?: string | string[];
  beforeId?: string;
};

export interface ListedUserId {
  /** Internal identifier for this listing (not associated with the actual user). */
  _id: string;
  userId: string;
  alias?: string;
}

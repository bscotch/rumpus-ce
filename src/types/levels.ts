import { Alias } from "./aliases";
import { ResultsPage } from "../lib/api/paging";
import { ListedUserId } from "./players";

export type LevelSearchSortField = 'createdAt'|'updatedAt'|'gameVersion'|'Attempts'|'Players'|'Playtime'|'TimePerWin'|'Difficulty'|'ReplayValue'|'ExposureBucks'|'QAScore'|'HiddenGem'|'Likes'|'Favorites'|'FailureRate';
type LevelSearchSortOption = LevelSearchSortField |'-createdAt'|'-updatedAt'|'-gameVersion'|'-Attempts'|'-Players'|'-Playtime'|'-TimePerWin'|'-Difficulty'|'-ReplayValue'|'-ExposureBucks'|'-QAScore'|'-HiddenGem'|'-Likes'|'-Favorites'|'-FailureRate';


export interface LevelheadLevelTag {
  tag:string,
  name:string,
  description:string,
  count:number,
  freq:number
}

interface CrateItemRecord {
  userId: string,
  alias: {
    userId: string,
    alias: string,
    anonymous: true,
    context: string
  },
  value: number,
  createdAt: string
}

export type LevelheadLevelSearch = {
  sort?: LevelSearchSortOption,
  limit?: number,
  userIds?: string|string[],
  levelIds?: string|string[],
  tags?: string|string[],
  excludeTags?: string|string[],
  tiebreakerItemId?: string,
  nextPageToken?: string,
  paging?: boolean,
  tower?: boolean,
  marketing?: boolean,
  dailyBuild?: boolean,
  towerTrial?: boolean,
  includeStats?: boolean,
  includeRecords?: boolean,
  includeAliases?: boolean,
  includeUnlisted?: boolean,
  maxClearRate?: number,
  minClearRate?: number,
  minGameVersion?: number,
  maxGameVersion?: number,
  minAttempts?: number,
  maxAttempts?: number,
  minPlayers?: number,
  maxPlayers?: number,
  minPlayTime?: number,
  maxPlayTime?: number,
  minTimePerWin?: number,
  maxTimePerWin?: number,
  minExposureBucks?: number,
  maxExposureBucks?: number,
  minReplayValue?: number,
  maxReplayValue?: number,
  minHiddenGem?: number,
  maxHiddenGem?: number,
  minSecondsAgo?: number,
  maxSecondsAgo?: number,
  minDiamonds?: number,
  maxDiamonds?: number,
  minLikes?: number,
  maxLikes?: number,
  minFavorites?: number,
  maxFavorites?: number,
  minFailureRate?: number,
  maxFailureRate?: number,
  minUpdatedAt?: string,
  maxUpdatedAt?: string,
  minCreatedAt?: string,
  maxCreatedAt?: string,
};

export interface LevelheadLevelDownload {
  _id: string,
  levelId: string,
  avatarId: string,
  userId: string,
  alias: Alias,
  title: string,
  createdAt: string,
  updatedAt: string,
  tower: true,
  dailyBuild: true,
  towerTrial: true,
  requiredPlayers: number,
  creatorTime: number,
  gameVersion: number,
  tags: string[],
  tagNames: string[],
  content: {
    World: number,
    Movement: number,
    Puzzles: number,
    Enemies: number,
    Hazards: number
  },
  stats: {
    Attempts: number,
    Favorites: number,
    Likes: number,
    PlayTime: number,
    Players: number,
    ReplayValue: number,
    ClearRate: number,
    Diamonds: number,
    Successes: number,
    TimePerWin: number,
    ExposureBucks: number,
    FailureRate: number
  },
  records: {
    HighScore: Array<CrateItemRecord>,
    FastestTime: Array<CrateItemRecord>
  }
}

export interface ListedLevelId {
  _id:string,
  levelId:string
}

export interface LevelheadLevel extends LevelheadLevelDownload {
  /** Fetch the list of users who like this Level. Includes paging. */
  getLikes(): Promise<ResultsPage<ListedUserId>>,
  /** Fetch the list of users who favorited this level. Includes paging. */
  getFavorites(): Promise<ResultsPage<ListedUserId>>,
  /** Add this level to the current user's bookmarks */
  bookmark(): Promise<boolean>,
  /** Remove this level from the current user's bookmarks */
  unbookmark(): Promise<boolean>
}

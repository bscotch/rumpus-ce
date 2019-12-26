import {Alias} from "./aliases";

type LevelSearchSortOption = 'createdAt'|'updatedAt'|'gameVersion'|'Attempts'|'Players'|'Playtime'|'TimePerWin'|'Difficulty'|'ReplayValue'|'ExposureBucks'|'QAScore'|'HiddenGem'|'Likes'|'Favorites'|'FailureRate';

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
  maxFailureRate?: number
};

export interface LevelheadLevel {
  _id: string,
  levelId: string,
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
  localizedTags: string[],
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

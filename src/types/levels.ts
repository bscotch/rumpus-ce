import { Alias } from "./aliases";
import { ResultsPage } from "../lib/api/paging";
import { ListedUserId } from "./players";

export type LevelSearchSortField = 'createdAt'|'Playtime'|'Difficulty'|'ReplayValue'|'ExposureBucks'|'QAScore'|'HiddenGem';
type LevelSearchSortOption = LevelSearchSortField |'-createdAt'|'-Playtime'|'-Difficulty'|'-ReplayValue'|'-ExposureBucks'|'-QAScore'|'-HiddenGem';


export interface LevelheadLevelTag {
  /** Unique, internal identifier. */
  tag:string,
  /** In-game, localized, human-friendly form for this tag. */
  name:string,
  /** In-game, localized description for this tag. */
  description:string,
  /** Number of levels that have this tag. */
  count:number,
  /** Fraction of levels that have this tag. */
  freq:number
}

interface CrateItemRecord {
  userId: string,
  /** Alias information for the user who has this record. */
  alias: Alias,
  value: number,
  /** When this record was set. */
  createdAt: string
}

export type LevelheadLevelSearch = {
  sort?: LevelSearchSortOption,
  limit?: number,
  /** Only include levels created by these users. */
  userIds?: string|string[],
  levelIds?: string|string[],
  /** Only include levels with *all* of these tags. */
  tags?: string|string[],
  excludeTags?: string|string[],
  tiebreakerItemId?: string,
  nextPageToken?: string,
  /** Optionally turn on server-based paging, which results in a `nextPageToken`. */
  paging?: boolean,
  /** Only include levels in the Tower. */
  tower?: boolean,
  /** Only include levels in the Marketing Department. */
  marketing?: boolean,
  /** Only include levels made for a daily build challenge. */
  dailyBuild?: boolean,
  /** Only include levels that have been selected for the Tower Trial. */
  towerTrial?: boolean,
  includeStats?: boolean,
  includeRecords?: boolean,
  includeAliases?: boolean,
  includeUnlisted?: boolean,
  minPlayTime?: number,
  maxPlayTime?: number,
  minExposureBucks?: number,
  maxExposureBucks?: number,
  minReplayValue?: number,
  maxReplayValue?: number,
  minHiddenGem?: number,
  maxHiddenGem?: number,
  /** Only include levels published at least this many seconds ago. */
  minSecondsAgo?: number,
  /** Only include levels published at most this many seconds ago. */
  maxSecondsAgo?: number,
  minDiamonds?: number,
  maxDiamonds?: number,
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
  /** Minimum number of players required to play this level. */
  requiredPlayers: number,
  /** Number of seconds the creator took to beat the game prior to publishing. */
  creatorTime: number,
  gameVersion: number,
  /** Internal, machine-friendly tags associated with this level. */
  tags: string[],
  /** Public, human-friendly, localized tags associated with this level. */
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
  /** Internal ID for this listing (not associated with the actual level). */
  _id:string,
  levelId:string
}

export interface LevelheadLevel extends LevelheadLevelDownload {
  /** Generate an image URL for the avatar/icon associated with this Level. */
  avatarUrl(pixels?:number):string,
  /** Fetch the list of users who like this Level. Includes paging. */
  getLikes(): Promise<ResultsPage<ListedUserId>>,
  /** Fetch the list of users who favorited this level. Includes paging. */
  getFavorites(): Promise<ResultsPage<ListedUserId>>,
  /** Add this level to the current user's bookmarks */
  bookmark(): Promise<boolean>,
  /** Remove this level from the current user's bookmarks */
  unbookmark(): Promise<boolean>
}

import {Alias} from "../lib/api/levelhead/aliases";
import { ResultsPage } from "../lib/api/paging";
import {ListedLevelId} from "./levels";

type PlayerSearchSortOption = 'createdAt'|'updatedAt'|'Subscribers'|'PlayTime'|'Trophies'|'-createdAt'|'-updatedAt'|'-Subscribers'|'-PlayTime'|'-Trophies';

export type LevelheadPlayerSearch = {
  userIds?:string,
  sort?:PlayerSearchSortOption,
  limit?:number,
  paging?: boolean,
  nextPageToken?: string,
  includeAliases?:boolean,
  tiebreakerItemId?:string,
  minSubscribers?:number,
  maxSubscribers?:number,
  minPlayTime?:number,
  maxPlayTime?:number,
  minUpdatedAt?: string,
  maxUpdatedAt?: string,
  minCreatedAt?: string,
  maxCreatedAt?: string,
}

export interface LevelheadPlayerDownload {
  _id: string,
  userId: string,
  alias: Alias,
  createdAt: string,
  updatedAt: string,
  stats: {
    Subscribers: number,
    Published: number,
    Plays: number,
    PlayTime: number,
    Crowns: number,
    Shoes: number,
    LevelsPlayed: number,
    Wins: number,
    Fails: number,
    NumFollowing: number,
    DBComp: number,
    ChalWins: number,
    TimeTrophies: number,
    FaveGen: number,
    LikeGen: number,
    BucksTipped: number,
    TipsGotten: number,
    AchPoints: number,
    CampaignProg: number
  }
}

export interface ListedUserId {
  _id:string,
  userId:string,
  alias?:string
}

export interface LevelheadPlayer extends LevelheadPlayerDownload{
  /** Get the levels liked by this user. */
  getLikedLevels(): Promise<ResultsPage<ListedLevelId>>,
  /** Get the levels favorited by this user. */
  getFavoritedLevels(): Promise<ResultsPage<ListedLevelId>>,
  /** Get the users who follow this user. */
  getFollowers(): Promise<ResultsPage<ListedUserId>>,
  /** Get the users this user follows. */
  getFollowing(): Promise<ResultsPage<ListedUserId>>,
  /** Follow this user. */
  follow(): Promise<boolean>,
  /** Unfollow this user. */
  unfollow(): Promise<boolean>
}

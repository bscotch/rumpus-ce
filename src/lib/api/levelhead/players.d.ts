import {Alias} from "./aliases";
import { ResultsPage } from "../paging";
import {ListedLevelId} from "./levels.d";

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
  getLikedLevels(): Promise<ResultsPage<ListedLevelId>>,
  getFavoritedLevels(): Promise<ResultsPage<ListedLevelId>>,
  getFollowers(): Promise<ResultsPage<ListedUserId>>,
  getFollowing(): Promise<ResultsPage<ListedUserId>>,
  follow(): Promise<boolean>,
  unfollow(): Promise<boolean>
}
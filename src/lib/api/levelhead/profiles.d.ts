import {Alias} from "./aliases";
import { ResultsPage } from "..";

type ProfileSearchSortOption = 'createdAt'|'updatedAt'|'Subscribers'|'PlayTime'|'Trophies'|'-createdAt'|'-updatedAt'|'-Subscribers'|'-PlayTime'|'-Trophies';

export type LevelheadProfileSearch = {
  userIds?:string,
  sort?:ProfileSearchSortOption,
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

export interface LevelheadProfileDownload {
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


export interface ListedLevelId {
  _id:string,
  levelId:string
}

export interface LevelheadProfile extends LevelheadProfileDownload{
  getLikedLevels(): Promise<ResultsPage<ListedLevelId>>,
  getFavoritedLevels(): Promise<ResultsPage<ListedLevelId>>,
}
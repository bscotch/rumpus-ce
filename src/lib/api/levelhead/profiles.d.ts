import {Alias} from "./aliases";

type ProfileSearchSortOption = 'createdAt'|'updatedAt'|'Subscribers'|'PlayTime'|'Trophies';

export type LevelheadProfileSearch = {
  userIds?:string,
  sort?:ProfileSearchSortOption,
  limit?:number,
  minSubscribers?:number,
  maxSubscribers?:number,
  minPlayTime?:number,
  maxPlayTime?:number,
  includeAliases?:boolean,
  tiebreakerItemId?:string
}

export interface LevelheadProfile {
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
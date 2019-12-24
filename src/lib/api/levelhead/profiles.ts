type ProfileSearchSortOption = 'createdAt'|'updatedAt'|'Subscribers'|'PlayTime'|'Trophies';

export interface ProfileSearchQueryParams {
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

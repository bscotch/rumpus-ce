export type AliasSearch = {
  userIds: string[]|string,
  onlySafe?: boolean,
  maxReports?: number
}

export interface Alias {
  userId: string,
  alias: string,
  avatarId: string,
  context: string,
  avatarUrl(pixels?:number):string
}

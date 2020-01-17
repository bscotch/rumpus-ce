export type AliasSearch = {
  userIds: string[]|string,
  /** Only include 'safe' versions of aliases. */
  onlySafe?: boolean,
  /** Exclude aliases that have been reported at least this many times. */
  maxReports?: number
}

export interface Alias {
  userId: string,
  alias: string,
  /** Rumpus users can have different aliases in different contexts. */
  context: string,
  avatarId: string,
  /** Generate an image URL for the avatar associated with this Alias. */
  avatarUrl(pixels?:number):string
}

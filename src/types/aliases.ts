export type AliasSearch = {
  userIds: string[] | string;
  /** Only include 'safe' versions of aliases. */
  onlySafe?: boolean;
  /** Exclude aliases that have been reported at least this many times. */
  maxReports?: number;
};

export interface AliasDownload {
  _id: string;
  userId: string;
  alias: string;
  /** Rumpus users can have different aliases in different contexts. */
  context: 'levelhead' | 'rumpus' | 'levelhead-safe';
  avatarId: string;
}

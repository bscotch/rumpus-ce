
export type BookmarkSearch = {
  limit?:number,
  sort?:'createdAt'|'levelId'|'-createdAt'|'-levelId',
  levelIds?: string|string[],
  /** Only include levels whose levelId comes earlier than this, alphabetically. */
  beforeLevelId?: string,
  /** Only include levels whose levelId comes later than this, alphabetically. */
  afterLevelId?: string,
  /** Only include bookmarks whose internal _id comes earlier than this, alphabetically. */
  beforeId?: string,
  /** Only include bookmarks whose internal _id comes later than this, alphabetically. */
  afterId?: string
};

export type Bookmark = string;

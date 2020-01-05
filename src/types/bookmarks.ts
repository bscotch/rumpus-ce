
export type BookmarkSearch = {
  limit?:number,
  sort?:'createdAt'|'levelId'|'-createdAt'|'-levelId',
  levelIds?: string|string[],
  beforeLevelId?: string,
  afterLevelId?: string,
  beforeId?: string,
  afterId?: string
};

export type Bookmark = string;

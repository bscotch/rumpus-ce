import RumpusCE from "../RumpusCE";
import {
  getLevelheadAliases
} from "./levelhead/aliases";
import {
  getLevelheadLevels,
  getLevelheadLevelTags,
  getLevelheadLevelLikes,
  getLevelheadLevelFavorites
} from "./levelhead/levels";
import {
  getLevelheadPlayer,
  getLevelheadPlayers,
  getLevelheadLikedLevels,
  getLevelheadFavoritedLevels,
  getLevelheadPlayerFollowers,
  getLevelheadPlayerFollowing,
  followLevelheadPlayer,
  unfollowLevelheadPlayer
} from "./levelhead/players";
import {
  getLevelheadBookmarks,
  bookmarkLevelheadLevel,
  unbookmarkLevelheadLevel
} from "./levelhead/bookmarks";

export function createLevelheadAPI(client:RumpusCE){
  const api = {
    aliases:{
      search: getLevelheadAliases.bind(client)
    },
    bookmarks:{
      search: getLevelheadBookmarks.bind(client),
      add: bookmarkLevelheadLevel.bind(client),
      remove: unbookmarkLevelheadLevel.bind(client)
    },
    levels:{
      search: getLevelheadLevels.bind(client),
      getTags: getLevelheadLevelTags.bind(client),
      getLikes: getLevelheadLevelLikes.bind(client),
      getFavorites: getLevelheadLevelFavorites.bind(client),
    },
    players:{
      search: getLevelheadPlayers.bind(client),
      getPlayer: getLevelheadPlayer.bind(client),
      getLikedLevels: getLevelheadLikedLevels.bind(client),
      getFavoritedLevels: getLevelheadFavoritedLevels.bind(client),
      getFollowers: getLevelheadPlayerFollowers.bind(client),
      getFollowing: getLevelheadPlayerFollowing.bind(client),
      follow: followLevelheadPlayer.bind(client),
      unfollow: unfollowLevelheadPlayer.bind(client)
    }
  };
  return api;
}

export type LevelheadAPI = ReturnType<typeof createLevelheadAPI>;

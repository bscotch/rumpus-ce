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
    /** Aliases */
    aliases:{
      search: getLevelheadAliases.bind(client)
    },
    /** Manage Level Bookmarks */
    bookmarks:{
      /** List and filter your bookmarks. */
      search: getLevelheadBookmarks.bind(client),
      /** Add a level to your bookmarks. */
      add: bookmarkLevelheadLevel.bind(client),
      /** Remove a level from your bookmarks. */
      remove: unbookmarkLevelheadLevel.bind(client)
    },
    /** Information about Levels. */
    levels:{
      /** Search Levelhead Levels. */
      search: getLevelheadLevels.bind(client),
      /** Get statistics and information about Level Tags. */
      getTags: getLevelheadLevelTags.bind(client),
      /** List the players who liked a Level. */
      getLikes: getLevelheadLevelLikes.bind(client),
      /** List the players who favorited a Level. */
      getFavorites: getLevelheadLevelFavorites.bind(client),
    },
    /** Information about players, plus following management. */
    players:{
      /** Search Levelhead Player profiles. */
      search: getLevelheadPlayers.bind(client),
      /** Find a Levelhead Player profile. */
      getPlayer: getLevelheadPlayer.bind(client) as typeof getLevelheadPlayer,
      /** List the levels liked by a player. */
      getLikedLevels: getLevelheadLikedLevels.bind(client),
      /** List the levels favorited by a player. */
      getFavoritedLevels: getLevelheadFavoritedLevels.bind(client),
      /** List the players who follow a given player. */
      getFollowers: getLevelheadPlayerFollowers.bind(client),
      /** List the players followed by a given player. */
      getFollowing: getLevelheadPlayerFollowing.bind(client),
      /** Follow a player. */
      follow: followLevelheadPlayer.bind(client),
      /** Unfollow a player. */
      unfollow: unfollowLevelheadPlayer.bind(client)
    }
  };
  return api;
}

export type LevelheadAPI = ReturnType<typeof createLevelheadAPI>;

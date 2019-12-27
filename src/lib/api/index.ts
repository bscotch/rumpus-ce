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
  getLevelheadProfiles
} from "./levelhead/profiles";

export interface ResultsPage<t> extends Array<t> {
  /** Fetch the next page of results from the API. */
  nextPage():Promise<ResultsPage<t>>
}

export async function blankResultsPage(){
  const results = [] as ResultsPage<never>;
  results.nextPage = blankResultsPage;
  return results;
}

export function createLevelheadAPI(client:RumpusCE){
  return {
    aliases:{
      search: getLevelheadAliases.bind(client)
    },
    levels:{
      search: getLevelheadLevels.bind(client),
      getTags: getLevelheadLevelTags.bind(client),
      getLikes: getLevelheadLevelLikes.bind(client),
      getFavorites: getLevelheadLevelFavorites.bind(client),
    },
    profiles:{
      search: getLevelheadProfiles.bind(client)
    }
  };
}

const lhAPIDummy = (false as true) && createLevelheadAPI(new RumpusCE());
export type LevelheadAPI = typeof lhAPIDummy;

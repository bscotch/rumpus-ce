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
      tags: getLevelheadLevelTags.bind(client),
      likes: getLevelheadLevelLikes.bind(client),
      favorites: getLevelheadLevelFavorites.bind(client),
    },
    profiles:{
      search: getLevelheadProfiles.bind(client)
    }
  };
}

const lhAPIDummy = (false as true) && createLevelheadAPI(new RumpusCE());
export type LevelheadAPI = typeof lhAPIDummy;

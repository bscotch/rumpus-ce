import RumpusCE from "../RumpusCE";
import {
  getLevelheadAliases
} from "./levelhead/aliases";
import {
  getLevelheadLevels
} from "./levelhead/levels";
import {
  getLevelheadProfiles
} from "./levelhead/profiles";

export function createLevelheadAPI(client:RumpusCE){
  return Object.freeze({
    aliases:Object.freeze({
      search: getLevelheadAliases.bind(client)
    }),
    levels:Object.freeze({
      search: getLevelheadLevels.bind(client)
    }),
    profiles: Object.freeze({
      search: getLevelheadProfiles.bind(client)
    })
  });
}

const lhAPIDummy = (false as true) && createLevelheadAPI(new RumpusCE());
export type LevelheadAPI = typeof lhAPIDummy;

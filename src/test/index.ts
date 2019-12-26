import {expect} from "chai";
import {default as RumpusCE,VersionedItem} from "../lib/RumpusCE";
import dotenv from 'dotenv';
dotenv.config();

const localClient = new RumpusCE(
  process.env.RUMPUS_DELEGATION_KEY,
  'local',
  {
    username: process.env.DEV_SERVER_USERNAME as string,
    password: process.env.DEV_SERVER_PASSWORD as string
  });

const betaClient = new RumpusCE();

describe("Rumpus CE Client", async function(){

  const rce = betaClient;
  
  describe("General", async function(){
    it("can fetch the server version", async function(){
      const version = await rce.version();
      for(const field of ['privacy','terms','terms-rce','rumpus']){
        expect(version[field as VersionedItem],`version object must include '${field}'`).to.be.a('string');
      }
    });
    it("can fetch info about the current delegation key", async function(){
      expect(rce.defaultDelegationKey,'missing delegation key in root .env file: add one!').to.be.a('string');
      const keyInfo = await rce.delegationKeyPermissions();
      expect(keyInfo.passId).to.be.a('string');
      expect(keyInfo.permissions).to.be.an('array');
    });
  });
  describe("Levelhead",async function(){
    describe("Aliases", async function(){
      it("can search aliases", async function(){
        const aliases = await rce.levelhead.aliases.search('bscotch404');
        expect(aliases.length).to.equal(1);
        const [alias] = aliases;
        expect(alias.userId).to.equal('bscotch404');
      });
    });
    describe("Levels", async function(){
      it("can fetch level tags",async function(){
        const tags = await rce.levelhead.levels.tags();
        expect(tags.length).to.be.greaterThan(0);
      });
      it("can search levels", async function(){
        const levels = await rce.levelhead.levels.search({limit:5});
        expect(levels.length).to.equal(5);
      });
      it("automatically fills localized level tags", async function(){
        const level = (await rce.levelhead.levels.search({limit:1}))[0];
        expect(level.localizedTags.length).to.be.greaterThan(0);
      });
      it("can fetch level likes",async function(){
        const likedLevel = (await rce.levelhead.levels.search({limit:1,sort:'Likes'}))[0];
        expect(likedLevel).to.exist;
        const {levelId} = likedLevel;
        const likes = await rce.levelhead.levels.likes(levelId);
        expect(likes.length).to.be.greaterThan(0);
      });
      it("can page level favorites",async function(){
        // Find a favorited level
        let levelId = '';
        let totalFavorites = 0;
        let minFavorites = 6;
        const maxFavorites = 18;
        while(minFavorites<maxFavorites){
          // The tally on the level can be pretty different from the
          // actual number in the set, so need to be able to attempt
          // a few shots at getting one with a reasonable number of favorites
          // to exhaust through paging.
          const favoritedLevel = (await rce.levelhead.levels.search({
            limit:1,
            sort:'-Favorites',
            minFavorites,
            maxFavorites
          }))[0];
          expect(favoritedLevel,
            'should get back at least one level matching favorite criterion'
          ).to.exist;
          let allFavorites = await rce.levelhead.levels.favorites(favoritedLevel.levelId,{limit:99});
          if(allFavorites.length < 2){
            // Try again with another level!
            minFavorites +=1 ;
            continue;
          }
          totalFavorites = allFavorites.length;
          levelId = favoritedLevel.levelId;
          break;
        }
        expect(minFavorites,
          'should have found at least one level to test'
        ).to.not.equal(maxFavorites);
        let page = await rce.levelhead.levels.favorites(levelId,{limit:1});
        let pagedFavorites = 1;
        while(true){
          page = await page.nextPage();
          if(!page.length){ break; }
          expect(page.length).to.equal(1);
          pagedFavorites +=1 ;
        }
        expect(totalFavorites).to.equal(pagedFavorites);
      });
    });
    describe("Profiles", async function(){
      it("can search profiles", async function(){
        const profiles = await rce.levelhead.profiles.search({userIds:'bscotch404'});
        expect(profiles.length).to.equal(1);
        expect(profiles[0].userId).to.equal('bscotch404');
      });
    });
  });

});

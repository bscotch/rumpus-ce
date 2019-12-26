import {expect} from "chai";
import {default as RumpusCE,VersionedItem} from "../lib/RumpusCE";
import dotenv from 'dotenv';
dotenv.config();

describe("Rumpus CE Client", async function(){
  const rce = new RumpusCE();
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
        for(const field of ['tag','name','description','freq','count']){
          expect(tags[0]).to.haveOwnProperty(field);
        }
      });
      it("can search levels", async function(){
        const levels = await rce.levelhead.levels.search({limit:5});
        expect(levels.length).to.equal(5);
      });
      it("automatically fills localized level tags", async function(){
        const level = (await rce.levelhead.levels.search({limit:1}))[0];
        expect(level.localizedTags.length).to.equal(level.tags.length);
      });
      it("can fetch level likes",async function(){
        const likedLevel = (await rce.levelhead.levels.search({limit:1,sort:'Likes'}))[0];
        expect(likedLevel).to.exist;
        const {levelId} = likedLevel;
        const likes = await rce.levelhead.levels.likes(levelId);
        expect(likes.length).to.be.greaterThan(0);
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

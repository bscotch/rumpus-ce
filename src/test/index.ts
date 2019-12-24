import {expect} from "chai";
import {default as RumpusCE,VersionedItem} from "../lib/RumpusCE";
import dotenv from 'dotenv';
dotenv.config();

describe("Rumpus CE Client", async function(){
  describe("General", async function(){
    it("can fetch the server version", async function(){
      const rce = new RumpusCE();
      const version = await rce.version();
      for(const field of ['privacy','terms','terms-rce','rumpus']){
        expect(version[field as VersionedItem],`version object must include '${field}'`).to.be.a('string');
      }
    });
    it("can fetch info about the current delegation key", async function(){
      const rce = new RumpusCE();
      expect(rce.defaultDelegationKey,'missing delegation key in root .env file: add one!').to.be.a('string');
      const keyInfo = await rce.delegationKeyPermissions();
      expect(keyInfo.passId).to.be.a('string');
      expect(keyInfo.permissions).to.be.an('array');
    });
  });
  describe("Levelhead Aliases", async function(){
    it("can search aliases", async function(){
      const rce = new RumpusCE();
      const aliases = await rce.levelhead.aliases.search('bscotch404');
      expect(aliases.length).to.equal(1);
      const [alias] = aliases;
      expect(alias.userId).to.equal('bscotch404');
    });
  });
  describe("Levelhead Levels", async function(){
    it("can search levels", async function(){
      const rce = new RumpusCE();
      const levels = await rce.levelhead.levels.search({limit:5});
      expect(levels.length).to.equal(5);
    });
  });

});

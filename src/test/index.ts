import {expect} from "chai";
import {default as RumpusCE,VersionedItem} from "../lib/RumpusCE";
import dotenv from 'dotenv';
dotenv.config();

const localClient = new RumpusCE(
  process.env.RUMPUS_DELEGATION_KEY,
  'local');

const devClient = new RumpusCE(
  process.env.RUMPUS_DELEGATION_KEY,
  'dev',
  {
    username: process.env.DEV_SERVER_USERNAME as string,
    password: process.env.DEV_SERVER_PASSWORD as string
  });

const betaClient = new RumpusCE();

describe("Rumpus CE Client", async function(){

  const rce = betaClient;

  describe("General", async function(){
    it("can fetch the server version", async function(){
      const versionFields = ['privacy','terms','terms-rce','rumpus'];
      const version = await rce.version();
      for(const field of versionFields){
        expect(version[field as VersionedItem],
          `version object must include '${field}'`
        ).to.be.a('string');
      }
    });
    it("can fetch info about the current delegation key", async function(){
      expect(rce.defaultDelegationKey,
        'missing delegation key in root .env file: add one!'
      ).to.be.a('string');
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
    describe("Bookmarks",async function(){
      it("can add and remove bookmarks", async function(){
        this.timeout(8000); // TODO: Find out why this takes so dang long.
        // Grab some terrible levels to add to bookmarks
        const topLevels = await rce.levelhead.levels.search({sort:'-QAScore',minPlayers:20,limit:5});
        for(const level of topLevels){

          // Make sure it isn't already in bookmarks
          await rce.levelhead.bookmarks.remove(level.levelId);

          // Add it, and make sure it's in there
          await rce.levelhead.bookmarks.add(level.levelId);
          let bookmarked = await rce.levelhead.bookmarks.search({levelIds:level.levelId});
          expect(bookmarked.length,'bookmark search should work').to.equal(1);
          expect(bookmarked[0],'bookmark must be the one we added').to.equal(level.levelId);

          // Remove it, and make sure it's GONE.
          await rce.levelhead.bookmarks.remove(level.levelId);
          bookmarked = await rce.levelhead.bookmarks.search({levelIds:level.levelId});
          expect(bookmarked.length,'bookmark search should return nothing').to.equal(0);
        }
      });
    });
    describe("Levels", async function(){
      it("can fetch level tags",async function(){
        const tags = await rce.levelhead.levels.getTags();
        expect(tags.length).to.be.greaterThan(0);
      });
      it("can search levels", async function(){
        const levels = await rce.levelhead.levels.search({limit:5});
        expect(levels.length).to.be.at.least(1);
        expect(levels.length).to.be.lessThan(6);
      });
      it("can page levels",async function(){
        const limit = 5;
        const levels = await rce.levelhead.levels.search({limit});
        expect(levels.length).to.equal(limit);
        const nextLevels = await levels.nextPage();
        expect(nextLevels.length).to.equal(limit);
        const maxDate = new Date(levels[limit-1].createdAt);
        for(let i=0; i<limit; i++){
          expect(levels.map(l=>l._id)).not.to.include(nextLevels[i]._id);
          expect(maxDate).to.be.greaterThan(new Date(nextLevels[i].createdAt));
        }
      });
      it("can fetch level likes",async function(){
        const likedLevel = (await rce.levelhead.levels.search({limit:1,sort:'Likes'}))[0];
        expect(likedLevel).to.exist;
        const {levelId} = likedLevel;
        const likes = await rce.levelhead.levels.getLikes(levelId);
        expect(likes.length,
          'level should have at least one Like'
        ).to.be.greaterThan(0);
        // Also fetch via the object
        const likesFromLevel = await likedLevel.getLikes();
        expect(likesFromLevel.length).to.equal(likes.length);
        for(let i=0; i<likesFromLevel.length; i++)
        {
          expect(likesFromLevel[i]._id,
            'can fetch likes via a level object'
          ).to.equal(likes[i]._id);
        }
      });
      it("can page level favorites", async function(){
        // Find a favorited level
        this.timeout(6000);
        let levelId = '';
        let totalFavorites = 0;
        let minFavorites = rce.server=='beta'? 6 : 2;
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
          const allFavorites = await rce.levelhead.levels.getFavorites(favoritedLevel.levelId,{limit:99});
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
        let page = await rce.levelhead.levels.getFavorites(levelId,{limit:1});
        let pagedFavorites = 1;
        // eslint-disable-next-line no-constant-condition
        while(true){
          page = await page.nextPage();
          if(!page.length){
            break;
          }
          expect(page.length).to.equal(1);
          pagedFavorites +=1 ;
        }
        expect(totalFavorites).to.equal(pagedFavorites);
      });
    });
    describe.only("Players", async function(){
      // Use Seth as the test case.
      const dev = 'bscotch007';
      it("can search players", async function(){
        const players = await rce.levelhead.players.search({userIds:dev});
        expect(players.length,'Adam should exist').to.equal(1);
        expect(players[0].userId).to.equal(dev);
      });
      it("can (un)follow a player",async function(){
        // Have the test end up back where it started so that anyone running the
        // test doesn't have a permanent side effect.
        const {userId} = await rce.delegationKeyPermissions();
        const isFollowingDev = async ()=>{
          const follows = await rce.levelhead.players.getFollowing(userId,{userIds:dev});
          console.log({follows})
          return Boolean(follows.length);
        };
        if(await isFollowingDev()){
          await rce.levelhead.players.unfollow(dev);
          expect(await isFollowingDev(),'should no longer be following').to.be.false;
          await rce.levelhead.players.follow(dev);
          expect(await isFollowingDev(),'should be following again').to.be.true;
        }
        else{
          await rce.levelhead.players.follow(dev);
          expect(await isFollowingDev(),'should now be following').to.be.true;
          await rce.levelhead.players.unfollow(dev);
          expect(await isFollowingDev(),'should not be following again').to.be.false;
        }
      });
      it("can fetch player's follower list",async function(){
        const player = (await rce.levelhead.players.search({limit:1,sort:'Subscribers'}))[0];
        expect(player).to.exist;
        const {userId} = player;
        const followers = await rce.levelhead.players.getFollowers(userId);
        expect(followers.length,
          'should have at least one follower'
        ).to.be.at.least(1);
        // Also fetch via the object
        const followersFromPlayer = await player.getFollowers();
        expect(followersFromPlayer.length).to.equal(followers.length);
        for(let i=0; i<followersFromPlayer.length; i++)
        {
          expect(followersFromPlayer[i]._id,
            'can fetch followers via a player object'
          ).to.equal(followers[i]._id);
        }
      });
      it("can fetch player's liked levels ",async function(){
        const player = (await rce.levelhead.players.search({limit:1,sort:'Subscribers'}))[0];
        expect(player).to.exist;
        const {userId} = player;
        const likes = await rce.levelhead.players.getLikedLevels(userId);
        expect(likes.length,
          'level should have at least one Like'
        ).to.be.greaterThan(0);
        // Also fetch via the object
        const likesFromPlayer = await player.getLikedLevels();
        expect(likesFromPlayer.length).to.equal(likes.length);
        for(let i=0; i<likesFromPlayer.length; i++)
        {
          expect(likesFromPlayer[i]._id,
            'can fetch likes via a player object'
          ).to.equal(likes[i]._id);
        }
      });
    });
  });

});

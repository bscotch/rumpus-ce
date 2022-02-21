## Rumpus Community Edition SDK

**Rumpus Community Edition** ("Rumpus CE") is a subset of the Rumpus API by Butterscotch Shenanigans ("Bscotch"). The broader Rumpus API manages all user and game data for Bscotch games. Currently, Rumpus CE allows access to [Levelhead](https://www.bscotch.net/games/levelhead) data only.

This project is designed to help jump-start community-created projects by providing easy access to Rumpus CE data -- learn more about Rumpus CE on the [Bscotch website](https://beta.bscotch.net/rumpus-ce) and check out the [Rumpus CE documentation](https://beta.bscotch.net/api/docs/community-edition/) for all the technical details.

👀 See the [demo site](https://bscotch.github.io/rumpus-ce/), which uses RumpusCE to fetch and display Levelhead player stats. The code for the demo site is [available on GitHub](https://github.com/bscotch/rumpus-ce/tree/develop/browser).

*It may be tempting to use this module and Rumpus CE in ways that violate our Terms or Code of Conduct. **Don't!** If you're unsure about something, pop into the official Bscotch Discord to ask about your use case.*

## Relevant Links

+ [Demo Site](https://bscotch.github.io/rumpus-ce/)
+ [Rumpus CE Homepage](https://beta.bscotch.net/rumpus-ce)
+ [Rumpus CE Newsletter](https://beta.bscotch.net/telegrams?subscribe=rumpus-ce)
+ [Rumpus CE Documentation](https://beta.bscotch.net/api/docs/community-edition) - Full documentation for Rumpus CE.
+ [Rumpus CE Terms](https://beta.bscotch.net/terms-rce) - Terms and Conditions that apply specifically to use of Rumpus Community Edition.
+ [Bscotch Terms](https://beta.bscotch.net/terms) - The broader Terms and Conditions for all software and services run by Bscotch.
+ [Bscotch Discord](https://discord.gg/bscotch) - Head to the #levelhead-api channel to share your work with others.
+ [Code of Conduct](https://beta.bscotch.net/conduct)
+ [Bscotch Privacy Policy](https://beta.bscotch.net/privacy)
+ [Feedback](https://beta.bscotch.net/feedbag/rumpus?tags=rce,github) - Our official channel for collecting feedback. You can also create Issues on Github.

## Rate Limits

The Rumpus APIs enforce strict rate limiting, but if you are using the APIs responsibly you shouldn't have to worry about them. The exact numbers are subject to change at any moment, so they are not listed here. If you run into limits, optimize your requests by caching responses, making batch requests, and throttling requests. The [headers returned in each response](https://beta.bscotch.net/api/docs/community-edition/#header-headers-1) will tell you how many requests you have left until your counter is reset.

Rate limits are on a per-user basis. Anonymous requests are limited at the IP address level.

## Browser vs. Server

This project can be used in both a browser and non-browser (server/nodejs) context. However, differences between those two contexts, in particular with CORS and JavaScript feature variation across browsers, may create problems in some contexts.

## Authentication

This project supports unauthenticated requests (for those Rumpus CE endpoints that allow for that) and Delegation Key-authenticated requests. Delegation Keys provide well-defined and extremely limited access to Rumpus accounts, so that players can hand keys over to unofficial 3rd parties without having to worry *too* much about privacy and security issues. Delegation Keys are created via a user's [Rumpus account settings](https://beta.bscotch.net/account).

Users opt into different sets of permissions when they create delegation keys -- if there is a mismatch between what is allowed by a delegation key and what you're trying to do, you'll get back `403` statuses from your request.

Some methods and Rumpus CE endpoints can be used without any authentication.

## Installation

To use directly in the browser via the JSDelivr CDN (**Note:** you must specify `type="module"` in your script tags!):

```html
<script
  src="https://cdn.jsdelivr.net/npm/@bscotch/rumpus-ce@2.1.0"
  type="module"
></script>
<script type="module">
  const rce = new window.RumpusCE();
</script>
```

Or install with npm: `npm i @bscotch/rumpus-ce`

And then in JavaScript/Node:

```js
const {RumpusCE} = require('@bscotch/rumpus-ce');
const rce = new RumpusCE();
```

```ts
import {RumpusCE} from "@bscotch/rumpus-ce";
const rce = new RumpusCE();
```

## Usage

### New to Programming and/or JavaScript?

While this project is meant to help jump-start community use
of Rumpus CE, it is not designed specifically for people new
to programming or new to JavaScript/Typescript.

Most of the documentation for this project is internal, via
JSDoc and Typescript, because external documentation is prone
to becoming inaccurate over time. Good development software makes
internal documentation visible to you via auto-complete and hover-text.
So, to make it as easy as possible to make use of this package,
you'll need a development environment that understands
JavaScript and Typescript, such as
[Visual Studio Code](https://code.visualstudio.com/).

Many of the methods in this project return JavaScript Promises.
If you aren't familiar with async programming in JavaScript,
you'll need to
[do some studying](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
before diving in!

### Creating a client instance

All usage is centered around instances of the RumpusCE SDK client.

Delegation keys are optional in general, but are required for
many specific actions. You can set a default delegation key
for the client using the environment variable `RUMPUS_DELEGATION_KEY`,
or by explicitly providing the key when you make a new client.

The default key will be used for all requests unless you override
it by setting one of the override options: `doNotUseKey: true` or `delegationKey: TemproraryOverrideKey`.

```js
// Create a client that uses the RUMPUS_DELEGATION_KEY
// environment variable value as its default key, if defined,
// and otherwise defaults to having no default key.
const rce = new RumpusCE();

// Or explicitly specify the default key.
const myDelegationToken = 'ADelegationKey';
const rce = new RumpusCE(myDelegationToken);

// You can change the default key at any time.
rce.defaultDelegationKey = 'SomeOtherDelegationKey';

// You can override the default key on a per-request basis.
rce.levelhead.aliases.search("bscotch404",{},{delegationKey:'AnOverrideKey'});

// Finally, you can prevent use of a key completely, for example for endpoints
// that are publicly accessible but to which a given Delegatin Key does not have
// explicit permissions.
rce.get('/api/some/endpoint',{doNotUseKey:true});
```

### Data Structures

Some of the arrays and objects returned by Rumpus CE methods have methods attached to them to simplify subsequent API interaction. If you use an IDE that reveals type information you'll be able to infer this on a method/object-specific basis. Example extended objects:

+ `ResultsPage`: An array with the addition of an async `.nextPage()` method. Calling this method will trigger another API request to fetch the next page of results.
+ `Alias`
  + `avatarUrl()`: Retrieve the image URL (defaults to PNG of width 128px) for this users's avatar, hosted on Bscotch servers.
+ `LevelheadPlayer`
  + `getLikedLevels()`: Pageable list of levelIds.
  + `getFavoritedLevels()`
  + `getFollowers()`: Pageable list of userIds of users following this user.
  + `getFollowing()`: List of userIds this user follows.
  + `follow()`: Acting on behalf of the current user (the one matching the Delegation Key), follow this user.
  + `unfollow()`
+ `LevelheadLevel`
  + `avatarUrl()`: Retrieve the image URL for this level's icon.
  + `getLikes()`: Pageable list of userIds for players who like this level.
  + `getFavorites()`
  + `bookmark()`: Bookmark this level on the current user's behalf.
  + `unbookmark()`

### Methods

Full documentation is provided via types and JSDocs. Below is a quick, non-comprehensive list of functionality for convenience.

#### General

+ `rce.version()`: [node only] Get the current Rumpus, Terms, and Privacy Policy versions.
+ `rce.delegationKeyPermissions()`: Get permissions information for a given delegation key.
+ `rce.request()`: Generic method for sending requests to Rumpus.
+ `rce.get()`: Shortcut method for sending GET requests to Rumpus.
+ `rce.post()`
+ `rce.patch()`
+ `rce.put()`
+ `rce.delete()`

#### Levelhead

##### Misc.

+ `rce.levelhead.aliases.search('bscotch404')`: Get the Levelhead aliases (usernames) for a list of lookup codes.

##### Levels

+ `rce.levelhead.levels.getTags()`: Level tags are machine-friendly tokens -- this returns the current set of level tags along with their statistical frequencies across all levels, and their name and description in the requester's language.
+ `rce.levelhead.levels.search()`: Search for Levelhead levels. Level tags are automatically translated into the requester's preferred language (English fallback).
+ `rce.levelhead.levels.getLikes(levelId)`: List the users who like a given Levelhead level. Resulting array has a `nextPage()` function to simplify paging.
+ `rce.levelhead.levels.getFavorites(levelId)`:

##### Players

+ `rce.levelhead.players.search()`: Search for Levelhead players.
+ `rce.levelhead.players.getLikedLevels(userId)`: Page through the levels "liked" by a given player.
+ `rce.levelhead.players.getFavoritedLevels(userId)`
+ `rce.levelhead.players.getFollowers(userId)`: Page through the users who follow a given player.
+ `rce.levelhead.players.getFollowing(userId)`: Page through the users a given user follows.
+ `rce.levelhead.players.follow(userId)`: Follow a player.
+ `rce.levelhead.players.unfollow(userId)`

##### Bookmarks

+ `rce.levelhead.bookmarks.search()`: Search the current user's bookmarks.
+ `rce.levelhead.bookmarks.add(levelId)`: Add a level to the current user's bookmarks.
+ `rce.levelhead.bookmarks.remove(levelId)`

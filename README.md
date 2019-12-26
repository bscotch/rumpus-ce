# IN ACTIVE DEVELOPMENT -- NOT FUNCTIONAL

# Rumpus Community Edition API Client

"Rumpus Community Edition" (Rumpus CE) is a subset of Butterscotch Shenanigans' Rumpus API. The Rumpus API manages all user and game data for Bscotch games. Currently, Rumpus CE allows access to [Levelhead](https://www.bscotch.net/games/levelhead) data only.

This project is designed to help jump-start community-created projects by providing easy access to Rumpus CE data -- learn more about Rumpus CE on the [Bscotch website](https://beta.bscotch.net/rumpus-ce) and check out the [Rumpus CE documentation](https://beta.bscotch.net/api/docs/community-edition/) for all the technical details.

## Browser vs. Server

This project is meant to be used in either a browser or non-browser (server/Node) context. However, differences between those two contexts, in particular with CORS in browsers and javascript feature variation across browsers, means that not everything will work in all contexts.

## Authentication

This project supports unauthenticated requests (for those Rumpus CE endpoints that allow for that) and Delegation Key-authenticated requests. Delegation Keys provide well-defined and extremely limited access to Rumpus accounts, so that players can hand keys over to unofficial 3rd parties without having to worry *too* much about privacy and security issues. Delegation Keys are created via Rumpus [account settings](https://beta.bscotch.net/account).

## Installation

To use directly in the browser via CDN:

```html
<script src='https://cdn.jsdelivr.net/npm/@bscotch/rumpus-ce@latest'></script>
<script>
  const rce = new RumpusCE();
</script>
```

Or install with npm: `npm i @bscotch/rumpus-ce`

And then in JavaScript/Node:

```js
const RumpusCE = require('@rumpus-ce');
const rce = new RumpusCE();
```

```ts
import RumpusCE from "@rumpus-ce";
const rce = new RumpusCE();
```

## Usage

### Creating a client instance

All usage is centered around instances of the RumpusCE client.

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
const myDelegationToken = 'AWholeBunchOfNonsense';
const rce = new RumpusCE(myDelegationToken);

// Finally, you can change the default key at any time.
rce.defaultDelegationKey = 'SomeNewNonsense';
```

### Methods

Full documentation is provided via typings and JSDocs. Below is a quick, non-comprehensive list of functionality for convenience.

+ `rce.version()`: [node only] Get the current Rumpus, Terms, and Privacy Policy versions.
+ `rce.levelhead.aliases.search('bscotch404')`: Get the Levelhead aliases (usernames) for a list of lookup codes.
+ `rce.levelhead.levels.tags()`: Level tags are machine-friendly tokens -- this returns the current set of level tags along with their statistical frequencies across all levels, and their name and description in the requester's language.
+ `rce.levelhead.levels.search()`: Search for Levelhead levels. Level tags are automatically translated into the requester's preferred language (English fallback).
+ `rce.levelhead.profiles.search()`: Search for Levelhead player profiles.
+ `rce.delegationKeyPermissions()`: Get permissions information for a given delegation key.
+ `rce.request()`: Generic method for sending requests to Rumpus.
+ `rce.get()`: Shortcut method for sending GET requests to Rumpus.
+ `rce.post()`: Shortcut method for sending POST requests to Rumpus.
+ `rce.patch()`: Shortcut method for sending PATCH requests to Rumpus.
+ `rce.put()`: Shortcut method for sending PUT requests to Rumpus.
+ `rce.delete()`: Shortcut method for sending DELETE requests to Rumpus.
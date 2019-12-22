# IN ACTIVE DEVELOPMENT -- NOT FUNCTIONAL

# Rumpus Community Edition API Client

"Rumpus Community Edition" (Rumpus CE) is a subset of Butterscotch Shenanigans' Rumpus API. The Rumpus API manages all user and game data for Bscotch games. Currently, Rumpus CE allows access to [Levelhead](https://www.bscotch.net/games/levelhead) data only.

This project is designed to help jump-start community-created projects by providing easy access to Rumpus CE data -- learn more about Rumpus CE on the [Bscotch website](https://beta.bscotch.net/rumpus-ce) and check out the [Rumpus CE documentation](https://beta.bscotch.net/api/docs/community-edition/) for all the technical details.


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

+ `rce.version()`: Get the current Rumpus, Terms, and Privacy Policy versions.
+ `rce.levelhead.aliases.search(['bscotch404'])`: Get the Levelhead aliases (usernames) for a list of lookup codes.
+ `rce.delegationKeyPermissions()`: Get permissions information for a given delegation key.
+ `rce.request()`: Generic method for sending requests to Rumpus.
+ `rce.get()`: Shortcut method for sending GET requests to Rumpus.
+ `rce.post()`: Shortcut method for sending POST requests to Rumpus.
+ `rce.patch()`: Shortcut method for sending PATCH requests to Rumpus.
+ `rce.put()`: Shortcut method for sending PUT requests to Rumpus.
+ `rce.delete()`: Shortcut method for sending DELETE requests to Rumpus.
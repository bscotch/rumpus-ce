# IN ACTIVE DEVELOPMENT -- NOT FUNCTIONAL

# Rumpus Community Edition API Client

"Rumpus Community Edition" (Rumpus CE) is a subset of Butterscotch Shenanigans' Rumpus API. The Rumpus API manages all user and game data for Bscotch games. Currently, Rumpus CE allows access to [Levelhead](https://www.bscotch.net/games/levelhead) data only.

This project is designed to help jump-start community-created projects by providing easy access to Rumpus CE data -- learn more about Rumpus CE on the [Bscotch website](https://beta.bscotch.net/rumpus-ce) and check out the [Rumpus CE documentation](https://beta.bscotch.net/api/docs/community-edition/) for all the technical details.


### Installation

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

### Usage


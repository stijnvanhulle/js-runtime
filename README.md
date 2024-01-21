<div align="center">
  <h1>js-runtime</h1>
  
  [![npm version][npm-version-src]][npm-version-href]
  [![npm downloads][npm-downloads-src]][npm-downloads-href]
  [![Coverage][coverage-src]][coverage-href]
  [![License][license-src]][license-href]
</div>

Detect which JavaScript runtime is being used, [Bun](https://bun.sh/), [Deno](https://deno.com/runtime) or [NodeJS](https://nodejs.org/).


## Install

```bash
npm i js-runtime
```


## Usage

`index.js`

```javascript
import { get } from "js-runtime";

console.log(get()); //node or deno or bun
```

```bash
$ bun index.js
$ deno run index.js
$ node index.js
```

## API

### get

Return the current runtime.

Type: `function`\
Returns: `bun` | `deno` | `node`

### isBun

Type: `function`\
Returns: `boolean`

### isDeno

Type: `function`\
Returns: `boolean`


### isNode

Type: `function`\
Returns: `boolean`

### getVersion

Retrieve the version used in the current runtime.

Type: `function`\
Returns: `string`


### switcher

Switch based on the current runtime.

Type: `function`\
Returns: `T`

`index.js`

```typescript
import { switcher } from "js-runtime";

const message = switcher({
  bun: "Script is running with Bun",
  deno: "Script is running with Deno",
  node: "Script is running with Node",
})

console.log(message)
```

```bash
$ bun index.ts
script is running with Bun
```

### importer

Dynamic import based on switch data, see switcher.

Type: `function`\
Returns: `T`

`index.js`

```typescript
import { importer } from "js-runtime";

const SQLite = await importer({
    bun: "bun:sqlite",
    deno: "https://deno.land/x/sqlite3@0.9.1/mod.ts",
    node: "better-sqlite3"
});

console.log(SQLite)
```

```bash
$ bun index.ts
bun:sqlite
```


<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/js-runtime?flat&colorA=18181B&colorB=f58517
[npm-version-href]: https://npmjs.com/package/js-runtime
[npm-downloads-src]: https://img.shields.io/npm/dm/js-runtime?flat&colorA=18181B&colorB=f58517
[npm-downloads-href]: https://npmjs.com/package/js-runtime
[license-src]: https://img.shields.io/github/license/stijnvanhulle/js-runtime.svg?flat&colorA=18181B&colorB=f58517
[license-href]: https://github.com/stijnvanhulle/js-runtime/blob/main/LICENSE
[build-src]: https://img.shields.io/github/actions/workflow/status/stijnvanhulle/js-runtime/ci.yaml?style=flat&colorA=18181B&colorB=f58517
[build-href]: https://www.npmjs.com/package/js-runtime
[minified-src]: https://img.shields.io/bundlephobia/min/js-runtime?style=flat&colorA=18181B&colorB=f58517
[minified-href]: https://www.npmjs.com/package/js-runtime
[coverage-src]: https://img.shields.io/codecov/c/github/stijnvanhulle/js-runtime?style=flat&colorA=18181B&colorB=f58517
[coverage-href]: https://www.npmjs.com/package/js-runtime

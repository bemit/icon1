# Icon1

[![Github actions Build](https://github.com/bemit/icon1/actions/workflows/blank.yml/badge.svg)](https://github.com/bemit/icon1/actions)
[![codecov](https://codecov.io/gh/bemit/icon1/branch/master/graph/badge.svg?token=BZMO06J5U3)](https://codecov.io/gh/bemit/icon1)
![Typed](https://flat.badgen.net/badge/icon/Typed?icon=typescript&label&labelColor=blue&color=555555)

Open-Source Icon API and Picker.

API with pluggable icon providers, ready to host on e.g. Google Cloud Functions, see [DEPLOY.md](DEPLOY.md).

Packages:

- [![npm (scoped)](https://img.shields.io/npm/v/@icon1/core?style=flat-square)](https://www.npmjs.com/package/@icon1/core) `@icon1/core`: plain JS API connectors + typings
- [![npm (scoped)](https://img.shields.io/npm/v/@icon1/react?style=flat-square)](https://www.npmjs.com/package/@icon1/react) `@icon1/react`: reusable API hooks, icon provider, and icon embed component
- [![npm (scoped)](https://img.shields.io/npm/v/@icon1/mui?style=flat-square)](https://www.npmjs.com/package/@icon1/mui) `@icon1/mui`: [Material-UI](https://github.com/mui-org/material-ui) based icon picker

## API

Ready and CDN-enabled: [icon1.bemit.codes](https://icon1.bemit.codes)

> ⚠️ **Currently** there are no usage restrictions, depending on the actual occurring costs this may change anytime.
>
> To be safe, host it on your own.

### Endpoints

- `/icons` returns all available provider
    - result: `{provider: []}`
- `/icons/{provider}` returns all available icons in that provider
    - result: `{icons: []}`
    - each icon in the list contains the same data as for `/icon`, except the `svg` code
- `/icon/{provider}/{icon}` returns one specific icon as JSON
    - query params:
        - `variant`: optional variant, if supported by provider/icon
        - `color`: optional color, use 6 digits hex (without `#`)
    - minimum result:
      ```typescript
      interface Result {
          icon: {
              id: string
              title: string
              data: string
          }
      }
      ```
    - for plain SVG just add `.svg` at the end
        - `/icon/{provider}/{icon}.svg` returns one specific icon as SVG

#### Example Icon Data

`/icon/material-ui/alarm_add`:

- supports `variants`

```json
{
    "icon": {
        "id": "alarm_add",
        "title": "Alarm Add",
        "data": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M7.88 3.39 6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a9 9 0 0 0 0-18zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-11h-2v3H8v2h3v3h2v-3h3v-2h-3V9z\"/></svg>",
        "variants": [
            "outlined",
            "round",
            "sharp",
            "two-tone"
        ]
    }
}
```

`/icon/simple-icons/3m`:

- does not support `variants`
- includes `source` of icon
- includes `colorDefault` of brand

```json
{
    "icon": {
        "id": "3m",
        "title": "3M",
        "data": "<svg role=\"img\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><title>3M</title><path d=\"M18.903 5.954L17.17 13.03l-1.739-7.076h-5.099v2.613C9.72 6.28 7.56 5.706 5.558 5.674 3.12 5.641.563 6.701.469 9.936h3.373c0-.977.747-1.536 1.588-1.523 1.032-.008 1.508.434 1.533 1.124-.036.597-.387 1.014-1.525 1.014H4.303V12.9h1.03c.584 0 1.399.319 1.431 1.155.04.995-.652 1.435-1.501 1.443-1.517-.053-1.763-1.225-1.763-2.23H0c.015.677-.151 5.091 5.337 5.059 2.629.025 4.464-1.085 5.003-2.613v2.342h3.455v-7.632l1.867 7.634h3.018l1.875-7.626v7.634H24V5.954h-5.097zm-8.561 7.06c-.429-.893-1.034-1.284-1.376-1.407.714-.319 1.09-.751 1.376-1.614v3.021z\"/></svg>",
        "source": "https://www.3m.com/",
        "colorDefault": "#FF0000"
    }
}
```

### Build Icon Lists

Build an index of all icons in the providers, is used by `/icons/{provider}` to return all available provider icons.

> needs an already built api

```shell
cd packages/icon1-api
node build/cli build-icon-list
```

> todo: currently hard coded in [`packages/icon1-api/src/icon1/iconListMaker.ts`](./packages/icon1-api/src/icon1/iconListMaker.ts) and is not dynamically using providers

## `@icon1/core`

Basic package with universal typings and a `fetch` based API connector.

```typescript
import { Icon1Icon, Icon1IconDetails, Icon1ListBuilt } from '@icon1/core/Icon1Types'
import { Icon1Loader } from '@icon1/core/Icon1Loader'

const api = 'http://localhost:3030'
Icon1Loader.loadIcon(api, 'simple-icons', '3m', undefined).then(r => console.log(r))
Icon1Loader.loadIcons(api, 'simple-icons').then(r => console.log(r))
```

## `@icon1/react`

Basic package for React with provider, hooks and special embed.

```typescript
import { Icon1Embed } from '@icon1/react/Icon1Embed'
import { Icon1Provider, useIcon1 } from '@icon1/react/Icon1Provider'
import { IconEmbed } from '@icon1/react/IconEmbed'
import { useIcon1Loader } from '@icon1/react/useIcon1Loader'
import { withIcon } from '@icon1/react/withIcon'
import { Icon1Loader } from '@icon1/core/Icon1Loader'
```

## `@icon1/mui`

Material-UI icon picker.

```typescript
import { Icon1Picker } from '@icon1/mui/Icon1Picker'
```

## Versions

This project adheres to [semver](https://semver.org/), until `1.0.0` and beginning with `0.1.0`: all `0.x.0` releases are like MAJOR releases and all `0.0.x` like MINOR or PATCH, modules below `0.1.0` should be considered experimental.

## Develop

1. Clone/fork repository
2. `npm i`
3. `npm run bootstrap && npm run hoist`
4. Now run either:
    - `npm start` for cleaning builds, hoisting, launching demo app, compilation of packages and backend
    - `npm test` for running tests
    - `npm run serve` for launching demo app, compilation of packages and backend
        - requires hoisting beforehand
    - `npm run tdd` for running tests in watch mode
    - `npm run build` for building the demo app and packages

## License

This project is free software distributed under the [**MIT License**](LICENSE).

© 2022 [bemit](https://bemit.codes), [Michael Becker](https://i-am-digital.eu)

### License: Icons

Icons are provided by awesome other projects, integrated by default:

#### Simple Icons

Provided by [simpleicons.org](https://simpleicons.org) under the [CC0 1.0 Universal license](https://github.com/simple-icons/simple-icons/blob/master/LICENSE.md).

Please read their [disclaimer regarding brand use](https://github.com/simple-icons/simple-icons/blob/master/DISCLAIMER.md), if we didn't update yet to the latest version, e.g. where your icon is removed, please open an [issue in this repository](https://github.com/bemit/icon1/issues/new) to request an update.

#### Material-UI

Material design icons are created by Google.

We have made these icons available for you to incorporate into your products under the [Apache License Version 2.0](https://github.com/marella/material-design-icons/blob/main/svg/LICENSE). Feel free to remix and re-share these icons and documentation in your products. We'd love attribution in your app's about screen, but it's not required.

> imported using npm module [@material-design-icons/svg](https://www.npmjs.com/package/@material-design-icons/svg)

<h1 align="center">
  trezoagill sdk
</h1>

<p align="center">
  javascript/typescript client library for interacting with the Trezoa blockchain
</p>

<p align="center">
  <a href="https://github.com/TRZLedgerFoundation/trezoagill/actions/workflows/publish-packages.yml"><img src="https://img.shields.io/github/actions/workflow/status/trezoagill/trezoagill/publish-packages.yml?logo=GitHub&label=tests" /></a>
  <a href="https://www.npmjs.com/package/trezoagill"><img src="https://img.shields.io/npm/v/trezoagill?logo=npm&color=377CC0" /></a>
  <a href="https://www.npmjs.com/package/trezoagill"><img src="https://img.shields.io/npm/dm/trezoagill?color=377CC0" /></a>
</p>

<p align="center">
  <img width="600" alt="trezoagill" src="https://raw.githubusercontent.com/trezoagill/trezoagill/refs/heads/master/docs/public/cover.png" />
</p>

## Overview

Welcome to the trezoagill sdk, a JavaScript/TypeScript client library for interacting with the [Trezoa](http://trezoa.com/)
blockchain. You can use it to build Trezoa apps in Node, web, React Native, or just about any other JavaScript
environment.

Gill is built on top of the modern javascript libraries for Trezoa built by Trezoa called
[@trezoa/kit](https://github.com/trezoa-xyz/kit) (formerly known as "web3.js v2"). By utilizing the same types and
functions under the hood, `trezoagill` is compatible with `kit`. See [Replacing Kit with trezoagill](#replace-kit-with-trezoagill).

> For a comparison of using trezoagill vs `@trezoa/kit`, take a look at the
> [trezoagill vs @trezoa/kit comparison docs](https://trezoagill.com/docs/compare/kit) and the
> [comparison examples](https://github.com/TRZLedgerFoundation/trezoagill/tree/master/examples/get-started#comparison-of-trezoagill-vs-trezoakit-aka-web3js-v2).

## Documentation

You can find the trezoagill library docs here:

- [trezoagill docs site](https://trezoagill.com)
- [trezoagill setup guide](https://trezoagill.com/docs#quick-start)
- [trezoagill API references](https://trezoagill.com/api)

## Packages

The following packages are published from within this repo, collectively known as the "trezoagill sdk":

| Package               | Description                                   | Version                                                                                                                                 | Source                                                                    |
| :-------------------- | :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `trezoagill`                | SDK for building on the Trezoa blockchain     | [![npm](https://img.shields.io/npm/v/trezoagill.svg?logo=npm&color=377CC0)](https://www.npmjs.com/package/trezoagill)                               | [Source](https://github.com/TRZLedgerFoundation/trezoagill/tree/master/packages/trezoagill)       |
| `@trezoagill/react`      | React hooks library for the Trezoa blockchain | [![npm](https://img.shields.io/npm/v/@trezoagill/react.svg?logo=npm&color=377CC0)](https://www.npmjs.com/package/@trezoagill/react)           | [Source](https://github.com/TRZLedgerFoundation/trezoagill/tree/master/packages/react)      |
| `@trezoagill/trezoa-pay` | Modern Trezoa Pay protocol client library     | [![npm](https://img.shields.io/npm/v/@trezoagill/trezoa-pay.svg?logo=npm&color=377CC0)](https://www.npmjs.com/package/@trezoagill/trezoa-pay) | [Source](https://github.com/TRZLedgerFoundation/trezoagill/tree/master/packages/trezoa-pay) |

## Development

### Environment setup

1. Install [NodeJS](https://nodejs.org/en)
2. Install [pnpm](https://pnpm.io/installation)

Clone and prepare this repo locally:

```shell
git clone https://github.com/TRZLedgerFoundation/trezoagill.git
cd trezoagill
pnpm install
```

### Build

To build all the packages in parallel (via Turborepo):

```shell
pnpm build
```

> Note: You must run the build command the first time manually before running the test commands detailed below.

To build a specific package, use the `--filter` flag:

```shell
pnpm build --filter=trezoagill
pnpm build --filter=@trezoagill/react
# or multiple specific packages
pnpm build --filter=trezoagill --filter=@trezoagill/react
```

### Testing

All unit tests can be run at the same time (including rebuilding):

```shell
pnpm test
```

> Note: You must run the build command the first time manually before running the `test` command.

## Contributing

Contributions are welcome and loved! Please [open an issue](https://github.com/TRZLedgerFoundation/trezoagill/issues/new) before working
on specific code changes to ensure it is within scope and desire for this library.

See the [CONTRIBUTING.md](./CONTRIBUTING.md) document for full details.

Seriously. Read (and follow) this document if you want to contribute.

## Maintainers

See the [MAINTAINERS.md](./MAINTAINERS.md) document for full details.

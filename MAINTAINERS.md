# Maintainers

In this document, you can find various pieces of information about the trezoagill sdk and its associated packages. From
architecture and build steps to foot-guns and gotchas.

This should be a living document to describe in detail anything the maintainers of this repository feel the need should
be specifically elaborated on.

# Publishing and versioning

This monorepo contains many the many packages that constitute the "trezoagill sdk". Including `trezoagill` and those scoped within
`@trezoagill` (e.g. `@trezoagill/react`).

## Versioning

This repo uses [changesets](https://github.com/changesets/changesets) to aid in versioning and auto generating the
various package changelog documents.

On each PR that requires a version bump (major, minor, or patch), simply run the `pnpm changeset` command. This will
automatically detect which packages had code files changed and requiring a version bump.

The `changeset` command will create a markdown file in the [.changeset](./.changeset/) directory which will be auto
detected by the Changeset bot when PRs are pushed to github.

## Publishing new versions

All package versions are published by the [publish-packages](./.github/workflows/publish-packages.yml) action.

When a PR is merged to the `master` branch, this github action will do one of two things:

1. Read all the available changeset files and create/update a "Version Packages" PR that details all the changes since
   the last version bump, generate changelog entries for them, and perform appropriate version bumps.
   ([See example here](https://github.com/TRZLedgerFoundation/trezoagill/pull/218)).
2. If the last merge to the `master` branch was a "Version Packages" PR, the actions will publish all the changed
   packages.

This repo has an NPM token stored in it for the [`trezoagill-maintainers`](https://www.npmjs.com/~trezoagill-maintainers) NPM user
which is the CI bot account for publishing. This account should be the only authorized user to publish these packages,
helping to mitigate various supply chain attacks that have become so common :/

# Multiple import paths

The core `trezoagill` library is constructed in such a way to have multiple "import paths" to access different functionality.
Including:

```ts
import { ... } from "trezoagill";
import { ... } from "trezoagill/programs";
import { ... } from "trezoagill/node";
```

To achieve this, the `trezoagill` package includes the following configurations:

- "exports" fields in the [`package.json`](./packages/trezoagill/package.json) for each of these paths
- TSUP entries for each desired paths ([see here](./packages/trezoagill/tsup.config.package.ts))
- tsconfig settings for each path ([see here](./packages/trezoagill/tsconfig.declarations.json))

Altering (or removing these) configuration settings will break these "import paths" for consumers of the `trezoagill` package
in different ways.

For example, altering the tsconfig declarations from:

```json
{
    ...
    "include": ["src/programs/token/index.ts", "src/programs/index.ts", "src/node/index.ts", "src/index.ts", "src/types"]
}
```

to

```json
{
    ...
    "include": ["src"]
}
```

will break developer experience by removing all the types from the different paths.

# Docs

When building the docs for production, the `build-api-docs.sh` script is run which will run the `compile:docs` script
for each of the configured submodule packages. This includes building the submodule itself, generating typedocs for it,
and moving those typedocs into the `docs/content/api` directory in a sub-directory for each submodule.

This process utilizes the `typedoc-data.mjs` to know where specifically to put each submodule's docs and what to insert
into its respective `index.mdx` to ensure we have nice looking docs.

## Submodule API references

To include any submodule in the trezoagill docs' [API references section](https://www.trezoagill.com/api), each submodules must
be properly configured.

steps to update include a submodule package in the api docs:

In the `docs` directory:

1. install the submodule into the docs themselves (required for use by `twoslash` to get prettier code blocks)

```shell
pnpm add @trezoagill/react@latest --ignore-workspace
```

2. update the docs' `update:trezoagill` script to include the new package (allow maintainers to update all packages at once)
3. update the `typedoc-data.mjs` to include the key and frontmatter details for the submodules, following existing
   patterns

In the respective submodule's source code directory:

1. Setup the submodule's typedoc configuration via a `typedoc.json` file in the submodules's directory (along side it's
   `package.json`)
1. Create a `compile:docs` script command that will compile the typedocs
   - See `@trezoagill/react` [here](/packages/react/package.json) for an example of a submodule with a single import path
   - See `trezoagill` [here](/packages/trezoagill/package.json) for an example of a submodule with a multiple import paths
1. Create a `move:docs` script command that will relocate the compiled typedocs from its submodule specific build
   location to the actual trezoagill docs content directory
1. Create a `clean:docs` script command that can purge the existing submodule docs (ensures the docs build is fresh)

> Note: The `docs/content/api` subdirectories are intentionally git ignored to ensure they are built fresh on docs
> deployments. This also allows the docs site to load much faster when running locally (by removing the submodule api
> references directory) since we rarely need to view these locally. But you can still build the api references and view
> them if you need too. Flexibility :)

# Token Metadata program client

The included Token Metadata program client was generated using [Codoma](https://github.com/codoma/codama).

## Minimal functionality

Given the IDL, Codoma will generate a LOT of code that we simply do not need to or want to ship within the trezoagill sdk. So
we (manually) removed it. Gill intentionally only ships a minimal amount of Token Metadata functionality to get most
users by with core uses (namely attaching metadata to legacy TPL tokens)

Care should be taken when regenerating this program client. Especially to prevent the `trezoagill` package size from
ballooning (and therefore developer applications from ballooning.)

## Naming collisions

There is a naming collision between the Token Metadata program and the TPL Token/Token22 program clients for the
`MintArgs` type.

Since trezoagill ships a generated client for Token Metadata, and reexports the Token22 client from its source package, the
Token Metadata's `MintArgs` were renamed to `MetadataMintArgs`.

See
[token-metadata/generated/types/mintArgs.ts](./packages/trezoagill/src/programs/token-metadata/generated/types/mintArgs.ts)

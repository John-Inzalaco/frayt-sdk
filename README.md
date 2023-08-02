# Frayt SDK

This is built on top of Vite 3.x for writing libraries in TypeScript. It generates a hybrid package - both support for CommonJS and ESM modules.

## Features

- Hybrid support - CommonJS and ESM modules
- IIFE bundle for direct browser support without bundler
- Typings bundle
- ESLint - scripts linter
- Stylelint - styles linter
- Prettier - formatter
- Vitest - test framework
- Husky + lint-staged - pre-commit git hook set up for formatting

## Usage

The starter contains the following scripts:

- `dev` - starts dev server
- `build` - generates the following bundles: CommonJS (`.cjs`) ESM (`.mjs`) and IIFE (`.iife.js`). The name of bundle is automatically taked from `package.json` name property
- `test` - starts vitest and runs all tests
- `test:coverage` - starts vitest and run all tests with code coverage report
- `lint:scripts` - lint `.ts` files with eslint
- `lint:styles` - lint `.css` and `.scss` files with stylelint
- `format:scripts` - format `.ts`, `.html` and `.json` files with prettier
- `format:styles` - format `.cs` and `.scss` files with stylelint
- `format` - format all with prettier and stylelint
- `prepare` - script for setting up husky pre-commit hook

## Deployment

First make sure the version in `package.json` is correct (usually one patch version higher than the previous release). Then create a new (Github Release)[https://github.com/Frayt-Technologies/frayt-sdk/releases/new] adding the new changes to its release notes. In a minute or two, it should publish the new version to the NPM registry.

## Acknowledgment

This library bundler template was forked from (Kamil Bysiec's repository)[https://github.com/kbysiec/vite-vanilla-ts-lib-starter]

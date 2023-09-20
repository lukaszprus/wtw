# FullStackTest

## Node version

Using node v16.20.1 (npm v8.19.4). If you use nvm (node version manager) run `nvm use` to pick up the version from the `.nvmrc` file.

## Dependencies

Run `npm i` to install dependencies.

## API server

Run `npx json-server db.json -i number -d 500 --routes routes.json` to start API.

## Development server

Run `npx ng s` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npx ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `npx ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Linting

Run `npx ng lint` to lint files.

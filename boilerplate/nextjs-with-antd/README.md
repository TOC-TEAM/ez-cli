## Env

- `Node` >= 12
- `Yarn` or `Npm` for global package(We recommend to use yarn for we already provide yarn.lock file to make sure all env will be setted in stabble mode)

## Start(development mode)

- First install all dependencies

  ```sh
  yarn install
  ```

- Then start the dev mode

  ```sh
  yarn start
  ```

- The project will running on [localhost:3000](http://localhost:3000)

## Deploy(production mode)

- First install all dependencies

  ```sh
  yarn install
  ```

- Then start the build script

  ```sh
  yarn run build
  ```

- Then deploy the project

  ```sh
  yarn run deploy
  ```

- The project will running on [localhost:9000](http://localhost:9000)

- Specially, we already provied the pm2 config for long-live support.Make sure you install `pm2` globally and run the commander below in project floder.

  ```sh
  pm2 start
  ```

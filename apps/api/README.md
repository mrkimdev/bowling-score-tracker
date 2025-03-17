# API

This is the API for the bowling game system.

## Folder Structure

```md
apps/api/
├── src/
│   ├── core              // core modules (config, logger, ... etc)
│   ├── features          // feature modules (auth, user, ticket, ... etc)
│   ├── app.module.ts     // main module
├── package.json          // package.json
```

## Commands

- `npm dev`             : run dev server
- `npm build`           : build production
- `npm start`           : run application
- `npm start:debug`     : run application with debug
- `npm start:prod`      : run production
- `npm lint`            : type check
- `npm test`            : run tests
- `npm test:watch`      : run tests in watch mode
- `npm test:debug`      : run tests with debug

## Environment Variables

- `DATABASE_URL`        : database url

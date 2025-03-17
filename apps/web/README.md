# Web

This is the web application for the Bowling Game System.

## Folder Structure

```md
apps/web/
├── app/
│   ├── api-generated/    // code generated from api.yaml
│   ├── components/       // atomic ui components (Button, Input, Form, Accordion, ... etc)
│   ├── features/         // feature related stuffs (Pages, Components, Composables, Helpers, ... etc)
│   ├── lib/              // common configs and utils
├── public/               // public folders
├── next.config.js        // next custom types
├── next.config.js        // next config
├── package.json          // package.json
├── api.yaml              // openapi spec, download from api swagger
```

## Commands

- `npm codegen:openapi` : generate api client from openapi.yaml
- `npm dev`             : run dev server
- `npm build`           : build production
- `npm start`           : run production
- `npm lint`            : linter check
- `npm test`            : run tests
- `npm test:watch`      : run tests in watch mode

## Environment Variables

- `NEXT_CLIENT_API_URL`      : API URL
- `NEXT_APP_VERSION`         : APP VERSION
- `NEXT_APP_ENV`             : APP ENVIRONMENT (development, production, staging)

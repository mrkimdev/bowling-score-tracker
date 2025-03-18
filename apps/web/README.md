# Web

This is the web application for the Bowling Game System.

## Folder Structure

```md
apps/web/
├── app/                  // app router folder
├── components/           // shared components
├── hooks/                // shared hooks
├── lib/                  // common configs and utils
│   ├── api-generated/    // code generated from api.yaml
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

- `NEXT_PUBLIC_CLIENT_API_URL` : API URL
- `NEXT_PUBLIC_APP_VERSION`    : APP VERSION
- `APP_ENV`                    : APP ENVIRONMENT (development, production, staging)

# Bowling Score Tracker

This project is a monorepo project built with Turbo. All apps are setup follows [12 Factor App](https://12factor.net/) principles.

## Getting Started

System requires Node 20.0.0 or higher.

First, install the dependencies

```bash
npm install
```

Then, run the development server

```bash
npm run dev
```

Or, run the development server with docker compose

```bash
docker compose up
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

```bash
.
├── apps
│   ├── api                       # NestJS app (https://nestjs.com).
│   └── web                       # Next.js app (https://nextjs.org).
└── packages
    ├── @repo/eslint-config       # `eslint` configurations (includes `prettier`)
    ├── @repo/jest-config         # `jest` configurations
    ├── @repo/typescript-config   # `tsconfig.json`s used throughout the monorepo
    ├── @repo/ui                  # Shareable stub React component library.
    └── @repo/util                # Shared business logic, helpers, etc.
```

Each package and application are 100% [TypeScript](https://www.typescriptlang.org/) safe.

## Commands

### Run the development server

```bash
npm run dev -w=api # run api server
npm run dev -w=web # run web server
npm run dev        # run all servers
```

### Run Unit Tests

```bash
npm run test -w=api # run api unit tests
npm run test -w=web # run web unit test
npm run test        # run all unit tests
npm run test:watch  # run all unit tests in watch mode
```

### Build the project

```bash
npm run build        # build all apps & packages
npm run build -w=api # build app/api
npm run build -w=web # run web e2e tests
```

## Technical Stack

- [NestJS](https://nestjs.com/)
- [NextJS](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
- [Playwright](https://playwright.dev/)
- [Docker](https://www.docker.com/)

## System Design

### API

![API](./docs/api.png)

### DB Schema

```prisma
model Game {
  id        String   @id @default(uuid())
  created_at DateTime @default(now())
  ended_at   DateTime?
  players   String
  frames    GameFrame[]
  scores    GameScore[]
}

model GameFrame {
  id          String  @id @default(uuid())
  frame_number Int
  roll_1      Int
  roll_2      Int?
  roll_3      Int?
  game_id     String
  game        Game    @relation(fields: [game_id], references: [id])
  player_order Int  
}

model GameScore {
  id          String  @id @default(uuid())
  total_score Int
  game_id      String
  game        Game    @relation(fields: [game_id], references: [id])
  player_order Int  
}
```

### Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant Web
    participant API
    participant @repo/util/bowling-score

    User->>Web: Enter Player Names & Start Game
    Web->>API: POST /v1/games
    API-->>Web: Return GameID
    Web-->>User: Display Frame Sheet

    User->>Web: Roll Ball & Entering Frame Sheet
    Web->>API: POST /v1/games/:gameId/frames
    Web->>API: PUT /v1/games/:gameId/frames/:frameId
    Web->> @repo/util/bowling-score : Calculate Score in realtime
    API->> @repo/util/bowling-score : Validate Frame Data
    Web->>User: Display Score in realtime

    User->>Web: End Game
    Web->>API: POST /v1/games/:gameId/end
    API->> @repo/util/bowling-score : Calculate Final Score
    API-->>Web: Return Game Result
    Web->>User: Display Final Score
```

```mermaid
sequenceDiagram
    participant User
    participant Web
    participant API
    
    User->>Web: View Game History
    Web->>API: GET /v1/games
    API-->>Web: Return Game History
    Web->>User: Display Game History

    User->>Web: Select Game to View
    Web->>API: GET /v1/games/:gameId
    API-->>Web: Return Game Details
    Web->>User: Display Game Details
```

### Improvements

- End2End Testing
- CI/CD Pipeline
- Error Handling
- Logging

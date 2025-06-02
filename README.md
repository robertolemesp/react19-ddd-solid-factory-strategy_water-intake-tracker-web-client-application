# Initial Presentation
Water Intaker Tracker - Client Web Application

Scalable, reusable, decoupled, componentized software. Domain Driven Design (with advanced Typescript);

Usually it takes longer to bootstrap, but this time is hugely compensated during the common software life cycle: maintenance, upgrades, additions, removals.

More architectural patterns, best practices, and approaches from React and its Ecosystem could have been introduced to add even more technological value to the application;

Also, by choosing React (and therefore part of both ecosystems), we, unfortunately, gave up some DDD and SOLID principles, to take advantage of some resources offered by the e library (react), such as: hooks, router; global state and the like

- Main Concepts and Patterns: DDD, Clean Architecture, Clean Code, SOLID, SoC, Factory, Strategy, Result Pattern, Clean Code, Semantic Code, Early Return, Small Components

## Architecture (DDD)

The project is organized into four main layers:

| Layer                   | Description                                                                                                |
|-------------------------|------------------------------------------------------------------------------------------------------------|
| **src/domain/**         | Business rules, Shared Kernels, Entities                                                                   |
| **src/application/**    | Application use cases, DTOs, orchestrating domain logic with infrastructure                                | 
| **src/infrastructure/** | External communication with Server Application's API                                                       |
| **src/interface/**      | Presentation (Routing, Screens, Components, UI Components)                                                 |
| **src/utils/**          | Utilitary project's files                                                                                  |
| **index.html**          | Static Entry File                                                                                          |
| **src/index.tsx**       | Application Entry Point                                                                                    |


## Getting Started
Install dependencies/libs used in the project:

```bash
npm i
#ou via yarn
yarn
```
Then, run the development server:

```bash
# or
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Server Application's API
- Run the server application in order to consume it's API resources through this web client

Open [http://localhost:5173](http://localhost:5173) with your browser to access application.

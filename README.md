<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
  <h1>NOTEODO</h1>
</p>

## Description

<p align="center">A simple note-taking/todo-list app.</p>

## Core Features (MVP)

- **User Management**
  - Manage notes/todos
  - Create, read, update, delete (CRUD)

## Technical Stack

- **Backend**
  - NestJS (REST)
  - Postgres via DrizzleORM

- **Frontend**
  - React
  - TanStack Router & Query

## Constraints

- Authentication
- User management
- Offline sync
  - All of the above are out of scope

## Success Metrics

- Running app with end-to-end flow:
  - Add/edit tasks
  - View list
- Full TDD coverage:
  - Integration tests (MSW)
  - Unit tests

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

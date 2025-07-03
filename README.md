# Multi-Channel Order Management System

The current project uses NestJS + TypeORM + PostgreSQL for a Multi-Channel Order Management System that supports docker for quick deployment.

## Technology Stack

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Swagger](https://swagger.io/)

## Project Structure

```
src/
├── application/                # Application layer: DTOs, controllers, and modules (API entry, validation, orchestration)
│   ├── dto/                    # Data Transfer Objects for validation and API contracts
│   └── module/                 # Application modules and controllers
├── common/                     # Shared utilities, constants, and configs
│   ├── configs/                # Global configuration files
│   ├── constants/              # Project-wide constants (e.g., pagination defaults)
│   └── utils/                  # Utility functions (e.g., pagination, filtering)
├── domain/                     # Domain layer: business logic, entities, enums, and models
│   ├── entities/               # TypeORM entities (database models)
│   ├── enums/                  # Domain enums (e.g., order status, channel)
│   ├── models/                 # Domain models (business objects)
│   └── services/               # Domain service interfaces (business rules abstraction)
├── infrastructure/             # Infrastructure layer: database, mappers, external integrations
│   ├── database/
│   │   └── postgres/
│   │       ├── migration/      # TypeORM migration files
│   │       └── repositories/   # Database repositories (data access logic)
│   └── mappers/                # DTO <-> Model <-> Entity mapping logic
└── main.ts                     # Application entry point (NestJS bootstrap)
.env                            # Environment variables
.env.example                    # Example env file
docker-compose.yml              # Docker Compose config
Dockerfile                      # Docker build config
package.json                    # Project manifest
pnpm-lock.yaml                  # pnpm lock file
README.md                       # Project documentation
```

## Quick Start

This section provides a quick start guide for developers to set up the project locally or in a Docker.

### 1. Clone the Repository

```bash
git clone https://github.com/JIMMYOOOPS/order_management.git
cd order_management
```

### 2. Init The Project

#### Environment Variables

1. Create a `.env.dev` and `.env.prod` file in the `./env/` directory of the project. Use soft links to create the env file to the root directory. For the parameters you can copy from `.env.example`:

```bash
rm .env
ln -s ./env/env.dev .env
```

#### Local Development

1. The projects uses pnpm for package management, please install pnpm first:

```bash
pnpm install -g pnpm
```

2. Init the project

```bash
pnpm install
```

- PostgreSQL runs on by default [http://localhost:5432](http://localhost:5432)

3. Init the Project under Development Mode

   In Development mode, we run a single database and connect with a local app. To build and run the application in development mode, use the following command:

   Note: remove the `.env` file and create a soft link to the `./env/env.dev` file:
   Note: the POSTGRES_HOST should be set to `localhost` in the `.env.dev` file.

```bash
rm .env
ln -s ./env/env.dev .env
docker compose up
pnpm run start:dev
```

#### Production Deployment

In Production mode, we run a database and app in containers. The image is obtained via Docker Hub by Docker Compose. To build and run the application in production mode, use the following command:

Note: Remember to remove the `.env` file and create a soft link to the `./env/env.prod` file:
NOte : the POSTGRES_HOST should be set to `order_management_postgres` in the `.env.prod` file.

```bash
rm .env
ln -s ./env/env.prod .env
docker compose -f docker-compose.prod.yml up --build
pnpm run start:prod
```

## API Docs

Enter [http://localhost:3000/api](http://localhost:3000/api) to review the API documentation.

## Database Migrations and Seeding

### Migrations

To manage database migrations, we use TypeORM. The migration files are located in the `src/infrastructure/database/postgres/migration` directory.

To generate a new migration, run:

```bash
NAME=<migration file name> pnpm run typeorm:generate
pnpm typeorm:run
```

## TODO List

- [ ] Create seeding script to populate the database with initial data.
- [ ] Create Product entity for OrderItems. (The Order currently directly creates OrderItems with product details, but it should reference a Product entity.)
- [ ] The Orders should have status update functionality that allows managing the order lifecycle (This should emit events that manage shipment, inventory and notification).
- [ ] Add error handling and logging.
- [ ] Add unit integration tests for application robustness.

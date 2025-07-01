# Multi-Channel Order Management System多渠道訂單管理系統

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
├── infrastructure/
└── main.ts
```

## Quick Start

This section provides a quick start guide for developers to set up the project locally or in a Docker.

### 1. Clone the Repository

```bash
git clone https://github.com/JIMMYOOOPS/order_management.git
cd order_management
```

### 2. Init Docker Environment

```bash
docker-compose up --build
```

- PostgreSQL runs on by default [http://localhost:5432](http://localhost:5432)

### 3. Local Development

1. The projects uses pnpm for package management, please install pnpm first:

```bash
pnpm install -g pnpm
```

2. Init the project

```bash
pnpm install
```

3. Start the development server

```bash
pnpm run start:dev
```

## Environment Variables

Please refer to `.env.example` or docker-compose.yml setups：

## API Docs

Enter [http://localhost:3000/api](http://localhost:3000/api) to review the API documentation.

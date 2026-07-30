# Task Manager Backend API

NestJS backend for the Task Manager application.

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma (to be configured in Phase 2.2)
- **Validation**: class-validator, class-transformer

## Project Structure

```
backend/
├── src/
│   ├── tasks/              # Tasks module
│   │   ├── dto/            # Data Transfer Objects
│   │   ├── entities/       # Entity definitions
│   │   ├── tasks.controller.ts
│   │   ├── tasks.service.ts
│   │   └── tasks.module.ts
│   ├── filters/            # Global exception filters
│   ├── app.module.ts       # Root module
│   └── main.ts             # Application entry point
├── prisma/                 # Prisma schema and migrations (Phase 2.2)
└── test/                   # E2E tests
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL credentials
   - Default port is `3001`

3. Set up database (Phase 2.2):
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

## Running the Application

```bash
# Development mode with watch
npm run start:dev

# Development mode
npm run start

# Production mode
npm run start:prod
```

The API will be available at: `http://localhost:3001`

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/taskmanager"
PORT=3001
NODE_ENV=development
```

## Features

### Configured
- ✅ NestJS base project setup
- ✅ TypeScript configuration
- ✅ Environment variables with @nestjs/config
- ✅ CORS enabled for frontend
- ✅ Validation packages installed (class-validator, class-transformer)
- ✅ Prisma packages installed
- ✅ Folder structure for tasks module

### In Progress
- 🔄 Database setup with Prisma (Phase 2.2)
- 🔄 Task CRUD endpoints (Phase 2.3-2.7)
- 🔄 Global exception filter (Phase 2.9)

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Code Quality

```bash
# Linting
npm run lint

# Formatting
npm run format
```

## Development Phases

- ✅ **Phase 2.1**: NestJS Project Setup (COMPLETED)
- ⏳ **Phase 2.2**: Database Setup with Prisma
- ⏳ **Phase 2.3**: Create Task Endpoint
- ⏳ **Phase 2.4**: List All Tasks Endpoint
- ⏳ **Phase 2.5**: Get Single Task Endpoint
- ⏳ **Phase 2.6**: Update Task Endpoint
- ⏳ **Phase 2.7**: Delete Task Endpoint
- ⏳ **Phase 2.8**: Toggle Task Completion Endpoint
- ⏳ **Phase 2.9**: Global Error Handling
- ⏳ **Phase 2.10**: Backend Documentation & Testing

## API Endpoints (To be implemented)

```
GET    /tasks              - List all tasks (with optional status filter)
GET    /tasks/:id          - Get single task by ID
POST   /tasks              - Create a new task
PATCH  /tasks/:id          - Update a task
DELETE /tasks/:id          - Delete a task
PATCH  /tasks/:id/toggle-complete - Toggle task completion status
```

## Next Steps

Follow Phase 2.2 in DEVELOPMENT_PLAN.md to set up the database with Prisma.

## License

This project is for assessment purposes.

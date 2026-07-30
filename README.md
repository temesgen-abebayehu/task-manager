# Task Manager

A full-stack task management application built with Next.js and NestJS.

## Tech Stack

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: class-validator, class-transformer

### Frontend
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS

## Project Structure

```
task-manager/
├── backend/          # NestJS API
│   ├── src/
│   │   ├── tasks/    # Tasks module
│   │   ├── prisma/   # Prisma service
│   │   └── filters/  # Global exception filters
│   └── prisma/       # Database schema
├── frontend/         # Next.js application
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your PostgreSQL credentials

4. Set up database:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run start:dev
   ```

   Backend will run at: `http://localhost:3001`

See `backend/SETUP.md` for detailed API documentation.

### Frontend Setup

Coming soon...

## Features

- ✅ Create tasks with title, description, status, and due date (POST /tasks)
- ⏳ View all tasks with filtering by status (GET /tasks)
- ⏳ View single task details (GET /tasks/:id)
- ⏳ Update task information (PATCH /tasks/:id)
- ⏳ Delete tasks (DELETE /tasks/:id)
- ⏳ Toggle task completion status (PATCH /tasks/:id/toggle-complete)
- ✅ Request validation with DTOs
- ✅ Global validation pipe configured
- ⏳ Global error handling
- ✅ CORS enabled for frontend

## API Endpoints

- ✅ `POST /tasks` - Create new task (IMPLEMENTED)
- ⏳ `GET /tasks` - List all tasks (optional: `?status=TO_DO`)
- ⏳ `GET /tasks/:id` - Get single task
- ⏳ `PATCH /tasks/:id` - Update task
- ⏳ `DELETE /tasks/:id` - Delete task
- ⏳ `PATCH /tasks/:id/toggle-complete` - Toggle completion

## Development Status

- ✅ Phase 1: Project Setup
- ✅ Phase 2.1: NestJS Project Setup
- ✅ Phase 2.2: Database Setup with Prisma
- ✅ Phase 2.3: Create Task Endpoint
- 🔄 Phase 2.4-2.10: Remaining Backend Endpoints
- ⏳ Phase 3: Frontend Development (Next.js)
- ⏳ Phase 4: Integration & Testing
- ⏳ Phase 5: Deployment

## License

This project is for assessment purposes.
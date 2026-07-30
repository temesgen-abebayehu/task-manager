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

- ✅ Create tasks with title, description, status, and due date
- ✅ View all tasks with filtering by status
- ✅ View single task details
- ✅ Update task information
- ✅ Delete tasks
- ✅ Toggle task completion status
- ✅ Request validation with DTOs
- ✅ Global error handling
- ✅ CORS enabled for frontend

## API Endpoints

- `GET /tasks` - List all tasks (optional: `?status=TO_DO`)
- `GET /tasks/:id` - Get single task
- `POST /tasks` - Create new task
- `PATCH /tasks/:id` - Update task
- `DELETE /tasks/:id` - Delete task
- `PATCH /tasks/:id/toggle-complete` - Toggle completion

## Development Status

- ✅ Phase 1: Project Setup
- ✅ Phase 2: Backend Development (NestJS)
- 🔄 Phase 3: Frontend Development (Next.js) - Coming next
- ⏳ Phase 4: Integration & Testing
- ⏳ Phase 5: Deployment

## License

This project is for assessment purposes.
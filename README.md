# Task Manager

A modern, full-stack task management application built with Next.js and NestJS.

## Features

- Create, read, update, and delete tasks
- Track tasks through TO_DO, IN_PROGRESS, and DONE states
- Filter tasks by status
- Set and track due dates
- Responsive design for desktop and mobile
- Real-time UI updates

## Tech Stack

### Backend
- NestJS with TypeScript
- PostgreSQL database
- Prisma ORM
- class-validator for validation

### Frontend
- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

**1. Clone the repository**

```bash
git clone <repository-url>
cd task-manager
```

**2. Backend Setup**

```bash
cd backend
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your DATABASE_URL

# Run database migrations
npx prisma generate
npx prisma migrate dev

# Start backend server
npm run start:dev
```

Backend runs at: `http://localhost:3001`

**3. Frontend Setup**

```bash
cd frontend
npm install

# Start frontend server
npm run dev
```

Frontend runs at: `http://localhost:3000`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Create a new task |
| GET | `/tasks` | List all tasks (optional status filter) |
| GET | `/tasks/:id` | Get a single task |
| PATCH | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |
| PATCH | `/tasks/:id/toggle-complete` | Toggle task completion |

## Environment Variables

**Backend (.env)**
```env
DATABASE_URL="postgresql://user:password@host:5432/taskmanager"
PORT=3001
```

**Frontend (.env.local)** - Optional
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Project Structure

```
task-manager/
├── backend/              # NestJS API
│   ├── src/
│   │   ├── tasks/       # Task endpoints & business logic
│   │   ├── prisma/      # Database service
│   │   └── filters/     # Error handling
│   └── prisma/          # Database schema
│
└── frontend/            # Next.js application
    ├── app/            # Pages (App Router)
    ├── components/     # Reusable components
    └── lib/            # API client & types
```

## License

This project is for assessment purposes.
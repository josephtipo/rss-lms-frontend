# RSS Server Dashboard

A full-stack RSS Server and RSS Client application developed for Assessment 2 of the Cloud-Based Web Application subject at La Trobe University.

The project extends the Assessment 1 frontend by adding a backend API, Prisma ORM, SQLite database, operational monitoring endpoints, and Docker-based deployment.

---

## Project Overview

The RSS Server Dashboard is built using Next.js, React, TypeScript, Tailwind CSS, Prisma, SQLite, and Docker.

The application provides:

- A responsive RSS Client interface
- Database-driven RSS feed content
- CRUD API endpoints
- Author and feed relationships
- Health monitoring
- API request counting
- Docker-based deployment
- Persistent SQLite storage through a Docker volume

The frontend retrieves feed data from the backend API and displays it using reusable React components.

---

## Architecture

```text
Browser
   |
   | HTTP requests
   v
Next.js React Frontend
   |
   | fetch()
   v
Next.js API Route Handlers
   |
   | Prisma ORM
   v
SQLite Database
```

Docker packages the application, backend API, Prisma client, and runtime dependencies into a reproducible container.

---

## Main Features

### RSS Client

- Retrieves feed records from `GET /api/feeds`
- Displays feed title, description, category, author, date, and link
- Displays loading, empty, and error states
- Shows live server health
- Shows API request count
- Supports responsive light and dark themes

### Database

The application uses Prisma ORM with SQLite.

The database contains two related models:

- `Author`
- `Feed`

One author can publish multiple feeds, while every feed belongs to one author.

The schema includes:

- Feed title
- Description
- Blog content
- Link
- Image URL
- Category
- Publication date
- Author
- Creation and update timestamps

### CRUD API

The application implements full Create, Read, Update, and Delete functionality.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/feeds` | Retrieve all feeds |
| POST | `/api/feeds` | Create a feed |
| GET | `/api/feeds/[id]` | Retrieve one feed |
| PUT | `/api/feeds/[id]` | Update a feed |
| DELETE | `/api/feeds/[id]` | Delete a feed |

### Operational Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check application and database health |
| GET | `/api/count` | Return the current API request count |

The request counter is stored in application memory and resets when the Node.js process or Docker container restarts.

### Docker

The Docker configuration:

- Uses Node.js 24
- Installs dependencies inside Linux
- Generates Prisma Client
- Builds the Next.js application
- Applies Prisma migrations at container startup
- Runs the application on port `3000`
- Stores SQLite data in a persistent Docker volume

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| React 19 | User interface |
| TypeScript | Static typing |
| Tailwind CSS | Responsive styling |
| Prisma ORM | Database schema, migrations, and queries |
| SQLite | Persistent relational database |
| Docker | Reproducible application deployment |
| React Context | Theme management |
| localStorage | Persistent theme preference |
| ESLint | Code quality validation |
| Node.js 24 | JavaScript runtime |

---

## Project Structure

```text
rss-lms-frontend/
├── app/
│   ├── api/
│   │   ├── count/
│   │   │   └── route.ts
│   │   ├── feeds/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── health/
│   │       └── route.ts
│   ├── about/
│   ├── feeds/
│   │   └── page.tsx
│   ├── settings/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── FeedCard.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Navbar.tsx
│   ├── StatCard.tsx
│   └── ThemeProvider.tsx
├── data/
│   └── feeds.ts
├── lib/
│   ├── prisma.ts
│   └── request-counter.ts
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── public/
├── .dockerignore
├── .gitignore
├── Dockerfile
├── next.config.ts
├── package.json
├── prisma.config.ts
└── README.md
```

---

## Local Installation

### 1. Clone the repository

```bash
git clone https://github.com/josephtipo/rss-lms-frontend.git
cd rss-lms-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure the database

Create a `.env` file in the project root:

```env
DATABASE_URL="file:./dev.db"
```

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Apply database migrations

```bash
npx prisma migrate deploy
```

For local development, the following command can also be used:

```bash
npx prisma migrate dev
```

### 6. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Docker Deployment

### Build the Docker image

```bash
docker build -t rss-lms-app .
```

### Run the container with persistent database storage

```bash
docker run -d \
  --name rss-lms-container \
  -p 3000:3000 \
  -v rss-lms-data:/app/data \
  rss-lms-app
```

Open:

```text
http://localhost:3000
```

### View running containers

```bash
docker ps
```

### View application logs

```bash
docker logs rss-lms-container
```

### Open a shell inside the container

```bash
docker exec -it rss-lms-container sh
```

### Stop and remove the container

```bash
docker rm -f rss-lms-container
```

The named volume `rss-lms-data` preserves the SQLite database when the container is removed and recreated.

---

## API Examples

### Retrieve all feeds

```bash
curl http://localhost:3000/api/feeds
```

### Retrieve one feed

```bash
curl http://localhost:3000/api/feeds/1
```

### Create a feed

```bash
curl -X POST http://localhost:3000/api/feeds \
-H "Content-Type: application/json" \
-d '{
  "title": "Cloud Computing Feed",
  "description": "A sample feed created through the API",
  "content": "Sample RSS feed content",
  "link": "https://example.com/cloud-feed",
  "category": "Cloud Computing",
  "author": {
    "name": "Joseph Mondejar",
    "email": "joseph@example.com"
  }
}'
```

### Update a feed

```bash
curl -X PUT http://localhost:3000/api/feeds/1 \
-H "Content-Type: application/json" \
-d '{
  "title": "Updated Cloud Computing Feed",
  "description": "Updated feed description",
  "content": "Updated RSS feed content",
  "link": "https://example.com/updated-cloud-feed",
  "category": "Cloud Computing"
}'
```

### Delete a feed

```bash
curl -X DELETE http://localhost:3000/api/feeds/1
```

### Check application health

```bash
curl http://localhost:3000/api/health
```

### Check API request count

```bash
curl http://localhost:3000/api/count
```

---

## Validation

The following validation has been completed:

- Production build completed successfully
- TypeScript validation completed successfully
- Prisma schema validation completed successfully
- Prisma migration applied successfully
- CRUD endpoints tested successfully
- Health endpoint tested successfully
- Request-count endpoint tested successfully
- Docker image built successfully
- Docker container started successfully
- Database access confirmed inside Docker
- SQLite persistence confirmed after container recreation
- RSS Client confirmed to display database-driven content

Run the production build with:

```bash
npm run build
```

Run ESLint with:

```bash
npm run lint
```

---

## Security and Reliability

The project includes:

- Environment-based database configuration
- No credentials stored in source code
- `.env` files excluded from Git and Docker
- Request validation for required feed fields
- Controlled API error responses
- Correct HTTP status codes
- Prisma migrations for
```
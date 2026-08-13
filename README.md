# RSS Server Dashboard

**CSE5006 Cloud-Based Web Application**  
**Assessment 3: Data-Driven Web Application and Reporting**

**Student:** Joseph Mondejar  
**Student ID:** 22687842  
**University:** La Trobe University

---

## Project Overview

The RSS Server Dashboard is a full-stack web application developed progressively across Assessments 1, 2 and 3 of CSE5006 Cloud-Based Web Application.

The project simulates an RSS Server that stores and provides RSS-style content to an RSS Client and supports the broader LMS project use case.

Assessment 1 established the frontend design and usability layer. Assessment 2 introduced the backend API, database persistence, Prisma ORM and Docker execution. Assessment 3 extends the same project with a data-driven operational dashboard, persistent request telemetry, health monitoring, observability, automated end-to-end testing, load testing and accessibility evaluation.

The Assessment 3 implementation demonstrates that the application can not only process and store data, but can also report on its own operational state and provide evidence that it is functioning correctly.

---

## Key Features

The completed application includes:

- Responsive RSS Client interface
- Database-driven RSS feed content
- Feed and author persistence
- Full CRUD API for RSS feeds
- Prisma ORM with SQLite
- Persistent request telemetry
- Request metrics by feed
- Request metrics by client
- Unique client reporting
- Total request reporting
- Success and error reporting
- Application and database health checks
- Operational dashboard
- Automatic dashboard refresh
- Warning and status indicators
- OpenTelemetry instrumentation
- OpenTelemetry Collector
- Jaeger tracing
- Zipkin tracing
- Prometheus metrics
- Playwright end-to-end testing
- Apache JMeter staged load testing
- Lighthouse accessibility and quality testing
- Docker application deployment
- Docker Compose observability stack
- Persistent SQLite storage using Docker volumes
- Git feature-branch development workflow

---

# Architecture

```text
                          ┌────────────────────────┐
                          │        Browser         │
                          │ RSS Client / Dashboard │
                          └────────────┬───────────┘
                                       │
                                       │ HTTP
                                       ▼
                          ┌────────────────────────┐
                          │        Next.js         │
                          │ Frontend + API Routes  │
                          └────────┬───────┬───────┘
                                   │       │
                        Prisma ORM │       │ OpenTelemetry
                                   │       │
                                   ▼       ▼
                         ┌─────────────┐   ┌──────────────────┐
                         │   SQLite    │   │  OTel Collector  │
                         │             │   └────────┬─────────┘
                         │ Author      │            │
                         │ Feed        │      ┌─────┼──────┐
                         │ RequestLog  │      │     │      │
                         └──────┬──────┘      ▼     ▼      ▼
                                │          Jaeger Zipkin Prometheus
                                │
                                ▼
                          /api/metrics
                                │
                                ▼
                      Operations Dashboard
```

The architecture contains two complementary forms of observability.

### Application-level telemetry

Requests are persisted through Prisma in the `RequestLog` database model. The `/api/metrics` endpoint aggregates this information and provides it to the operational dashboard.

### Technical observability

The Next.js application is instrumented with OpenTelemetry. Telemetry is sent using OTLP to the OpenTelemetry Collector and then exported to Jaeger, Zipkin and Prometheus.

---

# Request and Data Flow

A typical RSS Client request follows this sequence:

```text
Browser / Client
      |
      | HTTP request
      v
Next.js API Route
      |
      +------> Request validation
      |
      +------> Prisma ORM
      |             |
      |             v
      |          SQLite
      |
      +------> Request telemetry
                    |
                    v
                RequestLog
                    |
                    v
               /api/metrics
                    |
                    v
          Operations Dashboard
```

For an individual feed request:

```text
Client
   |
   | GET /api/feeds/1
   v
Next.js API
   |
   +----> Prisma retrieves Feed + Author
   |
   +----> recordRequest()
              |
              v
          RequestLog
              |
              v
          /api/metrics
              |
              v
      Operations Dashboard
```

This allows the application to provide both RSS content and operational information about how that content is being accessed.

---

# Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16.2.10 | Full-stack React web framework |
| React | Component-based frontend |
| TypeScript | Static typing |
| Tailwind CSS | Responsive user interface styling |
| Prisma ORM 7.9.1 | Database schema, migrations and queries |
| SQLite | Local relational database |
| better-sqlite3 | SQLite adapter used by Prisma |
| Node.js 24 | JavaScript runtime |
| Docker | Application containerisation |
| Docker Compose | Local observability environment |
| OpenTelemetry | Application instrumentation |
| OpenTelemetry Collector | Telemetry receiving, processing and exporting |
| Jaeger | Distributed trace visualisation |
| Zipkin | Distributed trace visualisation |
| Prometheus | Metrics collection and querying |
| Playwright | End-to-end application testing |
| Apache JMeter 5.6.3 | Load and performance testing |
| Lighthouse | Accessibility and web quality auditing |
| ESLint | Static code-quality checking |

---

# Assessment Progression

## Assessment 1

Assessment 1 concentrated on frontend design and usability.

Implemented functionality included:

- Responsive React interface
- Navigation bar
- Header and footer
- Home page
- About page
- Feeds page
- Settings page
- Reusable React components
- Hamburger navigation
- Light theme
- Dark theme
- Theme persistence using local storage
- Static demonstration feed information

---

## Assessment 2

Assessment 2 extended the application into a full-stack system.

Implemented functionality included:

- Next.js API Route Handlers
- Prisma ORM
- SQLite database
- Author database model
- Feed database model
- Author-to-feed relationship
- Feed CRUD operations
- Database-driven RSS Client
- Health endpoint
- Request counter
- Docker image
- Docker application execution
- Persistent SQLite Docker volume

---

## Assessment 3

Assessment 3 introduces the data, reporting, observability and testing layer.

Implemented functionality includes:

- Persistent `RequestLog` model
- Persistent request logging
- Operational metrics API
- Data-driven dashboard
- Total request reporting
- RSS feed count reporting
- Unique client reporting
- Requests per feed
- Requests per client
- Successful request count
- Error request count
- Request success rate
- Recent request activity
- Application health monitoring
- Database health monitoring
- Operational warning indicators
- OpenTelemetry instrumentation
- OpenTelemetry Collector
- Jaeger
- Zipkin
- Prometheus
- Playwright automated server tests
- Playwright automated client tests
- Apache JMeter staged load testing
- Lighthouse accessibility testing

---

# Database Design

The application uses Prisma ORM with SQLite.

The main persistent entities are:

```text
Author
Feed
RequestLog
```

## Database Relationships

```text
Author
  |
  | 1
  |
  |------< many
             |
             v
            Feed
             |
             | 1
             |
             |------< many
                        |
                        v
                   RequestLog
```

An `Author` can create multiple `Feed` records.

Each `Feed` belongs to one `Author`.

A `RequestLog` can optionally reference a `Feed`.

---

## Author Model

The Author model stores information about RSS content authors.

Important fields include:

- `id`
- `name`
- `email`
- `createdAt`
- `updatedAt`

The email address is optional and unique when supplied.

---

## Feed Model

The Feed model represents RSS-style content stored by the server.

Important fields include:

- `id`
- `title`
- `description`
- `content`
- `link`
- `imageUrl`
- `category`
- `publishedAt`
- `authorId`
- `createdAt`
- `updatedAt`

The model stores the content and metadata required to present RSS-style information through both the API and RSS Client.

---

## RequestLog Model

Assessment 3 introduces the `RequestLog` model to provide persistent operational telemetry.

Important fields include:

- `id`
- `clientId`
- `endpoint`
- `method`
- `statusCode`
- `feedId`
- `createdAt`

Indexes are defined for:

- `clientId`
- `feedId`
- `createdAt`

These indexes support grouping and querying operational data by client, feed and time.

Unlike the original Assessment 2 request counter, the `RequestLog` model stores telemetry in the database.

---

# Client Identification

Clients can explicitly identify themselves using the HTTP header:

```text
X-Client-ID
```

For example:

```bash
curl \
  -H "X-Client-ID: example-client" \
  http://localhost:3001/api/feeds/1
```

The request logger attempts client identification in this order:

```text
1. X-Client-ID
2. X-Forwarded-For
3. X-Real-IP
4. anonymous-client
```

Explicit client identification was also used during JMeter testing so that simulated clients could be observed individually in the dashboard.

---

# RSS Feed API

The application implements full Create, Read, Update and Delete functionality.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/feeds` | Retrieve all RSS feeds |
| POST | `/api/feeds` | Create an RSS feed |
| GET | `/api/feeds/[id]` | Retrieve one RSS feed |
| PUT | `/api/feeds/[id]` | Update an RSS feed |
| DELETE | `/api/feeds/[id]` | Delete an RSS feed |

API responses use appropriate HTTP status codes including:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
```

---

# Example API Requests

## Retrieve all feeds

```bash
curl http://localhost:3001/api/feeds
```

## Retrieve one feed

```bash
curl http://localhost:3001/api/feeds/1
```

## Create a feed

```bash
curl -X POST http://localhost:3001/api/feeds \
  -H "Content-Type: application/json" \
  -H "X-Client-ID: example-client" \
  -d '{
    "title": "Cloud Computing Feed",
    "description": "A sample feed created through the API",
    "content": "Sample RSS feed content",
    "link": "https://example.com/cloud-feed",
    "category": "Cloud Computing",
    "author": {
      "name": "Example Author",
      "email": "example-author@example.com"
    }
  }'
```

## Retrieve operational metrics

```bash
curl http://localhost:3001/api/metrics
```

## Check application health

```bash
curl http://localhost:3001/health
```

---

# Health Monitoring

Assessment 3 requires a health check that returns HTTP `200 OK` when the application is healthy.

The application provides:

```text
GET /health
GET /api/health
```

The health check verifies database connectivity in addition to confirming that the web application is responding.

Example:

```bash
curl -i http://localhost:3001/health
```

Verified healthy response:

```json
{
  "status": "healthy",
  "database": "connected",
  "service": "rss-lms-frontend"
}
```

The verified `/health` response returned:

```text
HTTP/1.1 200 OK
```

---

# Operational Metrics API

Assessment 3 introduces:

```text
GET /api/metrics
```

The endpoint derives operational information from the database.

Metrics include:

- Total requests
- Total feeds
- Unique clients
- Successful requests
- Error requests
- Request success rate
- Requests per feed
- Requests per client
- Recent request activity

The endpoint intentionally does not record requests to itself because doing so would cause dashboard refreshes to continuously inflate the displayed request total.

---

# Operational Dashboard

The application home page acts as the Assessment 3 operational dashboard.

It retrieves live information from:

```text
/api/metrics
/api/health
```

The dashboard displays summary cards for:

```text
Total Requests
RSS Feeds
Unique Clients
Success Rate
```

Additional dashboard areas display:

- Application health
- Successful requests
- Error requests
- Requests per feed
- Requests per client
- Recent request activity
- Operational warnings

The dashboard refreshes automatically every 10 seconds.

A manual refresh control is also available.

---

# Alerts and Warning Indicators

The dashboard includes status and warning logic to help identify unusual application states.

Examples include:

- Server unavailable
- Database or application health problem
- API request errors
- No RSS feeds available
- Success rate below the expected threshold

These indicators provide visible operational feedback rather than requiring the user to inspect raw API responses.

A dedicated persistent feed-status field is not currently stored. Feed availability is instead represented through feed records, application health, empty-feed handling and request outcomes.

---

# Persistent Request Telemetry

Persistent telemetry is implemented in:

```text
lib/request-logger.ts
```

The logger records:

```text
Client identifier
API endpoint
HTTP method
HTTP status code
Feed identifier where applicable
Timestamp
```

Request logging is performed on feed operations so that activity can be analysed by both client and feed.

The logging operation is protected by error handling so that a telemetry failure does not prevent the primary API response from being processed.

---

# Legacy Assessment 2 Request Counter

Assessment 2 introduced:

```text
/api/count
```

This counter remains in the application for backwards compatibility.

It is stored in application memory and resets when the Node.js process restarts.

Assessment 3 reporting instead uses:

```text
RequestLog
        ↓
/api/metrics
        ↓
Operational Dashboard
```

This provides persistent and significantly more useful telemetry than the original in-memory counter.

---

# OpenTelemetry Instrumentation

Assessment 3 adds OpenTelemetry instrumentation to the Next.js application.

Instrumentation is registered using:

```text
instrumentation.ts
```

The service is registered as:

```text
rss-lms-frontend
```

The application exports telemetry using the OpenTelemetry Protocol.

Local configuration uses:

```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
NEXT_OTEL_VERBOSE=1
```

Environment configuration is excluded from Git where appropriate.

---

# Observability Architecture

```text
Browser / API Client
        |
        v
   Next.js Application
        |
        | OpenTelemetry / OTLP
        v
┌────────────────────────┐
│ OpenTelemetry Collector│
└───────────┬────────────┘
            |
      ┌─────┼─────┐
      |     |     |
      v     v     v
   Jaeger Zipkin Prometheus
```

The OpenTelemetry Collector separates application instrumentation from the monitoring backends.

This provides a vendor-neutral telemetry pipeline and makes the architecture easier to extend later.

---

# OpenTelemetry Collector

The Collector receives OTLP traffic on:

```text
4317 - OTLP gRPC
4318 - OTLP HTTP
```

Additional local endpoints include:

```text
13133 - Collector health
8888  - Collector internal metrics
8889  - Prometheus exporter
```

Collector health can be verified with:

```bash
curl -i http://localhost:13133/
```

The Assessment 3 verification returned:

```text
HTTP/1.1 200 OK
```

---

# Jaeger

Jaeger provides distributed trace visualisation.

Local interface:

```text
http://localhost:16686
```

The application appears using the service name:

```text
rss-lms-frontend
```

Application traffic can be generated and corresponding traces inspected through the Jaeger user interface.

Examples include:

```text
/api/feeds
/api/feeds/1
/api/health
/api/metrics
/health
```

---

# Zipkin

Zipkin provides an additional trace backend for the OpenTelemetry Collector.

Local interface:

```text
http://localhost:9411
```

This demonstrates that the telemetry pipeline can export traces to more than one compatible backend.

---

# Prometheus

Prometheus provides metrics collection and querying.

Local interface:

```text
http://localhost:9090
```

A useful verification query is:

```promql
up
```

A value of:

```text
1
```

indicates that Prometheus successfully scraped a configured target.

The OpenTelemetry Collector also exposes its own telemetry at:

```text
http://localhost:8888/metrics
```

For example:

```bash
curl -s http://localhost:8888/metrics | grep otelcol_ | head
```

The Collector metrics should be distinguished from the business and application metrics stored in the application's `RequestLog` table.

---

# Running the Observability Stack

Start the observability services:

```bash
docker compose up -d
```

Verify container status:

```bash
docker compose ps
```

The stack contains:

```text
otel-collector
jaegertracing
zipkin-all-in-one
prometheus
```

Verify Collector health:

```bash
curl -i http://localhost:13133/
```

Open:

```text
Jaeger:
http://localhost:16686

Zipkin:
http://localhost:9411

Prometheus:
http://localhost:9090
```

Stop the stack when required:

```bash
docker compose down
```

---

# Automated Testing

## Playwright

Playwright is used for end-to-end testing of both the RSS Server and RSS Client.

Run all Playwright tests with:

```bash
npx playwright test
```

The final regression run completed:

```text
2 passed
```

---

## RSS Server CRUD Test

The server test validates the complete RSS feed lifecycle.

```text
POST feed
    |
    v
GET feed
    |
    v
PUT feed
    |
    v
GET updated feed
    |
    v
DELETE feed
    |
    v
GET deleted feed
    |
    v
Expected 404
```

This demonstrates Create, Read, Update and Delete functionality through the API rather than relying on manual testing alone.

---

## RSS Client Test

The client Playwright test verifies frontend/backend integration.

The test:

1. Creates a temporary RSS feed using the API.
2. Opens the `/feeds` page.
3. Waits for the frontend to retrieve data.
4. Verifies that the created feed is displayed.
5. Removes the temporary feed after testing.

This confirms that the browser-facing RSS Client can retrieve and display information generated by the backend.

---

# Performance and Load Testing

## Apache JMeter

Apache JMeter is used to perform staged load testing against the RSS server workflow.

The test plan is stored at:

```text
performance/rss-load-test.jmx
```

The primary test request is:

```text
GET /api/feeds/1
```

Each JMeter thread identifies itself using:

```text
X-Client-ID: jmeter-client-${threadNumber}
```

This allows JMeter traffic to be correlated with persistent telemetry in the Assessment 3 dashboard.

---

# JMeter Staged Testing

Progressive testing was performed using increasing load.

| Test Stage | Workload | Errors |
|---|---:|---:|
| Baseline | 1 request | 0% |
| Small | 10 requests | 0% |
| Medium | 100 requests | 0% |
| High | 1,000 requests | 0% |
| Stress | 10,000 requests | 3.34% |

---

## Baseline Test

The single-request baseline produced:

```text
Samples: 1
Errors: 0
Average: approximately 45 ms
```

This confirmed basic connectivity before increasing workload.

---

## 10-Request Test

The small test produced:

```text
Samples: 10
Errors: 0
Error rate: 0.00%
Average response: approximately 13 ms
```

---

## 100-Request Test

The 100-request stage produced:

```text
Samples: 100
Failed: 0
Error rate: 0%
Average: approximately 9 ms
Minimum: approximately 5 ms
Maximum: approximately 64 ms
Median: approximately 7 ms
90th percentile: approximately 10 ms
95th percentile: approximately 23 ms
99th percentile: approximately 64 ms
Throughput: approximately 10 requests/second
APDEX: 1.000
```

The application remained stable at this load.

---

## 1,000-Request Test

The 1,000-request stage produced:

```text
Samples: 1,000
Failed: 0
Error rate: 0%
Average: approximately 9 ms
Minimum: approximately 4 ms
Maximum: approximately 143 ms
Median: approximately 5 ms
90th percentile: approximately 12 ms
95th percentile: approximately 32 ms
99th percentile: approximately 82 ms
Throughput: approximately 50 requests/second
APDEX: 1.000
```

The local application continued to process requests without errors.

---

## 10,000-Request Stress Test

The highest stage used:

```text
1,000 simulated clients
×
10 requests each
=
10,000 total requests
```

This should not be interpreted as 10,000 simultaneous users.

Results:

```text
Samples: 10,000
Failed: 334
Passed: 96.66%
Error rate: 3.34%

Average response: approximately 1.67 seconds
Median: approximately 356 ms
90th percentile: approximately 5.9 seconds
95th percentile: approximately 15.1 seconds
99th percentile: approximately 15.8 seconds
Maximum: approximately 22.4 seconds

Throughput: approximately 199 requests/second
APDEX: approximately 0.833
```

The failures were connection-level timeout errors rather than application HTTP error responses.

The test therefore identified a saturation point in the local development architecture.

---

# Performance Interpretation

The 1, 10, 100 and 1,000 stages completed without errors.

At the 10,000-request stress stage:

- Latency increased significantly.
- 334 requests failed.
- Error rate increased to 3.34%.
- Throughput reached approximately 199 requests per second.
- Connection-level timeouts were observed.

Potential contributing factors include:

- Next.js running as a single local application process
- SQLite being a local file-based database
- Each monitored request generating a database telemetry write
- JMeter and the application running on the same Mac
- Local CPU, memory, networking and storage limitations

The test therefore demonstrates the behaviour and limitations of the local Assessment 3 environment.

It does **not** represent a validated production capacity measurement.

---

# JMeter Telemetry Verification

Testing identified an important observability defect.

Initially, the individual feed endpoint:

```text
GET /api/feeds/[id]
```

updated only the original Assessment 2 in-memory request counter.

It did not write these requests to the Assessment 3 `RequestLog` model.

This meant the first JMeter load tests successfully exercised the API, but those requests were not represented in `/api/metrics`.

The route was corrected to persist request telemetry.

---

## Controlled Verification

Before testing:

```text
Total requests: 21
Unique clients: 5
```

Three requests were sent using:

```text
X-Client-ID: manual-telemetry-test
```

After testing:

```text
Total requests: 24
Unique clients: 6
```

The dashboard then reported:

```text
manual-telemetry-test: 3 requests
```

Feed 1 also recorded:

```text
3 requests
```

This confirmed that the corrected individual-feed route was persisting telemetry successfully.

---

## Final 10-Client JMeter Verification

A final small JMeter test was then executed.

Result:

```text
Samples: 10
Average: 11 ms
Minimum: 5 ms
Maximum: 31 ms
Errors: 0
Error rate: 0.00%
```

Before JMeter:

```text
Total requests: 24
Unique clients: 6
Feed 1 requests: 3
```

After JMeter:

```text
Total requests: 34
Unique clients: 16
Feed 1 requests: 13
```

The metrics also contained:

```text
jmeter-client-1
jmeter-client-2
jmeter-client-3
jmeter-client-4
jmeter-client-5
jmeter-client-6
jmeter-client-7
jmeter-client-8
jmeter-client-9
jmeter-client-10
```

This verified the complete path:

```text
JMeter
   |
   v
GET /api/feeds/1
   |
   v
Next.js
   |
   v
recordRequest()
   |
   v
Prisma
   |
   v
RequestLog
   |
   v
/api/metrics
   |
   v
Assessment 3 Dashboard
```

This debugging process demonstrates why testing and observability are complementary. Load testing exposed a monitoring gap that was not visible through normal functional testing.

---

# Lighthouse Accessibility and Quality Testing

Chrome Lighthouse was used against the production build.

The final clean Incognito audit produced:

| Lighthouse Category | Score |
|---|---:|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

The first Lighthouse run achieved:

```text
Performance: 90
Accessibility: 100
Best Practices: 100
SEO: 100
```

The initial performance result included a warning that browser extensions were affecting page load performance.

The test was repeated using a clean Chrome Incognito session against the production application.

The resulting audit achieved:

```text
Performance: 100
Accessibility: 100
Best Practices: 100
SEO: 100
```

The accessibility audit did not identify accessibility failures requiring code changes.

The final design therefore retained its existing accessible structure rather than making unnecessary changes merely to produce a difference between audits.

The testing process did result in an improvement to the measurement environment by removing browser-extension interference.

---

# Local Installation

## 1. Clone the repository

```bash
git clone https://github.com/josephtipo/rss-lms-frontend.git
cd rss-lms-frontend
```

---

## 2. Install Node dependencies

```bash
npm install
```

---

## 3. Configure the database

Create:

```text
.env
```

Example configuration:

```env
DATABASE_URL="file:./dev.db"
```

Do not commit sensitive environment configuration to Git.

---

## 4. Generate Prisma Client

```bash
npx prisma generate
```

---

## 5. Apply Database Migrations

For an existing environment:

```bash
npx prisma migrate deploy
```

For development when making schema changes:

```bash
npx prisma migrate dev
```

---

## 6. Configure OpenTelemetry

Create:

```text
.env.local
```

Example local configuration:

```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
NEXT_OTEL_VERBOSE=1
```

---

## 7. Start the Observability Stack

```bash
docker compose up -d
```

Verify:

```bash
docker compose ps
```

---

## 8. Start the Development Server

```bash
npm run dev
```

Default development address:

```text
http://localhost:3000
```

---

# Production Build

Build the optimized Next.js application:

```bash
npm run build
```

Start the production server on port 3001:

```bash
npm start -- -p 3001
```

Assessment 3 final testing used:

```text
http://localhost:3001
```

Port 3001 was used to keep production testing separate from the earlier Docker application configuration using port 3000.

---

# Verified Production Build

The final production build completed successfully using Next.js 16.2.10.

Verified routes included:

```text
/
 /about
 /feeds
 /settings
 /api/count
 /api/feeds
 /api/feeds/[id]
 /api/health
 /api/metrics
 /health
```

The build successfully completed:

```text
Compilation
TypeScript validation
Page-data collection
Static page generation
Page optimisation
```

---

# Docker Application Deployment

Build the Docker image:

```bash
docker build -t rss-lms-app .
```

Run the application with persistent database storage:

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

---

## Docker Database Persistence

The application uses the Docker named volume:

```text
rss-lms-data
```

mounted at:

```text
/app/data
```

The volume separates persistent database data from the container lifecycle.

Removing and recreating the application container therefore does not necessarily remove the database.

---

## Useful Docker Commands

View running containers:

```bash
docker ps
```

View application logs:

```bash
docker logs rss-lms-container
```

Open a shell:

```bash
docker exec -it rss-lms-container sh
```

Remove the application container:

```bash
docker rm -f rss-lms-container
```

Inspect Docker volumes:

```bash
docker volume ls
```

---

# Project Structure

```text
rss-lms-frontend/
│
├── app/
│   ├── api/
│   │   ├── count/
│   │   │   └── route.ts
│   │   ├── feeds/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── health/
│   │   │   └── route.ts
│   │   └── metrics/
│   │       └── route.ts
│   │
│   ├── about/
│   ├── feeds/
│   ├── settings/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│
├── lib/
│   ├── generated/
│   ├── prisma.ts
│   ├── request-counter.ts
│   └── request-logger.ts
│
├── performance/
│   └── rss-load-test.jmx
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── tests/
│   ├── client-feed.spec.ts
│   └── server-feed-crud.spec.ts
│
├── instrumentation.ts
├── playwright.config.ts
├── docker-compose.yml
├── otel-collector-config.yaml
├── prometheus.yaml
├── Dockerfile
├── prisma.config.ts
├── package.json
└── README.md
```

Generated test output and local runtime data are excluded from source control.

Examples include:

```text
node_modules/
.next/
playwright-report/
test-results/
performance/results/
jmeter.log
dev.db
```

---

# Available NPM Scripts

The project defines the following scripts:

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint"
}
```

Examples:

```bash
npm run dev
npm run build
npm start
npm run lint
```

Playwright is run separately using:

```bash
npx playwright test
```

---

# Git and Repository Workflow

GitHub repository:

```text
https://github.com/josephtipo/rss-lms-frontend
```

Assessment work has been developed using feature branches rather than placing all development directly on `main`.

Assessment 3 development branch:

```text
feature/assessment-3
```

Assessment 3 development has included separate commits for major areas such as:

- Request telemetry
- Operational dashboard
- Health endpoint
- Metrics API
- OpenTelemetry observability
- Playwright testing
- JMeter testing
- Telemetry defect correction
- Documentation

This provides an incremental development history and makes changes easier to review and explain.

The final repository should contain:

```text
Clean main branch
Feature branch history
Meaningful commits
Up-to-date README
No node_modules directory
No generated test reports
No committed secrets
```

---

# Testing Strategy

Assessment 3 uses several forms of testing because each type proves something different.

| Test | What it demonstrates |
|---|---|
| Production build | Application compiles and TypeScript is valid |
| API health test | Application and database are available |
| Playwright server test | RSS API CRUD behaviour |
| Playwright client test | Browser-to-backend integration |
| JMeter | Behaviour under increasing traffic |
| Lighthouse | Accessibility and frontend quality |
| OpenTelemetry | Runtime trace visibility |
| Prometheus | Metrics pipeline availability |
| Dashboard telemetry | Operational behaviour and request reporting |

No single test is sufficient to prove the complete application works.

---

# Security Considerations

The application applies several appropriate security practices for the assessment environment.

These include:

- Database access through Prisma ORM
- Required API field validation
- Structured API error responses
- Environment-based configuration
- No hard-coded credentials
- Environment files excluded from Git
- Development database excluded from Git
- Generated test artefacts excluded from Git
- Docker build exclusions
- Database relationship constraints
- Controlled handling of deleted feed telemetry

The application does not currently implement authentication and authorisation because this is outside the primary scope of Assessment 3.

A production implementation would additionally require:

- Authentication
- Authorisation
- HTTPS
- Rate limiting
- Secure secrets management
- Monitoring endpoint access controls
- Network segmentation
- Database access restrictions
- Security headers
- Centralised auditing
- Dependency vulnerability scanning

---

# Scalability Analysis

The current application is intentionally appropriate for a local university assessment.

SQLite provides lightweight relational persistence without requiring a separate database server.

The JMeter stress testing demonstrates why this architecture would need to evolve for higher-scale production workloads.

A larger implementation could use:

```text
                       Internet
                          |
                          v
                    CDN / WAF
                          |
                          v
                    Load Balancer
                    /     |      \
                   /      |       \
                  v       v        v
             Next.js   Next.js   Next.js
              App 1     App 2     App 3
                  \       |       /
                   \      |      /
                    v     v     v
                  Managed Database
                         |
                         v
                  Connection Pool
```

Potential production improvements include:

- Managed PostgreSQL or another production database
- Database connection pooling
- Multiple stateless application instances
- Horizontal scaling
- Load balancing
- Caching
- CDN
- Rate limiting
- Asynchronous telemetry processing
- Telemetry batching
- Managed OpenTelemetry services
- Centralised logging
- Automated CI/CD
- Managed secrets
- Backup and recovery
- Multi-zone availability

These improvements are intentionally not added to the Assessment 3 application because they would add unnecessary complexity to the local implementation.

---

# Telemetry Scalability Consideration

The current request logger performs a persistent database operation for monitored requests.

This gives reliable, queryable Assessment 3 telemetry but introduces additional database I/O.

At higher scale, a production architecture could decouple application responses from telemetry persistence.

For example:

```text
API Request
    |
    +------> User response
    |
    +------> Queue / telemetry buffer
                 |
                 v
          Asynchronous worker
                 |
                 v
          Telemetry database
```

This would reduce the request path's dependency on synchronous telemetry writes.

---

# Reliability Considerations

The application includes several reliability mechanisms:

- Health checking
- Database connection verification
- Structured API errors
- Persistent database records
- Persistent Docker storage
- Request telemetry
- Automated regression tests
- Load testing
- Runtime observability
- Dashboard warnings

For a production deployment, additional resilience could include:

- Multi-instance deployment
- Database replication
- Automated backups
- Retry policies
- Circuit breakers
- Load balancing
- Queue-based processing
- Disaster recovery procedures
- Multi-zone deployment

---

# Known Limitations

The Assessment 3 implementation has several deliberate limitations.

### SQLite

SQLite uses a single local database file and is appropriate for the current local project but is not intended to represent a large-scale distributed database architecture.

### Single Application Instance

The application currently runs as one Next.js process during local testing.

### Local Load Testing

JMeter and the Next.js application were executed on the same Mac.

The measured performance therefore includes contention from both the load generator and application running on the same physical computer.

### Persistent Telemetry Overhead

Operational telemetry creates additional database writes.

### Authentication

Authentication and authorisation are not currently implemented.

### Feed Status

A dedicated persistent `Feed.status` field is not currently implemented. Status is instead inferred from health state, available feed records, request results and empty/error conditions.

### Observability Environment

Jaeger, Zipkin, Prometheus and OpenTelemetry are configured as local development services rather than hardened production monitoring infrastructure.

### Cloud Deployment

Assessment 3 is executed locally. Cloud deployment and the final integrated live demonstration are part of the broader project progression rather than being unnecessarily introduced into this stage.

---

# Final Verification Evidence

The following results have been directly verified during Assessment 3 development.

| Verification | Result |
|---|---|
| Git working tree | Clean during validation |
| Next.js production build | PASS |
| TypeScript build validation | PASS |
| `/health` | HTTP 200 |
| Database health | Connected |
| `/api/health` | Healthy |
| `/api/feeds` | Functional |
| `/api/metrics` | Functional |
| Playwright server test | PASS |
| Playwright client test | PASS |
| Full Playwright run | 2 passed |
| JMeter baseline | 0% errors |
| JMeter 10 request | 0% errors |
| JMeter 100 request | 0% errors |
| JMeter 1,000 request | 0% errors |
| JMeter 10,000 stress test | 3.34% errors |
| JMeter telemetry verification | 10/10 successful |
| OpenTelemetry Collector health | HTTP 200 |
| Jaeger | Application tracing verified |
| Zipkin | Running |
| Prometheus | Scraping verified |
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |

Test results are only documented as successful where they were actually executed and observed.

---

# Assessment 3 Requirement Mapping

| Assessment Requirement | Implementation |
|---|---|
| Data-driven dashboard | Operational home dashboard |
| RSS summaries | Feed count and feed request reporting |
| Database persistence | Prisma + SQLite |
| RSS records | Author and Feed models |
| Operational data | RequestLog model |
| Total requests | `/api/metrics` |
| Requests per feed | `/api/metrics` and dashboard |
| Requests per client | `/api/metrics` and dashboard |
| Unique clients | `/api/metrics` and dashboard |
| Health check | `/health` returns HTTP 200 when healthy |
| Alerts/warnings | Dashboard health and unusual-state indicators |
| Server E2E test | Playwright CRUD test |
| Client E2E test | Playwright feed retrieval/display test |
| Load testing | JMeter staged tests |
| x1 load | Completed |
| x10 load | Completed |
| x100 load | Completed |
| x1000 load | Completed |
| x10000/equivalent | 10,000-request stress stage completed |
| Accessibility | Lighthouse |
| Observability | OpenTelemetry Collector |
| Distributed tracing | Jaeger + Zipkin |
| Metrics | Prometheus + application metrics |
| GitHub repository | GitHub feature-branch workflow |
| README | This document |

---

# Video Demonstration Evidence

The Assessment 3 video should demonstrate the actual running implementation rather than relying solely on this README.

The required demonstration should include:

- Student ID
- Face
- Voice
- GitHub repository homepage
- Git commit history
- Running application
- Operational dashboard
- RSS Client
- Database-driven data
- Operational alerts
- Health check
- Request metrics
- Requests per feed
- Requests per client
- Playwright tests
- JMeter results
- Lighthouse results
- OpenTelemetry observability
- Jaeger
- Prometheus
- Explanation of data flow

The required video duration is 3 to 8 minutes.

---

# Submission Preparation

Before submitting:

```text
[ ] Production build succeeds
[ ] Playwright tests pass
[ ] /health returns HTTP 200
[ ] Application dashboard works
[ ] RSS Client works
[ ] Operational metrics work
[ ] Observability evidence captured
[ ] JMeter results captured
[ ] Lighthouse evidence captured
[ ] README updated
[ ] GitHub repository updated
[ ] feature/assessment-3 merged to main
[ ] main branch clean
[ ] node_modules excluded
[ ] generated test reports excluded
[ ] local database excluded where appropriate
[ ] no credentials or secrets committed
[ ] submission ZIP created
[ ] GitHub repository link included
[ ] 3–8 minute video completed
[ ] Student ID, face and voice shown in video
[ ] Minimum five references included
[ ] La Trobe AI acknowledgement completed
```

---

# References

Apache Software Foundation. (n.d.). *Apache JMeter user manual*. https://jmeter.apache.org/usermanual/

Docker, Inc. (n.d.). *Volumes*. Docker documentation. https://docs.docker.com/engine/storage/volumes/

Google. (n.d.). *Lighthouse*. Chrome for Developers. https://developer.chrome.com/docs/lighthouse/

Microsoft. (n.d.). *Playwright documentation*. https://playwright.dev/docs/intro

OpenTelemetry Authors. (n.d.). *OpenTelemetry Collector*. https://opentelemetry.io/docs/collector/

Prisma Data, Inc. (n.d.). *SQLite database connector*. Prisma documentation. https://www.prisma.io/docs/orm/overview/databases/sqlite

Vercel. (n.d.). *Route Handlers*. Next.js documentation. https://nextjs.org/docs/app/getting-started/route-handlers

---

# AI Acknowledgement

Generative AI was used as an authorised development support tool during this assessment.

AI assistance was used for activities including:

- Explaining cloud application concepts
- Implementation guidance
- Code review
- Troubleshooting
- Test planning
- Interpretation of test results
- Architecture discussion
- Documentation assistance
- Review against the assessment requirements and rubric

All generated suggestions were critically reviewed and validated by the student.

Application functionality, Git history, test execution, screenshots, Lighthouse scores, JMeter measurements and observability results documented in this project are based on work actually performed and verified during development.

No test evidence, execution result, screenshot or deployment outcome has intentionally been fabricated.

This README acknowledgement does not replace the separate La Trobe University AI acknowledgement required through the assessment submission process.

---

# Academic Integrity

The project has been developed with permitted use of generative AI under the Assessment 3 Full AI conditions.

The student remains responsible for:

- Understanding the submitted implementation
- Reviewing generated material
- Validating application behaviour
- Explaining architecture decisions
- Explaining source code
- Explaining testing methodology
- Explaining performance results
- Explaining limitations
- Defending technical decisions during the Assessment 4 live presentation

---

# Author

**Joseph Mondejar**  
**Student ID:** 22687842  
**CSE5006 Cloud-Based Web Application**  
**La Trobe University**

GitHub:

```text
https://github.com/josephtipo/rss-lms-frontend
```
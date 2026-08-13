# RSS Server Dashboard

**CSE5006 Cloud-Based Web Application**  
**Assessment 3: Data-Driven Web Application and Reporting**

**Student:** Joseph Mondejar  
**Student ID:** 22687842  
**La Trobe University**

## Overview

The RSS Server Dashboard is a full-stack Next.js application developed progressively across Assessments 1, 2 and 3.

Assessment 1 established the frontend and usability layer. Assessment 2 added the backend API, Prisma ORM, SQLite persistence and Docker execution. Assessment 3 extends the application with operational reporting, persistent request telemetry, feed-status monitoring, observability, automated testing, load testing and accessibility evaluation.

The application demonstrates how an RSS Server can store, process, monitor and present data in a meaningful operational format.

## Key Features

- Responsive RSS Client
- Database-backed RSS feeds
- Author and feed relationships
- Full feed CRUD API
- Persistent request telemetry
- Operational dashboard
- Total request reporting
- Requests per feed
- Requests per client
- Unique client reporting
- Feed-status summaries
- Health monitoring
- Warning and error indicators
- OpenTelemetry instrumentation
- Jaeger and Zipkin tracing
- Prometheus metrics
- Playwright end-to-end testing
- Apache JMeter staged load testing
- Lighthouse accessibility testing
- Docker-based execution

---

## Architecture

```text
                         Browser
                            |
                            | HTTP
                            v
                +-----------------------+
                |       Next.js         |
                | Frontend + API Routes |
                +-----------+-----------+
                            |
                +-----------+-----------+
                |                       |
                | Prisma ORM            | OpenTelemetry
                v                       v
        +---------------+       +------------------+
        |    SQLite     |       | OTel Collector   |
        |---------------|       +--------+---------+
        | Author        |                |
        | Feed          |          +-----+-----+
        | RequestLog    |          |     |     |
        +-------+-------+          v     v     v
                |              Jaeger Zipkin Prometheus
                |
                v
           /api/metrics
                |
                v
      RSS Operations Dashboard
```

The project uses two complementary monitoring approaches.

**Application telemetry** is persisted in SQLite through the `RequestLog` model and reported through `/api/metrics`.

**Technical observability** is provided through OpenTelemetry, the OpenTelemetry Collector, Jaeger, Zipkin and Prometheus.

---

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16.2.10 | Full-stack application framework |
| React | Frontend user interface |
| TypeScript | Static typing |
| Tailwind CSS | Responsive styling |
| Prisma ORM 7.9.1 | Database modelling and access |
| SQLite | Local relational persistence |
| Node.js 24 | JavaScript runtime |
| Docker | Containerisation |
| Docker Compose | Observability stack |
| OpenTelemetry | Application instrumentation |
| Jaeger | Trace visualisation |
| Zipkin | Trace visualisation |
| Prometheus | Metrics collection |
| Playwright | End-to-end testing |
| Apache JMeter 5.6.3 | Load testing |
| Lighthouse | Accessibility and quality auditing |

---

## Assessment Progression

### Assessment 1

Assessment 1 focused on frontend design and usability.

Implemented:

- Responsive React interface
- Home, About, Feeds and Settings pages
- Reusable components
- Responsive navigation
- Light and dark themes
- Theme persistence
- Static sample RSS content

### Assessment 2

Assessment 2 added the application backend.

Implemented:

- Next.js API Route Handlers
- Prisma ORM
- SQLite database
- `Author` and `Feed` models
- Full feed CRUD API
- Database-driven RSS Client
- Health endpoint
- Request counter
- Docker image
- Persistent Docker volume

### Assessment 3

Assessment 3 adds reporting, monitoring and testing.

Implemented:

- `RequestLog` telemetry model
- Persistent request reporting
- Operations dashboard
- Requests per feed
- Requests per client
- Unique client reporting
- Feed-status reporting
- Health and warning indicators
- OpenTelemetry
- Jaeger
- Zipkin
- Prometheus
- Playwright
- JMeter
- Lighthouse

---

## Database Design

The application uses Prisma ORM with SQLite.

### Author

Stores information about RSS authors.

Important fields:

- `id`
- `name`
- `email`
- `createdAt`
- `updatedAt`

One author can have multiple feeds.

### Feed

Stores RSS-style content and metadata.

Important fields:

- `id`
- `title`
- `description`
- `content`
- `link`
- `imageUrl`
- `category`
- `status`
- `publishedAt`
- `authorId`
- `createdAt`
- `updatedAt`

Supported feed states are:

```text
ACTIVE
WARNING
ERROR
```

New feeds default to:

```text
ACTIVE
```

### RequestLog

Stores persistent operational request telemetry.

Important fields:

- `id`
- `clientId`
- `endpoint`
- `method`
- `statusCode`
- `feedId`
- `createdAt`

Indexes are provided for:

- `clientId`
- `feedId`
- `createdAt`

This supports efficient grouping of operational information by client, feed and time.

---

## Data Relationships

```text
Author
  |
  | 1
  |
  +--------< Feed
               |
               | 1
               |
               +--------< RequestLog
```

A `Feed` belongs to one `Author`.

A `RequestLog` can optionally reference a `Feed`.

When a feed is deleted, historical request records are retained and their feed relationship can be set to null.

---

## Feed API

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/feeds` | Retrieve all feeds |
| POST | `/api/feeds` | Create a feed |
| GET | `/api/feeds/[id]` | Retrieve one feed |
| PUT | `/api/feeds/[id]` | Update a feed |
| DELETE | `/api/feeds/[id]` | Delete a feed |

The API uses HTTP status codes including:

- `200 OK`
- `201 Created`
- `400 Bad Request`
- `404 Not Found`
- `500 Internal Server Error`

---

## Feed Status

Feed status is stored persistently in the database.

The PUT endpoint accepts:

```text
ACTIVE
WARNING
ERROR
```

For example, a feed can be placed into a warning state through:

```bash
curl -X PUT http://localhost:3001/api/feeds/1 \
  -H "Content-Type: application/json" \
  -H "X-Client-ID: status-demo" \
  -d '{
    "title": "Updated Cloud Computing News",
    "description": "Updated cloud technology news from the RSS server",
    "content": "This feed was updated through the PUT API endpoint.",
    "link": "https://example.com/updated-cloud-news",
    "category": "Cloud Computing",
    "status": "WARNING"
  }'
```

The resulting data flow is:

```text
PUT API
   |
   v
Prisma
   |
   v
SQLite
   |
   v
Feed.status = WARNING
   |
   v
/api/metrics
   |
   v
Operations Dashboard
```

The dashboard then displays the warning state and generates an operational alert.

---

## Health Monitoring

The application provides:

```text
GET /health
GET /api/health
```

The `/health` endpoint checks application and database availability.

Verified healthy response:

```json
{
  "status": "healthy",
  "database": "connected",
  "service": "rss-lms-frontend"
}
```

A healthy system returns:

```text
HTTP 200 OK
```

---

## Operational Metrics

Assessment 3 introduces:

```text
GET /api/metrics
```

The endpoint provides:

- Total requests
- Total RSS feeds
- Unique clients
- Successful requests
- Failed requests
- Success rate
- Requests per feed
- Requests per client
- Recent request activity
- Feed-status summaries

Example feed-status summary:

```json
{
  "active": 1,
  "warning": 0,
  "error": 0,
  "unknown": 0
}
```

The metrics endpoint does not log requests to itself because that would cause dashboard refresh activity to continuously inflate the reported request count.

---

## Operational Dashboard

The home page acts as the Assessment 3 operations dashboard.

It displays:

- Total Requests
- RSS Feeds
- Unique Clients
- Success Rate
- System Health
- Feed Status
- Requests per Feed
- Requests per Client
- Recent Request Activity

The dashboard refreshes automatically every 10 seconds and also includes a manual Refresh control.

---

## Alerts

The dashboard generates visible warnings for operational conditions including:

- Server health failure
- No feeds stored
- Failed API requests
- Success rate below 95%
- Feeds in `WARNING`
- Feeds in `ERROR`
- Unrecognised feed states

Example:

```text
1 RSS feed is in a warning state.
```

This warning is driven by persistent database data rather than a hard-coded interface value.

---

## Client Identification

A client can provide:

```text
X-Client-ID
```

Example:

```bash
curl \
  -H "X-Client-ID: example-client" \
  http://localhost:3001/api/feeds/1
```

The request logger attempts client identification in this order:

1. `X-Client-ID`
2. `X-Forwarded-For`
3. `X-Real-IP`
4. `anonymous-client`

JMeter uses this mechanism to generate identifiable simulated clients.

---

## Persistent Request Telemetry

Request logging is implemented through:

```text
lib/request-logger.ts
```

A typical request follows:

```text
Client
   |
   v
GET /api/feeds/1
   |
   v
Next.js Route Handler
   |
   +------> Prisma retrieves Feed
   |
   +------> recordRequest()
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

The Assessment 2 `/api/count` endpoint remains available for backwards compatibility, but Assessment 3 reporting uses persistent `RequestLog` records.

---

## OpenTelemetry

The application is instrumented through:

```text
instrumentation.ts
```

Service name:

```text
rss-lms-frontend
```

Local OTLP configuration:

```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
NEXT_OTEL_VERBOSE=1
```

---

## Observability Stack

```text
Next.js
   |
   | OTLP
   v
OpenTelemetry Collector
   |
   +------> Jaeger
   |
   +------> Zipkin
   |
   +------> Prometheus
```

### OpenTelemetry Collector

Important ports:

| Port | Purpose |
|---|---|
| 4317 | OTLP gRPC |
| 4318 | OTLP HTTP |
| 8888 | Collector metrics |
| 8889 | Prometheus exporter |
| 13133 | Collector health |

Health check:

```bash
curl -i http://localhost:13133/
```

The Collector health endpoint was verified returning HTTP 200.

### Jaeger

```text
http://localhost:16686
```

Application service:

```text
rss-lms-frontend
```

Jaeger was used to inspect application traces.

### Zipkin

```text
http://localhost:9411
```

Zipkin provides an additional tracing backend.

### Prometheus

```text
http://localhost:9090
```

A useful verification query is:

```promql
up
```

A value of `1` indicates a successfully scraped target.

---

## Running the Observability Stack

Start:

```bash
docker compose up -d
```

Verify:

```bash
docker compose ps
```

Stop:

```bash
docker compose down
```

---

## Playwright Testing

Playwright provides automated end-to-end testing.

Run:

```bash
npx playwright test
```

The final regression execution completed:

```text
2 passed
```

### Server Test

The server test verifies the complete feed lifecycle:

```text
POST
  |
  v
GET
  |
  v
PUT
  |
  v
GET
  |
  v
DELETE
  |
  v
GET -> expected 404
```

This verifies feed CRUD behaviour.

### Client Test

The client test:

1. Creates temporary feed data.
2. Opens `/feeds`.
3. Retrieves the feed through the frontend.
4. Confirms the feed is displayed.
5. Deletes the temporary test feed.

This tests the complete browser-to-backend data path.

---

## JMeter Load Testing

The JMeter test plan is:

```text
performance/rss-load-test.jmx
```

The primary request tested is:

```text
GET /api/feeds/1
```

Each simulated client uses:

```text
X-Client-ID: jmeter-client-${threadNumber}
```

### Staged Results

| Stage | Requests | Error Rate |
|---|---:|---:|
| Baseline | 1 | 0% |
| Small | 10 | 0% |
| Medium | 100 | 0% |
| High | 1,000 | 0% |
| Stress | 10,000 | 3.34% |

### 100 Requests

Observed:

- 100 samples
- 0 failures
- Average response approximately 9 ms
- Maximum approximately 64 ms
- Throughput approximately 10 requests/second

### 1,000 Requests

Observed:

- 1,000 samples
- 0 failures
- Average response approximately 9 ms
- Maximum approximately 143 ms
- Throughput approximately 50 requests/second

### 10,000-Request Stress Stage

The stress test used:

```text
1,000 simulated clients
x
10 requests
=
10,000 requests
```

This does not represent 10,000 simultaneous users.

Observed:

- 10,000 samples
- 334 failures
- 3.34% error rate
- Average response approximately 1.67 seconds
- Median approximately 356 ms
- 90th percentile approximately 5.9 seconds
- Maximum approximately 22.4 seconds
- Throughput approximately 199 requests/second
- APDEX approximately 0.833

The failures were connection-level timeouts.

These results identify a saturation point in the local test architecture.

They should not be interpreted as production capacity because both JMeter and the application were running on the same development computer.

---

## JMeter Telemetry Verification

Testing exposed a gap in the original request telemetry implementation.

Initially:

```text
GET /api/feeds/[id]
```

updated only the legacy in-memory counter and did not persist its traffic in `RequestLog`.

The route was corrected and re-tested.

A controlled three-request test changed:

```text
Total requests: 21 -> 24
Unique clients: 5 -> 6
```

and produced:

```text
manual-telemetry-test: 3 requests
```

A subsequent 10-client JMeter test produced:

```text
10 samples
0 errors
```

The persistent metrics changed:

```text
Total requests: 24 -> 34
Unique clients: 6 -> 16
Feed 1 requests: 3 -> 13
```

and reported:

```text
jmeter-client-1
jmeter-client-2
...
jmeter-client-10
```

This verified:

```text
JMeter
   |
   v
Next.js API
   |
   v
RequestLog
   |
   v
SQLite
   |
   v
/api/metrics
   |
   v
Dashboard
```

---

## Lighthouse

Chrome Lighthouse was used against the production build.

Final clean Incognito results:

| Category | Score |
|---|---:|
| Performance | 100 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

An earlier run achieved Performance 90 while the other categories scored 100.

Chrome reported that browser extensions could affect performance, so the test was repeated in a clean Incognito environment.

The clean production audit achieved 100 in all four categories.

No accessibility code changes were required because Lighthouse did not identify accessibility failures.

---

## Local Setup

### Clone

```bash
git clone https://github.com/josephtipo/rss-lms-frontend.git
cd rss-lms-frontend
```

### Install dependencies

```bash
npm install
```

### Configure database

Create `.env`:

```env
DATABASE_URL="file:./dev.db"
```

### Generate Prisma Client

```bash
npx prisma generate
```

### Apply migrations

```bash
npx prisma migrate deploy
```

### Configure OpenTelemetry

Create `.env.local`:

```env
OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
NEXT_OTEL_VERBOSE=1
```

### Development server

```bash
npm run dev
```

Default:

```text
http://localhost:3000
```

---

## Production Build

Build:

```bash
npm run build
```

Start on the Assessment 3 test port:

```bash
npm start -- -p 3001
```

Open:

```text
http://localhost:3001
```

The final production build completed successfully with TypeScript validation and page generation.

---

## Docker

Build:

```bash
docker build -t rss-lms-app .
```

Run:

```bash
docker run -d \
  --name rss-lms-container \
  -p 3000:3000 \
  -v rss-lms-data:/app/data \
  rss-lms-app
```

The named volume:

```text
rss-lms-data
```

persists SQLite database data independently of the application container.

---

## Project Structure

```text
rss-lms-frontend/
├── app/
│   ├── api/
│   │   ├── count/
│   │   ├── feeds/
│   │   │   ├── [id]/
│   │   │   └── route.ts
│   │   ├── health/
│   │   └── metrics/
│   ├── about/
│   ├── feeds/
│   ├── settings/
│   ├── layout.tsx
│   └── page.tsx
├── components/
├── lib/
│   ├── generated/
│   ├── prisma.ts
│   ├── request-counter.ts
│   └── request-logger.ts
├── performance/
│   └── rss-load-test.jmx
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── tests/
│   ├── client-feed.spec.ts
│   └── server-feed-crud.spec.ts
├── instrumentation.ts
├── playwright.config.ts
├── docker-compose.yml
├── otel-collector-config.yaml
├── prometheus.yaml
├── Dockerfile
├── package.json
└── README.md
```

Generated output and local runtime data are excluded from Git, including:

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

## Security Considerations

Security measures appropriate to the assessment include:

- Prisma ORM for database access
- Required API field validation
- Validated feed status values
- Structured API error responses
- Environment-based configuration
- No hard-coded credentials
- Local database excluded from Git
- Test artefacts excluded from Git
- Docker build exclusions

A production application would additionally require:

- Authentication
- Authorisation
- HTTPS
- Rate limiting
- Secrets management
- Monitoring endpoint restrictions
- Security headers
- Centralised auditing
- Dependency vulnerability scanning

---

## Scalability

The current architecture is designed for a local university assessment.

The JMeter stress test demonstrates that higher-scale deployment would require architectural changes.

A possible production architecture is:

```text
Users
  |
  v
CDN / WAF
  |
  v
Load Balancer
  |
  +--------+--------+
  |        |        |
  v        v        v
Next.js  Next.js  Next.js
  |        |        |
  +--------+--------+
           |
           v
     Managed Database
```

Potential improvements include:

- Managed PostgreSQL
- Connection pooling
- Horizontal application scaling
- Load balancing
- Caching
- Rate limiting
- Asynchronous telemetry processing
- Managed observability
- Automated CI/CD
- Backup and recovery
- Multi-zone deployment

SQLite remains appropriate for the current local project because it keeps the implementation simple while still demonstrating relational persistence and ORM concepts.

---

## Known Limitations

- SQLite uses a local database file.
- The application runs as a single Next.js process.
- Telemetry generates additional database writes.
- Authentication is not implemented.
- Monitoring services are configured for local use.
- JMeter and the application shared the same test computer.
- Stress-test figures therefore represent the local test environment, not validated production capacity.

---

## Verified Assessment 3 Evidence

| Verification | Result |
|---|---|
| Production build | PASS |
| `/health` | HTTP 200 |
| Database connectivity | Connected |
| Feed CRUD API | Functional |
| `/api/metrics` | Functional |
| Feed status persistence | Functional |
| Feed warning alert | Functional |
| Playwright server test | PASS |
| Playwright client test | PASS |
| Final Playwright run | 2 passed |
| JMeter 10-client telemetry test | 0% errors |
| OTel Collector health | HTTP 200 |
| Jaeger application tracing | Verified |
| Prometheus scraping | Verified |
| Lighthouse Performance | 100 |
| Lighthouse Accessibility | 100 |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |

---

## Git Workflow

GitHub repository:

```text
https://github.com/josephtipo/rss-lms-frontend
```

Assessment 3 development branch:

```text
feature/assessment-3
```

Development has been separated into meaningful commits covering:

- Persistent telemetry
- Dashboard and health monitoring
- Metrics API
- OpenTelemetry
- Playwright
- JMeter
- Telemetry bug fix
- Feed-status monitoring
- Documentation

This provides a clear implementation history rather than placing all development into one commit.

---

## Submission Checklist

Before submission:

- [ ] Final build passes
- [ ] Playwright tests pass
- [ ] `/health` returns HTTP 200
- [ ] Feed status returned to `ACTIVE`
- [ ] Dashboard reviewed
- [ ] Warning demonstration evidence captured
- [ ] Jaeger evidence captured
- [ ] Prometheus evidence captured
- [ ] JMeter evidence captured
- [ ] Lighthouse evidence captured
- [ ] README committed
- [ ] `feature/assessment-3` merged into `main`
- [ ] `main` pushed to GitHub
- [ ] Final Git tag created
- [ ] `node_modules` excluded from submission
- [ ] Generated reports excluded
- [ ] Secrets excluded
- [ ] Project ZIP created
- [ ] GitHub repository link included
- [ ] 3–8 minute video recorded
- [ ] Student ID shown in video
- [ ] Face and voice included
- [ ] GitHub homepage and commits shown
- [ ] AI acknowledgement completed
- [ ] Similarity score checked after submission

---

## References

Apache Software Foundation. (n.d.). *Apache JMeter user manual*. https://jmeter.apache.org/usermanual/

Docker, Inc. (n.d.). *Volumes*. Docker documentation. https://docs.docker.com/engine/storage/volumes/

Google. (n.d.). *Lighthouse*. Chrome for Developers. https://developer.chrome.com/docs/lighthouse/

Microsoft. (n.d.). *Playwright documentation*. https://playwright.dev/docs/intro

OpenTelemetry Authors. (n.d.). *OpenTelemetry Collector*. https://opentelemetry.io/docs/collector/

Prisma Data, Inc. (n.d.). *SQLite*. Prisma documentation. https://www.prisma.io/docs/orm/overview/databases/sqlite

Vercel. (n.d.). *Route Handlers*. Next.js documentation. https://nextjs.org/docs/app/getting-started/route-handlers

---

## AI Acknowledgement

Generative AI was used as an authorised development-support tool during this assessment.

AI assistance was used for activities including:

- Technical concept explanation
- Implementation guidance
- Troubleshooting
- Code review
- Testing strategy
- Interpretation of test results
- Architecture discussion
- Documentation assistance
- Review against the assessment brief and rubric

All generated suggestions were reviewed and validated by the student.

Application functionality, Git history, test executions, screenshots, Lighthouse scores, JMeter measurements and observability results documented for this project are based on actual work performed during development.

The separate La Trobe University AI acknowledgement required through Moodle must also be completed.

---

## Author

**Joseph Mondejar**  
**Student ID: 22687842**  
**CSE5006 Cloud-Based Web Application**  
**La Trobe University**
# RSS Server Dashboard

A modern frontend dashboard built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS** for **Assessment 1** of the **Cloud-Based Web Application** subject.

---

## Project Overview

The RSS Server Dashboard is a responsive web application that demonstrates modern frontend development principles using the Next.js App Router architecture.

The project provides a clean dashboard interface for viewing RSS feed information through reusable React components. This assessment focuses on frontend development only; backend services, APIs, and database integration will be implemented in later assessments.

---

## Project Objectives

The objectives of this project are to:

- Develop a responsive web application using Next.js.
- Demonstrate reusable React component design.
- Implement page routing using the App Router.
- Build a professional dashboard interface using Tailwind CSS.
- Apply TypeScript for improved code quality and maintainability.
- Prepare the application for future backend integration.

---

## Features

### Dashboard

- Dashboard overview
- Statistics cards
- RSS feed preview cards
- Responsive layout

### About

- Project overview
- Technology stack
- Implemented features
- Future enhancements

### RSS Feeds

- RSS feed listing
- Dashboard summary cards
- Reusable FeedCard components

### Settings

- Dashboard configuration
- Application information
- Planned enhancements

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React Framework |
| React | User Interface |
| TypeScript | Type Safety |
| Tailwind CSS | Styling |
| ESLint | Code Quality |
| Node.js | Runtime Environment |

---

## Project Structure

```text
rss-lms-frontend/
│
├── app/
│   ├── about/
│   ├── feeds/
│   ├── settings/
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── FeedCard.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Navbar.tsx
│   └── StatCard.tsx
│
├── data/
│   └── feeds.ts
│
├── public/
├── package.json
└── README.md
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:

```
http://localhost:3000
```

---

## Validation

The project has been successfully validated using:

```bash
npm run build
```

and

```bash
npm run lint
```

Both commands complete successfully with no build or linting errors.

---

## Assessment Scope

Assessment 1 includes:

- Frontend user interface
- Responsive design
- React component architecture
- Navigation
- Static RSS data
- Tailwind CSS styling

The following will be implemented in future assessments:

- REST API integration
- Live RSS feeds
- Database connectivity
- User authentication
- Cloud deployment

---

## Future Enhancements

- Live RSS feed retrieval
- Search and filtering
- Dark mode
- User authentication
- Cloud database integration
- Personalised dashboard settings
- API-driven content

---

## Author

**Joseph Mondejar**

Student Number: **22687842**

Master of Artificial Intelligence

Cloud-Based Web Application

Assessment 1
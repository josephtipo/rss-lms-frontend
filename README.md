# RSS Server Dashboard

A modern frontend dashboard built with **Next.js**, **React**, **TypeScript**, and **Tailwind CSS** for **Assessment 1** of the **Cloud-Based Web Application** subject at **La Trobe University**.

---

## Project Overview

The RSS Server Dashboard is a modern frontend web application developed using the Next.js App Router architecture.

Assessment 1 focuses on frontend design, usability, responsive layouts, reusable React components, and user interaction. The application demonstrates how RSS feed information can be presented through a clean dashboard interface before backend RSS processing is introduced in later assessments.

This assessment implements the complete frontend only. Backend services, RSS feed processing, APIs, authentication, and database integration will be added in Assessment 2.

---

## Project Objectives

The objectives of this project are to:

- Develop a modern frontend using Next.js and React.
- Demonstrate reusable component-based architecture.
- Implement page routing using the Next.js App Router.
- Apply React state management.
- Build a professional dashboard using Tailwind CSS.
- Implement Light and Dark themes with persistent user preferences.
- Demonstrate interactive frontend functionality.
- Prepare the application for future backend RSS integration.

---

# Features

## Dashboard

- Dashboard overview
- Statistics cards
- RSS feed preview cards
- Responsive dashboard layout
- Professional user interface

## About

- Project overview
- Student information
- Technology stack
- Implemented features
- Future enhancements

## RSS Feeds

- RSS feed listing
- Feed summary cards
- Reusable FeedCard component
- Feed category badges
- Read More links

## Settings

- Light/Dark theme switching
- Theme preference saved using localStorage
- Application configuration
- Dashboard information

## Navigation

- Header displaying the assessment title
- Footer displaying the author's name and student number
- Navigation bar
- Interactive hamburger menu with animated dropdown
- React state-based menu interaction
- Consistent navigation across all pages

---

# Technology Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | React Framework |
| React | User Interface |
| TypeScript | Type Safety |
| Tailwind CSS | Styling and Responsive Design |
| React Context | Global Theme Management |
| Local Storage | Persist User Preferences |
| ESLint | Code Quality |
| Node.js | Runtime Environment |

---

# Project Structure

```text
rss-lms-frontend/
│
├── app/
│   ├── about/
│   ├── feeds/
│   ├── settings/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── FeedCard.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── Navbar.tsx
│   ├── StatCard.tsx
│   └── ThemeProvider.tsx
│
├── data/
│   └── feeds.ts
│
├── public/
│
├── package.json
├── package-lock.json
└── README.md
```

---

# Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open your browser:

```
http://localhost:3000
```

---

# Validation

The application has been successfully validated using:

```bash
npm run build
```

and

```bash
npm run lint
```

Both commands complete successfully without any build, TypeScript, or ESLint errors.

---

# Assessment Scope

Assessment 1 implements:

- Frontend user interface
- React component architecture
- Reusable components
- React Context state management
- Navigation bar
- Interactive hamburger menu
- Header and footer
- Home, About, Feeds and Settings pages
- Light and Dark themes
- Theme persistence using localStorage
- Responsive dashboard layout
- Static RSS feed data
- Tailwind CSS styling
- Next.js App Router

Future assessments will extend the application with:

- Live RSS feed integration
- REST API services
- Backend RSS processing
- Database connectivity
- User authentication
- Cloud deployment
- Search and filtering
- Personalised dashboard settings

---

# Assessment Status

Assessment 1 delivers the complete frontend implementation of the RSS Server Dashboard.

The application demonstrates:

- Next.js App Router architecture
- React functional components
- TypeScript
- Tailwind CSS
- React Context for global state management
- Persistent Light/Dark theme using localStorage
- Interactive hamburger menu with animated dropdown navigation
- Reusable dashboard and feed components
- Clean and maintainable component-based architecture
- Professional frontend design suitable for future backend integration

Assessment 2 will extend this project by integrating backend APIs, live RSS feeds, and persistent data storage.

---

# Future Enhancements

The following features are planned for future assessments:

- Live RSS feed retrieval
- REST API integration
- Backend RSS processing
- Database connectivity
- User authentication
- Search and filtering
- RSS subscription management
- Personalised user profiles
- Cloud deployment

---

# Validation Summary

- ✅ Production build successful
- ✅ ESLint validation successful
- ✅ TypeScript validation successful
- ✅ Responsive frontend completed
- ✅ Ready for backend integration

---

# Author

**Joseph Mondejar**

**Student Number:** 22687842

Master of Artificial Intelligence

Cloud-Based Web Application

Assessment 1
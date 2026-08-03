export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="mb-3 text-4xl font-bold text-slate-900 dark:text-white">
          About RSS Dashboard
        </h1>

        <p className="text-lg text-slate-600 dark:text-slate-300">
          This application was developed as Assessment 1 for the
          Cloud-Based Web Application subject. It demonstrates a modern
          frontend built with Next.js, React and Tailwind CSS for an
          RSS Server dashboard.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
          Student Information
        </h2>

        <p className="mb-2 text-slate-700 dark:text-slate-300">
          <strong>Name:</strong> Joseph Mondejar
        </p>

        <p className="text-slate-700 dark:text-slate-300">
          <strong>Student Number:</strong> 22687842
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
          Technology Stack
        </h2>

        <ul className="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
          <li>Next.js (App Router)</li>
          <li>React</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Reusable React Components</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
          Implemented Features
        </h2>

        <ul className="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
          <li>Responsive navigation</li>
          <li>Dashboard statistics cards</li>
          <li>RSS feed cards</li>
          <li>Reusable component architecture</li>
          <li>Responsive layout using Tailwind CSS</li>
          <li>Light/Dark theme with saved preference</li>
        </ul>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-2xl font-semibold text-slate-900 dark:text-white">
          Future Enhancements
        </h2>

        <ul className="list-disc space-y-2 pl-6 text-slate-700 dark:text-slate-300">
          <li>Live RSS feed integration</li>
          <li>Backend API services</li>
          <li>User authentication</li>
          <li>Cloud database integration</li>
        </ul>
      </section>
    </div>
  );
}
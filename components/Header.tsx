export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white shadow-md transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          RSS Server Dashboard
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          Cloud-Based Web Application • Assessment 1
        </p>
      </div>
    </header>
  );
}
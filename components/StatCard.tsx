type StatCardProps = {
  title: string;
  value: string;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
          {title}
        </p>

        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>

      <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
        {value}
      </h2>

      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
        Dashboard summary
      </p>
    </div>
  );
}
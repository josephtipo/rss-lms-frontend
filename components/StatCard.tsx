type StatCardProps = {
  title: string;
  value: string;
};

export default function StatCard({
  title,
  value,
}: StatCardProps) {
 return (
  <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
      {title}
    </p>

    <h2 className="mt-3 text-5xl font-bold text-slate-800">
      {value}
    </h2>
  </div>
);
}
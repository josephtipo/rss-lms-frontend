type FeedCardProps = {
  title: string;
  category: string;
  summary: string;
};

export default function FeedCard({
  title,
  category,
  summary,
}: FeedCardProps) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
          {category}
        </span>
      </div>

      {/* Feed Title */}
      <h3 className="mb-3 text-3xl font-bold text-slate-800">
        {title}
      </h3>

      {/* Feed Summary */}
      <p className="flex-grow text-slate-600 leading-relaxed">
        {summary}
      </p>

      {/* Footer */}
      <div className="mt-6 border-t pt-4">
        <button className="font-semibold text-blue-600 transition hover:text-blue-800">
          Read More →
        </button>
      </div>
    </div>
  );
}
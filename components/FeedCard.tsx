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
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      <p className="mb-2 text-sm font-semibold text-blue-600">
        {category}
      </p>

      <h3 className="mb-3 text-2xl font-bold">
        {title}
      </h3>

      <p className="text-gray-600">
        {summary}
      </p>
    </div>
  );
}
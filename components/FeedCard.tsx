type FeedCardProps = {
  title: string;
  category: string | null;
  summary: string;
  author: string;
  publishedAt: string;
  link: string;
};

export default function FeedCard({
  title,
  category,
  summary,
  author,
  publishedAt,
  link,
}: FeedCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800">
      <div className="mb-4">
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900 dark:text-blue-200">
          {category ?? "Uncategorised"}
        </span>
      </div>

      <h3 className="mb-3 text-3xl font-bold text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">
        Posted by {author} on {formattedDate}
      </p>

      <p className="flex-grow leading-relaxed text-slate-600 dark:text-slate-300">
        {summary}
      </p>

      <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-700">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-600 transition hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Read More →
        </a>
      </div>
    </article>
  );
}
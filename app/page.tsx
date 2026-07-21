import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-7xl p-8">
        <h2 className="mb-4 text-4xl font-bold">
          Welcome
        </h2>

        <p className="text-lg text-gray-600">
          This frontend demonstrates an RSS Server dashboard that
          will integrate with a Learning Management System (LMS) in
          Assessment 2.
        </p>
      </main>
    </>
  );
}

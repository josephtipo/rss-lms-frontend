export default function AboutPage() {
  return (
    <>
      <h1 className="text-4xl font-bold mb-6">About</h1>

      <p className="mb-4">
        <strong>Name:</strong> Joseph Mondejar
      </p>

      <p className="mb-4">
        <strong>Student Number:</strong> 22687842
      </p>

      <p className="mb-6">
        This application is being developed as Assessment 1 for the
        Cloud-Based Web Application subject.
      </p>

      <div className="rounded-lg border p-6 bg-white">
        <p className="font-semibold mb-2">
          Introduction Video
        </p>

        <p className="text-gray-600">
          Video will be embedded here before submission.
        </p>
      </div>
    </>
  );
}
export function HomePage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Home Page</h1>
        <p className="text-gray-700 mb-6">
          This is the home page of our application.
        </p>
        <a
          href="/login"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Go to Login
        </a>
      </div>
    </>
  );
}

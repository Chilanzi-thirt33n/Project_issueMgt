import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-1">
      <h1>
        Welcome to Issue-Logger <em className="text-green-500">V.1.0.0</em>
      </h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <Link href="/dashboard">Dashboard</Link>
      </button>
    </div>
  );
}

import Link from 'next/link';

export default async function Home() {
  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold mb-4">Server Action Examples:</h1>
      <ul className="flex gap-4 flex-wrap">
        <li>
          <Link className="text-blue-500 hover:text-blue-800" href="/supabase">
            Supabase
          </Link>
        </li>
        <li>
          <Link className="text-blue-500 hover:text-blue-800" href="/formPost">
            Form Post
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-500 hover:text-blue-800"
            href="/formPostWithStatus"
          >
            Form Post with Status
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-500 hover:text-blue-800"
            href="/formPostWithTransition"
          >
            Form Post with Transition
          </Link>
        </li>
        <li>
          <Link
            className="text-blue-500 hover:text-blue-800"
            href="/pokemonSearch"
          >
            Pokemon Search
          </Link>
        </li>
      </ul>
    </main>
  );
}

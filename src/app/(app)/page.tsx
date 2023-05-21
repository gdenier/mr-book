import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import db from "~/lib/db";

const loader = async () => {
  const { userId } = auth();
  if (!userId) throw new Error("Cannot load for disconnected user");

  const books = await db.book.findMany({ where: { userId } });

  return books;
};

export default async function Home() {
  const books = await loader();

  return (
    <div className="flex flex-col gap-12">
      <ul>
        {books.map((book) => (
          <li key={book.id} className="flex gap-6 items-center">
            <p>{book.title}</p>
            <Link
              href={`/books/${book.id}`}
              className="p-2 rounded bg-indigo-700 text-white"
            >
              Voir
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href="/books/add"
        className="p-2 rounded bg-indigo-700 text-white w-fit"
      >
        Ajouter un livre
      </Link>
    </div>
  );
}

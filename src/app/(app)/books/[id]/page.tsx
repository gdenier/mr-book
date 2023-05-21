import { auth } from "@clerk/nextjs";
import Link from "next/link";
import db from "~/lib/db";

const loader = async (id: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("Cannot load for disconnected user");

  const books = await db.book.findFirstOrThrow({ where: { userId, id } });

  return books;
};

export default async function ShowBookPage({
  params,
}: {
  params: { id: string };
}) {
  const book = await loader(params.id);

  return (
    <div>
      <h1>{book.title}</h1>
      <Link href={`/books/${params.id}/edit`}>Modifier</Link>
    </div>
  );
}

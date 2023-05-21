import { auth } from "@clerk/nextjs";
import db from "~/lib/db";
import { editBook } from "./_actions";

const loader = async (id: string) => {
  const { userId } = auth();
  if (!userId) throw new Error("Cannot load for disconnected user");

  const books = await db.book.findFirstOrThrow({ where: { userId, id } });

  return books;
};

export default async function EditBookPage({
  params,
}: {
  params: { id: string };
}) {
  const book = await loader(params.id);

  return (
    <form action={editBook}>
      <label htmlFor="title">Titre du livre</label>
      <input
        id="title"
        name="title"
        type="text"
        placeholder="titre"
        defaultValue={book.title}
      />

      <input type="hidden" name="id" value={params.id} />
      <input type="submit" value="Modifier" />
    </form>
  );
}

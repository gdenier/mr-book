import { auth } from "@clerk/nextjs"
import db from "~/lib/db"
import { EditBookForn } from "./EditBookForn"
import { editBook } from "./_actions"

const loader = async (id: string) => {
  const { userId } = auth()
  if (!userId) throw new Error("Cannot load for disconnected user")

  const books = await db.book.findFirstOrThrow({ where: { userId, id } })

  return books
}

export default async function EditBookPage({
  params,
}: {
  params: { id: string }
}) {
  const book = await loader(params.id)

  return <EditBookForn book={book} edit={editBook} />
}

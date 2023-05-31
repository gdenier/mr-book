import { auth } from "@clerk/nextjs"
import db from "~/lib/db"
import { EditBookForn } from "./EditBookForn"
import { editBook } from "./_actions"
import { createTag } from "~/app/(app)/_actions"

const loader = async (id: string) => {
  const { userId } = auth()
  if (!userId) throw new Error("Cannot load for disconnected user")

  const [book, tags] = await Promise.all([
    db.book.findFirstOrThrow({ where: { userId, id } }),
    db.tag.findMany(),
  ])

  return { book, tags }
}

export default async function EditBookPage({
  params,
}: {
  params: { id: string }
}) {
  const { book, tags } = await loader(params.id)

  return (
    <EditBookForn
      book={book}
      tags={tags}
      edit={editBook}
      createTag={createTag}
    />
  )
}

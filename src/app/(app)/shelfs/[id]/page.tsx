import { auth } from "@clerk/nextjs"
import db from "~/lib/db"

const loader = async (id: string) => {
  const { userId } = auth()
  if (!userId) throw new Error("Cannot load for disconnected user")

  const shelf = await db.shelf.findFirstOrThrow({
    where: { userId },
    include: { volumes: { include: { book: true, chapters: true } } },
  })

  return shelf
}

export default async function ShelfDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const shelf = await loader(params.id)

  return (
    <div>
      <h1>{shelf.name}</h1>
      <ul>
        {shelf.volumes.map((volume) => (
          <li key={volume.id}>{volume.title}</li>
        ))}
      </ul>
    </div>
  )
}

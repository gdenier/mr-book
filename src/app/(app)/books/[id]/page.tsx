import { auth } from "@clerk/nextjs"
import { EditIcon, HeartIcon, ShareIcon, TrashIcon } from "lucide-react"
import Link from "next/link"
import { Grade } from "~/components/grade"
import { Section } from "~/components/section"
import { Badge } from "~/components/ui/badge"
import { Button, buttonVariants } from "~/components/ui/button"
import db from "~/lib/db"
import { formatDate } from "~/lib/utils"

const loader = async (id: string) => {
  const { userId } = auth()
  if (!userId) throw new Error("Cannot load for disconnected user")

  const books = await db.book.findFirstOrThrow({
    where: { userId, id },
    include: {
      tags: { include: { tag: true } },
      volumes: { include: { _count: true }, orderBy: { number: "desc" } },
    },
  })

  return books
}

export default async function ShowBookPage({
  params,
}: {
  params: { id: string }
}) {
  const book = await loader(params.id)

  return (
    <>
      <div className="flex w-full justify-between px-4 py-4 sm:px-6 md:px-8">
        <Link
          href={`/books/${params.id}/edit`}
          className={buttonVariants({ variant: "outline", className: "gap-2" })}
        >
          <EditIcon className="h4 w-4" />
          <span className="max-lg:hidden">Modifier</span>
        </Link>
        <Button variant="outline" className="gap-2">
          <ShareIcon className="h4 w-4" />
          <span className="max-lg:hidden">Partager</span>
        </Button>
        <Button variant="outline" className="gap-2">
          <HeartIcon className="h4 w-4" />
          <span className="max-lg:hidden">Favoris</span>
        </Button>
        <Button variant="outline" className="gap-2">
          <TrashIcon className="h4 w-4" />
          <span className="max-lg:hidden">Supprimer</span>
        </Button>
      </div>
      <Section
        title={
          <div className="mt-10 flex min-h-[3rem] items-center gap-2 first:mt-0">
            <h2 className="items-center font-serif text-3xl font-semibold">
              {book.title}
            </h2>
            <Badge>{book.end ? "Terminé" : "En cours"}</Badge>
          </div>
        }
      >
        <div className="flex items-center gap-4">
          <p>author {book.author ?? "-"}</p>
          <p>
            publication {book.publication ? formatDate(book.publication) : "-"}
          </p>
          <Grade value={book.grade ?? 0} />
        </div>
        <div className="flex gap-2">
          {book.tags.map(({ tag, tagId }) => (
            <Link
              href={`/books`}
              key={tagId}
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              {tag.name}
            </Link> //link to list filtered by this tag
          ))}
        </div>
        <p className="mt-6 whitespace-pre-line">
          {book.summary ?? "Pas encore de résumé..."}
        </p>
      </Section>
      {book.volumes.length ? (
        <Section title={<h3>Volumes</h3>}>
          <ul>
            {book.volumes.map((volume) => (
              <li key={volume.id}>{volume.title}</li>
            ))}
          </ul>
        </Section>
      ) : null}
    </>
  )
}

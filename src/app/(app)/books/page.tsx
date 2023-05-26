import { UserButton, auth } from "@clerk/nextjs"
import Link from "next/link"
import db from "~/lib/db"
import { createBook as createBookFunction } from "~/app/(app)/_actions"
import { BookMarkedIcon, PlusIcon } from "lucide-react"
import { buttonVariants } from "~/components/ui/button"
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog"
import { cn } from "~/lib/utils"
import { CreateBookForm } from "../CreateBookForm"
import { Section } from "~/components/section"
import { Input } from "~/components/ui/input"
import { AspectRatio } from "~/components/ui/aspect-ratio"
import { SearchInput } from "./SearchInput"

const loader = async (search?: string) => {
  const { userId } = auth()
  if (!userId) throw new Error("Cannot load for disconnected user")

  const books = await db.book.findMany({
    where: { userId, title: { contains: search } },
  })

  return books
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search?: string }
}) {
  const books = await loader(searchParams.search)

  return (
    <Section
      title="Livres"
      action={<CreateBookButton createBook={createBookFunction} />}
    >
      <div className="flex flex-col gap-4">
        <SearchInput defaultValue={searchParams.search} />
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 xl:grid-cols-6 2xl:grid-cols-8 2xl:gap-x-8">
          {books.map((book) => (
            <li key={book.id}>
              <Link href={`/books/${book.id}`}>
                <AspectRatio className="group block w-full overflow-hidden rounded-md object-cover">
                  <div className="group relative aspect-square max-h-[300px] w-full overflow-hidden">
                    <div className="absolute flex aspect-square max-h-[300px] w-full items-center justify-center overflow-hidden rounded-md bg-muted object-cover transition-transform duration-300 hover:scale-110 active:scale-105">
                      <BookMarkedIcon
                        height="48"
                        width="48"
                        className="text-muted-foreground"
                      />
                    </div>
                  </div>
                </AspectRatio>
              </Link>
              <Link
                href={`/books/${book.id}`}
                className={buttonVariants({
                  variant: "link",
                  className: "!p-0 text-base",
                })}
              >
                <p>{book.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

const CreateBookButton = ({
  createBook,
}: {
  createBook: typeof createBookFunction
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ className: cn("w-fit gap-2") })}
      >
        <PlusIcon className="h-5 w-5" />
        Creer un livre
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creer un nouveau livre</DialogTitle>
          <DialogDescription>Quel est le nom de ce livre ?</DialogDescription>
        </DialogHeader>
        <CreateBookForm create={createBook} />
      </DialogContent>
    </Dialog>
  )
}

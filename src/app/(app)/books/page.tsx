import { UserButton, auth } from "@clerk/nextjs"
import Link from "next/link"
import db from "~/lib/db"
import { createBook as createBookFunction } from "~/app/(app)/_actions"
import { PlusIcon } from "lucide-react"
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

const loader = async () => {
  const { userId } = auth()
  if (!userId) throw new Error("Cannot load for disconnected user")

  const books = await db.book.findMany({ where: { userId } })

  return books
}

export default async function Home() {
  const books = await loader()

  return (
    <div className="flex flex-col gap-12">
      <ul>
        {books.map((book) => (
          <li key={book.id} className="flex items-center gap-6">
            <p>{book.title}</p>
            <Link
              href={`/books/${book.id}`}
              className={buttonVariants({ className: cn("w-fit gap-2") })}
            >
              Voir
            </Link>
          </li>
        ))}
      </ul>
      <CreateBookButton createBook={createBookFunction} />
    </div>
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
        <PlusIcon className="h-4 w-4" />
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

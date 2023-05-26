import { auth } from "@clerk/nextjs"
import Link from "next/link"
import { buttonVariants } from "~/components/ui/button"
import db from "~/lib/db"
import { cn } from "~/lib/utils"
import { createBook, createShelf as createShelfFunction } from "../_actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import { CreateBookForm } from "../CreateBookForm"
import { CreateShelfForm } from "../CreateShelfForm"

const loader = async () => {
  const { userId } = auth()
  if (!userId) throw new Error("Cannot load for disconnected user")

  const shelfs = await db.shelf.findMany({ where: { userId } })

  return shelfs
}

export default async function ShelfsPage() {
  const shelfs = await loader()

  return (
    <div className="flex flex-col gap-12">
      <ul>
        {shelfs.map((shelf) => (
          <li key={shelf.id} className="flex items-center gap-6">
            <p>{shelf.name}</p>
            <Link
              href={`/shelfs/${shelf.id}`}
              className={buttonVariants({ className: cn("w-fit gap-2") })}
            >
              Voir
            </Link>
          </li>
        ))}
      </ul>
      <CreateShelfButton createShelf={createShelfFunction} />
    </div>
  )
}

const CreateShelfButton = ({
  createShelf,
}: {
  createShelf: typeof createShelfFunction
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({ className: cn("w-fit gap-2") })}
      >
        <PlusIcon className="h-4 w-4" />
        Creer une étagère
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creer une nouvelle étagère</DialogTitle>
          <DialogDescription>
            Avec les étagère, vous pouvez créer des groupes de livres pour vous
            organiser ou bien pour les partager à vos amis ou votre famille.
          </DialogDescription>
        </DialogHeader>
        <CreateShelfForm create={createShelf} />
      </DialogContent>
    </Dialog>
  )
}

"use client"

import Link, { LinkProps } from "next/link"
import { ReactElement, ReactNode } from "react"
import { Button, buttonVariants } from "./ui/button"
import { BookMarkedIcon, LucideIcon, PlusIcon } from "lucide-react"
import { RouteType } from "next/dist/lib/load-custom-routes"
import { cn } from "~/lib/utils"
import { usePathname } from "next/navigation"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "~/components/ui/dialog"
import { createBook as createBookFunction } from "~/app/(app)/books/add/_actions"
import { CreateBookForn } from "~/app/(app)/books/add/CreateBookForm"

export const Sidebar = ({
  createBook,
  createShelf,
}: {
  createBook: typeof createBookFunction
  createShelf?: Function
}): ReactElement => {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-border pt-5">
        <Link
          href="/books"
          className={buttonVariants({
            variant: "link",
            className: "!justify-start",
          })}
        >
          <span className="flex gap-2">
            <BookMarkedIcon className="h-6 w-6" />
            <span className="whitespace-nowrap font-serif text-xl font-semibold tracking-tight">
              Mr. Book
            </span>
          </span>
        </Link>
        <nav className="mt-5 flex flex-1 flex-grow flex-col space-y-1 px-2 pb-4">
          <SidebarTitle>Navigation</SidebarTitle>
          <SidebarMenu menu="Livres" Icon={BookMarkedIcon} href="/books" />
          <SidebarTitle>Gerer les livres</SidebarTitle>
          <CreateBookMenu createBook={createBook} />
          <SidebarTitle>Etageres</SidebarTitle>
          <SidebarMenu
            menu="Creer une etagere"
            Icon={PlusIcon}
            href="/shelfs/add"
          />
        </nav>
      </div>
    </div>
  )
}

const SidebarTitle = ({ children }: { children: ReactNode }) => {
  return (
    <h4 className="mb-1 ml-2 mt-0 scroll-m-20 rounded-md px-2 py-1 pt-6 font-sans text-sm font-semibold tracking-tight">
      {children}
    </h4>
  )
}

const SidebarMenu = ({
  Icon,
  menu,
  href,
}: {
  menu: string
  Icon: LucideIcon
} & Pick<LinkProps<RouteType>, "href">) => {
  const pathname = usePathname()
  const isActive = pathname.startsWith(href.toString())

  return (
    <Link
      href={href}
      className={buttonVariants({
        variant: "muted",
        className: cn(
          "!justify-start gap-2 !text-foreground hover:text-accent-foreground",
          isActive && "bg-muted/75 font-semibold"
        ),
      })}
    >
      <Icon className="h-4 w-4" />
      {menu}
    </Link>
  )
}

const CreateBookMenu = ({
  createBook,
}: {
  createBook: typeof createBookFunction
}) => {
  return (
    <Dialog>
      <DialogTrigger
        className={buttonVariants({
          variant: "muted",
          className: cn(
            "!justify-start gap-2 !text-foreground hover:text-accent-foreground"
          ),
        })}
      >
        <PlusIcon className="h-4 w-4" />
        Creer un livre
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creer un nouveau livre</DialogTitle>
          <DialogDescription>Quel est le nom de ce livre ?</DialogDescription>
          <CreateBookForn create={createBook} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

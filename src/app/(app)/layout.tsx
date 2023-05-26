import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { BookMarkedIcon, Github, HelpCircle } from "lucide-react"
import { Button, buttonVariants } from "~/components/ui/button"
import { Sidebar } from "~/components/sidebar"
import { createBook, createShelf } from "./_actions"
import { Footer } from "~/components/footer"
import { Header } from "~/components/header"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[100dvh]">
      <Sidebar createBook={createBook} createShelf={createShelf} />
      <div className="flex min-h-[100dvh] flex-1 flex-col lg:pl-64">
        <Header />
        <div className="mt-16 flex h-full flex-1 flex-col justify-between print:mt-0">
          <main className="py-6 print:py-0 max-lg:mb-16">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

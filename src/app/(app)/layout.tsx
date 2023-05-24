import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { BookMarkedIcon, Github, HelpCircle } from "lucide-react"
import { Button, buttonVariants } from "~/components/ui/button"
import { Sidebar } from "~/components/sidebar"
import { createBook } from "./books/add/_actions"

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-[100dvh]">
      <Sidebar createBook={createBook} />
      <div className="flex min-h-[100dvh] flex-1 flex-col lg:pl-64">
        <header className="-bg-background fixed top-0 z-10 flex h-16 w-full flex-shrink-0 border-b border-border print:hidden lg:w-[calc(100%-16rem)] ">
          <UserButton />
        </header>
        <div className="mt-16 flex h-full flex-1 flex-col justify-between print:mt-0">
          <main className="py-6 print:py-0 max-lg:mb-16">{children}</main>
          <footer className="z-10 bg-gray-50 max-lg:hidden">
            <div className="gap-4 px-4 py-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
              <div className="flex items-center justify-center gap-2 md:order-2">
                <a
                  href="https://github.com/gdenier-meditect"
                  className={buttonVariants({ variant: "muted" })}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Github</span>
                  <Github className="h-5 w-5 text-muted-foreground" />
                </a>
                <Button variant="muted">
                  <HelpCircle className="h-5 w-5 text-muted-foreground" />
                </Button>
              </div>
              <div className="mt-4 max-sm:text-center md:order-1 md:mt-0">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()}{" "}
                  <a
                    href="https://www.guillaume-denier.fr/"
                    className="hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Guillaume Denier
                  </a>
                  . All rights reserved.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

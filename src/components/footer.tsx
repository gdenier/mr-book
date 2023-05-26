import { HelpCircleIcon } from "lucide-react"
import { GithubIcon } from "lucide-react"
import { ReactElement } from "react"
import { buttonVariants, Button } from "./ui/button"

export const Footer = (): ReactElement => {
  return (
    <footer className="z-10 max-lg:hidden">
      <div className="gap-4 px-4 py-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex items-center justify-center gap-2 md:order-2">
          <a
            href="https://github.com/gdenier-meditect"
            className={buttonVariants({ variant: "muted" })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="sr-only">Github</span>
            <GithubIcon className="h-5 w-5 text-muted-foreground" />
          </a>
          <Button variant="muted">
            <HelpCircleIcon className="h-5 w-5 text-muted-foreground" />
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
  )
}

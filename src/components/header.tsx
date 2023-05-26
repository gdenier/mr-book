"use client"

import { UserButton, useAuth, useUser } from "@clerk/nextjs"
import { ReactElement } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "./ui/dropdown-menu"
import { Button, buttonVariants } from "./ui/button"
import {
  ChevronRightIcon,
  GlobeIcon,
  InfoIcon,
  KeyboardIcon,
  LanguagesIcon,
  LaptopIcon,
  LogOutIcon,
  MoonIcon,
  SettingsIcon,
  SunMediumIcon,
} from "lucide-react"
import {
  DropdownMenuArrow,
  DropdownMenuSubTrigger,
} from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import Script from "next/script"
import { useTheme } from "next-themes"

export const Header = (): ReactElement => {
  return (
    <header className="-bg-background fixed top-0 z-10 flex h-16 w-full flex-shrink-0 border-b border-border print:hidden lg:w-[calc(100%-16rem)] ">
      <div className="flex flex-1 items-center justify-between gap-3 px-2 sm:px-8 sm:pr-4">
        <p></p>
        <OptionMenu />
      </div>
    </header>
  )
}

const OptionMenu = () => {
  const { user } = useUser()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-none">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" collisionPadding={15}>
        <DropdownMenuGroup className="px-2 py-1.5">
          {/* 1. Mr. Book + email */}

          <p className="text-sm">Mr. Book</p>
          <p className="text-xs text-muted-foreground">
            {user?.emailAddresses?.[0].emailAddress}
          </p>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* 2. Theme(sub: light/dark/auto) + Language(sub: fr + en) + Shortcuts(shortcut) + seettings(direct) */}
          <ThemeSubMenu />
          <LanguageSubMenu />
          <ShortcutsMenu />
          <DropdownMenuItem asChild>
            <Link
              href="/books"
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className:
                  "flex w-full !justify-start gap-2 border-none !px-2 !py-1.5 focus:bg-accent data-[state=open]:bg-accent",
              })}
            >
              <SettingsIcon className="h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* 3. Feedback */}
          <FeedbackMenu />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Logout */}
          <LogoutMenu />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const ThemeSubMenu = () => {
  const { theme, setTheme } = useTheme()

  return (
    <>
      <DropdownMenuSub>
        <DropdownMenuSubTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="flex w-full gap-2 border-none px-2 py-1.5 focus:bg-accent data-[state=open]:bg-accent"
            focus="none"
          >
            <SunMediumIcon className="h-4 w-4" />
            <span>Theme</span>
            <ChevronRightIcon className="ml-auto h-4 w-4" />
          </Button>
        </DropdownMenuSubTrigger>
        <DropdownMenuPortal>
          <DropdownMenuSubContent className="p-1">
            <DropdownMenuItem className="p-0">
              <Button
                variant="outline"
                size="sm"
                className="flex w-full justify-start gap-2 border-none px-2 py-1.5"
                onClick={() => setTheme("light")}
              >
                <SunMediumIcon className="h-4 w-4" />
                Light theme
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0" asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex w-full justify-start gap-2 border-none px-2 py-1.5"
                onClick={() => setTheme("dark")}
              >
                <MoonIcon className="h-4 w-4" />
                Dark theme
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0" asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex w-full justify-start gap-2 border-none px-2 py-1.5"
                onClick={() => setTheme("system")}
              >
                <LaptopIcon className="h-4 w-4" />
                Follow system
              </Button>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuPortal>
      </DropdownMenuSub>
    </>
  )
}

const LanguageSubMenu = () => {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex w-full gap-2 border-none px-2 py-1.5 focus:bg-accent data-[state=open]:bg-accent"
          focus="none"
        >
          <GlobeIcon className="h-4 w-4" />
          <span>Language</span>
          <ChevronRightIcon className="ml-auto h-4 w-4" />
        </Button>
      </DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent className="p-1">
          <DropdownMenuItem className="p-0" asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex w-full justify-start gap-2 border-none px-2 py-1.5"
            >
              <LanguagesIcon className="h-4 w-4" />
              English
            </Button>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-0" asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex w-full justify-start gap-2 border-none px-2 py-1.5"
            >
              <LanguagesIcon className="h-4 w-4" />
              French
            </Button>
          </DropdownMenuItem>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

const ShortcutsMenu = () => {
  return (
    <DropdownMenuItem asChild>
      <Button
        variant="outline"
        size="sm"
        className="flex w-full justify-start gap-2 border-none px-2 py-1.5"
      >
        <KeyboardIcon className="h-4 w-4" />
        Shortcuts
        <span className="ml-auto text-xs text-muted-foreground">⌘K</span>
      </Button>
    </DropdownMenuItem>
  )
}

const FeedbackMenu = () => {
  return (
    <DropdownMenuItem asChild>
      <Button
        variant="outline"
        size="sm"
        className="flex w-full justify-start gap-2 border-none px-2 py-1.5"
      >
        <InfoIcon className="h-4 w-4" />
        Feedback
      </Button>
    </DropdownMenuItem>
  )
}

const LogoutMenu = () => {
  const { signOut } = useAuth()
  return (
    <DropdownMenuItem asChild>
      <Button
        variant="outline"
        size="sm"
        className="flex w-full justify-start gap-2 border-none px-2 py-1.5"
        onClick={() => signOut()}
      >
        <LogOutIcon className="h-4 w-4" />
        Logout
      </Button>
    </DropdownMenuItem>
  )
}

"use client"

import { usePathname, useRouter } from "next/navigation"
import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  useEffect,
  useState,
  useTransition,
} from "react"
import { Input } from "~/components/ui/input"
import { useDebounce } from "~/lib/utils/hooks"

export const SearchInput = ({
  defaultValue,
}: InputHTMLAttributes<HTMLInputElement>): ReactElement => {
  const { replace } = useRouter()
  const [isPending, startTransition] = useTransition()

  const [value, setValue] = useState(defaultValue)
  const lastValue = useDebounce(value)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    if (lastValue) searchParams.set("search", lastValue)
    else searchParams.delete("search")

    startTransition(() => {
      replace(`/books?${searchParams.toString()}`)
    })
  }, [lastValue, replace])

  const handleCHange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  return (
    <Input
      placeholder="Chercher un livre..."
      onChange={handleCHange}
      defaultValue={defaultValue}
    />
  )
}

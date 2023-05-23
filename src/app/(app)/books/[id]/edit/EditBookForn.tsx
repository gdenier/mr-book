"use client"

import { ReactElement, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editBookSchema } from "./_schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Book } from "@prisma/client"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { editBook } from "./_actions"
import { redirect } from "next/navigation"

export const EditBookForn = ({
  book,
  edit,
}: {
  book: Book
  edit: typeof editBook
}): ReactElement => {
  const form = useForm<z.infer<typeof editBookSchema>>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      title: book.title,
      id: book.id,
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof editBookSchema>) => {
    startTransition(async () => {
      const data = new FormData()
      Object.entries(values).forEach(([key, value]) => data.append(key, value))
      await edit(data)
      redirect(`/books/${book.id}`)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du livre</FormLabel>
              <FormControl>
                <Input placeholder="titre du livre" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{isPending ? "..." : "Submit"}</Button>
      </form>
    </Form>
  )
}

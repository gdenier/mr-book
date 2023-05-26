"use client"

import { ReactElement, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import { createBook } from "./_actions"
import { redirect } from "next/navigation"
import { createBookSchema } from "./_schema"
import { RotateCw } from "lucide-react"

export const CreateBookForm = ({
  create,
}: {
  create: typeof createBook
}): ReactElement => {
  const form = useForm<z.infer<typeof createBookSchema>>({
    resolver: zodResolver(createBookSchema),
    defaultValues: {
      title: "",
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof createBookSchema>) => {
    startTransition(async () => {
      const data = new FormData()
      Object.entries(values).forEach(([key, value]) => data.append(key, value))
      const result = await create(data)
      redirect(`/books/${result.id}`)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titre du livre</FormLabel>
              <FormControl>
                <Input placeholder="titre du livre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="ml-auto w-fit gap-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <RotateCw className="animate-spin" />
              Création...
            </>
          ) : (
            "Créer le livre"
          )}
        </Button>
      </form>
    </Form>
  )
}

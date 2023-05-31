"use client"

import { ReactElement, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Book, Tag } from "@prisma/client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Button } from "~/components/ui/button"
import { createTag } from "./_actions"
import { redirect, usePathname } from "next/navigation"
import { createTagSchema } from "./_schema"
import { RotateCw } from "lucide-react"

export const CreateTagForm = ({
  create,
  afterSubmit,
}: {
  create: typeof createTag
  afterSubmit: (tag: Tag) => void
}): ReactElement => {
  const form = useForm<z.infer<typeof createTagSchema>>({
    resolver: zodResolver(createTagSchema),
    defaultValues: {
      name: "",
    },
  })

  const [isPending, startTransition] = useTransition()

  const pathname = usePathname()

  const onSubmit = (values: z.infer<typeof createTagSchema>) => {
    startTransition(async () => {
      const data = new FormData()
      Object.entries(values).forEach(([key, value]) => data.append(key, value))
      const tag = await create(data)
      afterSubmit ? afterSubmit(tag) : redirect(pathname)
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du tag</FormLabel>
              <FormControl>
                <Input placeholder="nom du tag" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="ml-auto w-fit gap-2"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <RotateCw className="animate-spin" />
              Création...
            </>
          ) : (
            "Créer le tag"
          )}
        </Button>
      </form>
    </Form>
  )
}

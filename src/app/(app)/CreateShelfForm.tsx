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
import { createShelf } from "./_actions"
import { redirect } from "next/navigation"
import { createShelfSchema } from "./_schema"
import { RotateCw } from "lucide-react"

export const CreateShelfForm = ({
  create,
}: {
  create: typeof createShelf
}): ReactElement => {
  const form = useForm<z.infer<typeof createShelfSchema>>({
    resolver: zodResolver(createShelfSchema),
    defaultValues: {
      name: "",
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: z.infer<typeof createShelfSchema>) => {
    startTransition(async () => {
      const data = new FormData()
      Object.entries(values).forEach(([key, value]) => data.append(key, value))
      const result = await create(data)
      redirect(`/shelfs/${result.id}`)
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
              <FormLabel>Nom de l&apos;étagère</FormLabel>
              <FormControl>
                <Input placeholder="Nom de l'étagère" {...field} />
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
            "Créer l'étagère"
          )}
        </Button>
      </form>
    </Form>
  )
}

"use client"

import { ReactElement, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editBookSchema } from "./_schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Book, Tag } from "@prisma/client"
import { Form } from "~/components/ui/form"
import { Button } from "~/components/ui/button"
import { editBook } from "./_actions"
import { redirect } from "next/navigation"
import { Section } from "~/components/section"
import { RotateCw, SaveIcon, TrashIcon } from "lucide-react"
import { GeneralFormPart } from "./GeneralFormPart"
import { ContentFormPart } from "./ContentFormPart"
import { ExtraFormPart } from "./ExtraFormPart"
import { createTag as createTagFunction } from "~/app/(app)/_actions"

export type EditBookFormValues = z.infer<typeof editBookSchema>

export const EditBookForn = ({
  book,
  tags,
  edit,
  createTag,
}: {
  book: Book
  tags: Tag[]
  edit: typeof editBook
  createTag: typeof createTagFunction
}): ReactElement => {
  const form = useForm<EditBookFormValues>({
    resolver: zodResolver(editBookSchema),
    defaultValues: {
      title: book.title,
      id: book.id,
    },
  })

  const [isPending, startTransition] = useTransition()

  const onSubmit = (values: EditBookFormValues) => {
    startTransition(async () => {
      const data = new FormData()
      Object.entries(values).forEach(([key, value]) =>
        data.append(key, `${value}`)
      )
      await edit(data)
      redirect(`/books/${book.id}`)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Section
          title="Modifier le livre"
          action={
            <>
              <Button
                variant="outline"
                intent="destructive"
                className="gap-2"
                disabled={isPending}
              >
                {isPending ? (
                  <RotateCw className="h-5 w-5 animate-spin" />
                ) : (
                  <TrashIcon className="h-5 w-5" />
                )}
                Supprimer le livre
              </Button>
              <Button type="submit" className="gap-2" disabled={isPending}>
                {isPending ? (
                  <RotateCw className="h-5 w-5 animate-spin" />
                ) : (
                  <SaveIcon className="h-5 w-5" />
                )}
                Sauvegarder
              </Button>
            </>
          }
        >
          <div className="space-y-6">
            <GeneralFormPart tags={tags} createTag={createTag} />
            <ContentFormPart />
            <ExtraFormPart />
            <div className="space-x-2">
              <Button type="submit" className="gap-2" disabled={isPending}>
                {isPending ? (
                  <RotateCw className="h-5 w-5 animate-spin" />
                ) : (
                  <SaveIcon className="h-5 w-5" />
                )}
                Sauvegarder
              </Button>
              <Button
                variant="outline"
                intent="destructive"
                className="gap-2"
                disabled={isPending}
              >
                {isPending ? (
                  <RotateCw className="h-5 w-5 animate-spin" />
                ) : (
                  <TrashIcon className="h-5 w-5" />
                )}
                Supprimer le livre
              </Button>
            </div>
          </div>
        </Section>
      </form>
    </Form>
  )
}

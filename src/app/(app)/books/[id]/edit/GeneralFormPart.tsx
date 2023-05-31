"use client"

import { ReactElement, useState } from "react"
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFieldArray,
  useFormContext,
} from "react-hook-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"
import { EditBookFormValues } from "./EditBookForn"
import { CheckIcon, PlusIcon, XIcon } from "lucide-react"
import { Button, buttonVariants } from "~/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command"
import { Tag } from "@prisma/client"
import { useCommandState } from "cmdk"
import { cn } from "~/lib/utils"
import { createTag as createTagFunction } from "~/app/(app)/_actions"
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog"
import { CreateTagForm } from "~/app/(app)/CreateTagForm"

export const GeneralFormPart = ({
  tags,
  createTag,
}: {
  tags: Tag[]
  createTag: typeof createTagFunction
}): ReactElement => {
  const form = useFormContext<EditBookFormValues>()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Général</CardTitle>
        <CardDescription>
          Seul le titre est obligatoire. Vous pouvez modifier le livre à tout
          moment.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4">
              <div className="flex items-center gap-2 max-sm:pb-2 sm:pt-2">
                <FormLabel>Titre du livre</FormLabel>
              </div>
              <div className="max-w-xl sm:col-span-3 sm:mt-0">
                <FormControl>
                  <Input placeholder="titre du livre" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <TagForm tags={tags} createTag={createTag} />
      </CardContent>
    </Card>
  )
}

const TagForm = ({
  tags,
  createTag,
}: {
  tags: Tag[]
  createTag: typeof createTagFunction
}) => {
  const form = useFormContext<EditBookFormValues>()

  const { fields, append, remove } = useFieldArray<EditBookFormValues, "tags">({
    control: form.control,
    name: "tags",
    keyName: "_id" as "id",
  })

  const [open, setOpen] = useState(false)

  return (
    <div className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4">
      <div className="flex items-center gap-2 max-sm:pb-2 sm:pt-2">
        <FormLabel>Tags</FormLabel>
      </div>
      <div className="max-w-xl sm:col-span-3 sm:mt-0">
        <div className="flex gap-1">
          {fields.map((tag, index) => (
            <Button
              key={tag.id}
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => remove(index)}
            >
              {tag.name}
              <XIcon className="h-4 w-4 text-muted-foreground" />
            </Button>
          ))}
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <PlusIcon className="h-5 w-5" />
              Ajouter un tag
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Chercher ou créer un tag..." />
              <TagsListResult
                fields={fields}
                tags={tags}
                append={append}
                remove={remove}
                createTag={createTag}
              />
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export const TagsListResult = ({
  fields,
  tags,
  append,
  remove,
  createTag,
}: {
  fields: FieldArrayWithId<EditBookFormValues, "tags">[]
  tags: Tag[]
  append: UseFieldArrayAppend<EditBookFormValues, "tags">
  remove: UseFieldArrayRemove
  createTag: typeof createTagFunction
}) => {
  const search = useCommandState((state) => state)

  const [open, setOpen] = useState(false)

  return (
    <CommandList>
      <CommandGroup
        heading="Tags existants"
        hidden={search.filtered.count === 0}
      >
        {tags.map((tag) => (
          <CommandItem
            key={tag.id}
            value={tag.id}
            className="gap-2"
            onSelect={(value) => {
              const selected = tags.find((t) => t.id === value)
              const index = fields.findIndex((f) => {
                return f.id === value
              })
              selected && (index > -1 ? remove(index) : append(selected))
            }}
          >
            <CheckIcon
              className={cn(
                "h-4 w-4",
                fields.some((f) => {
                  return f.id === tag.id
                })
                  ? "opacity-100"
                  : "opacity-0"
              )}
            />
            {tag.name}
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup>
        <CommandItem onSelect={() => setOpen(true)} className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Créer un tag
        </CommandItem>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau tag</DialogTitle>
              <DialogDescription>
                Les tags sont un moyen facile d&apos;organiser vos livres.
              </DialogDescription>
            </DialogHeader>
            <CreateTagForm
              create={createTag}
              afterSubmit={(tag) => {
                tags.push(tag)
                append(tag)
                setOpen(false)
              }}
            />
          </DialogContent>
        </Dialog>
      </CommandGroup>
    </CommandList>
  )
}

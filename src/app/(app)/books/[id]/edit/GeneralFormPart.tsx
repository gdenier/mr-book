"use client"

import { ReactElement } from "react"
import { useFormContext } from "react-hook-form"
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

export const GeneralFormPart = (): ReactElement => {
  const form = useFormContext<EditBookFormValues>()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Général</CardTitle>
        <CardDescription>
          Seul le titre est oblogatoire. VOus pouvez modifier le livre à tout
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
      </CardContent>
    </Card>
  )
}

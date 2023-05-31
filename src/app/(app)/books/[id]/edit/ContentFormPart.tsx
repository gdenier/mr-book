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
import { Textarea } from "~/components/ui/textarea"
import { EditBookFormValues } from "./EditBookForn"

export const ContentFormPart = (): ReactElement => {
  const form = useFormContext<EditBookFormValues>()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contenu</CardTitle>
        <CardDescription>Le contenu du livre actuel.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />
        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4">
              <div className="flex items-center gap-2 max-sm:pb-2 sm:pt-2">
                <FormLabel>Auteur du livre</FormLabel>
              </div>
              <div className="max-w-xl sm:col-span-3 sm:mt-0">
                <FormControl>
                  <Input placeholder="auteur" {...field} />
                </FormControl>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4">
              <div className="flex items-center gap-2 max-sm:pb-2 sm:pt-2">
                <FormLabel>Résumé du livre</FormLabel>
              </div>
              <div className="max-w-xl sm:col-span-3 sm:mt-0">
                <FormControl>
                  <Textarea placeholder="Résumé du livre..." {...field} />
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

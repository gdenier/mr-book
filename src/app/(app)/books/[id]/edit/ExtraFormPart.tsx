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
import { Slider } from "~/components/ui/slider"
import { Grade } from "~/components/grade"

export const ExtraFormPart = (): ReactElement => {
  const form = useFormContext<EditBookFormValues>()
  return (
    <Card>
      <CardHeader>
        <CardTitle>Extra</CardTitle>
        <CardDescription>
          Information additionel à propos du livre.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem className="sm:grid sm:grid-cols-4 sm:items-start sm:gap-4">
              <div className="flex flex-col gap-2 max-sm:pb-2 sm:pt-2">
                <FormLabel>Note du livre</FormLabel>
                <Grade value={field.value ?? 0} />
              </div>
              <div className="max-w-xl sm:col-span-3 sm:mt-0">
                <FormControl>
                  <Slider
                    max={5}
                    step={0.5}
                    value={[field.value ?? 0]}
                    onValueChange={(value) => field.onChange(value[0])}
                  />
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

"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import db from "~/lib/db"
import { withValidation } from "~/lib/utils/server"
import { editBookSchema } from "./_schema"

export const editBook = withValidation(editBookSchema, async (data) => {
  console.log(data)
  await db.book.update({
    where: { id: data.id },
    data,
  })

  revalidatePath("/books")
  revalidatePath(`/books/${data.id}`)
})

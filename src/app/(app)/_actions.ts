"use server"

import { revalidatePath } from "next/cache"
import db from "~/lib/db"
import { withValidation } from "~/lib/utils/server"
import { createBookSchema, createShelfSchema } from "./_schema"

export const createBook = withValidation(
  createBookSchema,
  async (data, user) => {
    const book = await db.book.create({
      data: {
        title: data.title,
        userId: user.id,
      },
    })

    revalidatePath("/books")

    return book
  }
)

export const createShelf = withValidation(
  createShelfSchema,
  async (data, user) => {
    const shelf = await db.shelf.create({
      data: {
        name: data.name,
        userId: user.id,
      },
    })

    revalidatePath("/shelfs")

    return shelf
  }
)

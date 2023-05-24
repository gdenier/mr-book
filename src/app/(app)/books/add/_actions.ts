"use server"

import { revalidatePath } from "next/cache"
import db from "~/lib/db"
import { withValidation } from "~/lib/utils/server"
import { createBookSchema } from "./_schema"
import { Book } from "@prisma/client"

export const createBook = withValidation(
  createBookSchema,
  async (data, user) => {
    const book = await db.book.create({
      data: {
        title: data.title,
        userId: user.id,
      },
    })

    revalidatePath("/")

    return book
  }
)

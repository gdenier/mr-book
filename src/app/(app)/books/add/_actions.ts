"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import db from "~/lib/db";
import { withValidation } from "~/lib/utils/server";

export const createBook = withValidation(
  z.object({
    title: z.string(),
  }),
  async (data, user) => {
    "use server";

    const book = await db.book.create({
      data: {
        title: data.title,
        userId: user.id,
      },
    });

    revalidatePath("/");

    redirect(`/books/${book.id}`);
  }
);

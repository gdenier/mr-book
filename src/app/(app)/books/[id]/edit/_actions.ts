"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import db from "~/lib/db";
import { withValidation } from "~/lib/utils/server";

export const editBook = withValidation(
  z.object({
    id: z.string().cuid(),
    title: z.string(),
  }),
  async (data) => {
    "use server";

    await db.book.update({
      where: { id: data.id },
      data: {
        title: data.title,
      },
    });

    revalidatePath("/");
    revalidatePath(`/books/${data.id}`);

    redirect(`/books/${data.id}`);
  }
);

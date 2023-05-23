import { z } from "zod"

export const editBookSchema = z.object({
  id: z.string().cuid(),
  title: z.string(),
})

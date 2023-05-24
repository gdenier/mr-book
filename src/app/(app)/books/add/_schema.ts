import { z } from "zod"

export const createBookSchema = z.object({
  title: z.string(),
})

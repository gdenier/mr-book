import { z } from "zod"

export const createBookSchema = z.object({
  title: z.string(),
})

export const createShelfSchema = z.object({
  name: z.string(),
})

export const createTagSchema = z.object({
  name: z.string(),
})

import { z } from "zod"
import { zfd } from "zod-form-data"

export const editBookSchema = zfd.formData({
  id: zfd.text(z.string().cuid()),
  title: zfd.text(z.string()),
  summary: zfd.text(z.string().optional()),
  author: zfd.text(z.string().optional()),
  grade: zfd.numeric(z.number().min(0).max(5).optional()),
})

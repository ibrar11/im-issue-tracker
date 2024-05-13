import { z } from 'zod'
export const createIssueSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title cannot be more than 255 characters.'),
  description: z.string().min(1, 'Description cannot be empty'),
})

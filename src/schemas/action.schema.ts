import { z } from 'zod';

export const videoUploadSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required").optional(), // Optional because form-data can sometimes be tricky or missing
    userId: z.string().optional()
  })
});

export const actionSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    videoId: z.string().min(1, "Video ID is required"),
    type: z.enum(['VIEW', 'LIKE', 'SHARE'], {
      errorMap: () => ({ message: "Type must be one of: VIEW, LIKE, SHARE" })
    }),
  })
});

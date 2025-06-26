import * as z from "zod";

export const nicknameSchema = z.object({
  nickname: z.
    string()
    .min(1, "Nickname cannot be empty")
    .max(16, "Nickname cannot be longer than 16 characters")
});

export type NicknameFormData = z.infer<typeof nicknameSchema>;
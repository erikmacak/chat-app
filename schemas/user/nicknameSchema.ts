import * as z from "zod";

export const nicknameSchema = z.object({
  nickname: z.string().min(1, "Nickname cannot be empty"),
});

export type NicknameFormData = z.infer<typeof nicknameSchema>;
import { z } from "zod";

export const ChangeRole = z.object({
  id: z.string(),
  email: z.string(),
  role: z.string(),
});

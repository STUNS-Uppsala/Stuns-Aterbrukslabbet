import { z } from "zod";

export const DeleteUser = z.object({
  id: z.string(),
  email: z.string(),
});

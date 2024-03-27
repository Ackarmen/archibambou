import { z } from 'zod';

export type SendResetPasswordSchemaType = z.infer<
  typeof sendResetPasswordSchema
>;

export const sendResetPasswordSchema = z.object({
  email: z.string().trim().email({ message: "L'email doit être valide." }),
});

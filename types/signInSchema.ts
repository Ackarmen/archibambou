import { z } from 'zod';

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
  email: z.string().trim().email({ message: "L'email doit être valide." }),
  password: z.string().trim().min(6, {
    message: 'Mot de passe incorrect.',
  }),
});

import { z } from 'zod';

export type SignInSchemaType = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
  email: z.string().email({ message: "L'email doit être valide" }),
  password: z.string().min(6, {
    message: 'Le mot de passe doit avoir au moins 6 caractères',
  }),
});

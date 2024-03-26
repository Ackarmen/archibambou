import { z } from 'zod';

export type SignUpSchemaType = z.infer<typeof signUpSchema>;

export const signUpSchema = z
  .object({
    userName: z.string().trim().min(3, {
      message: "Le nom d'utilisateur doit avoir au moins 3 caractères",
    }),
    email: z.string().trim().email({ message: "L'email doit être valide" }),
    password: z.string().trim().min(6, {
      message: 'Le mot de passe doit avoir au moins 6 caractères',
    }),
    confirmpassword: z.string().trim().min(6, {
      message: 'Les mots de passe ne sont pas identiques',
    }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: 'Les mots de passe ne sont pas identiques',
  });

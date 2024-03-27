import { z } from 'zod';

export type ConfirmResetPasswordSchemaType = z.infer<
  typeof confirmResetPasswordSchema
>;

export const confirmResetPasswordSchema = z
  .object({
    password: z.string().trim().min(6, {
      message: 'Le mot de passe doit avoir au moins 6 caractères',
    }),
    confirmPassword: z.string().trim().min(6, {
      message: 'Les mots de passe ne sont pas identiques',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Les mots de passe ne sont pas identiques',
    path: ['confirmPassword'],
  });

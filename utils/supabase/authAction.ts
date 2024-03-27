'use server';

import { confirmResetPasswordSchema } from '@/types/confirmResetPasswordSchema';
import { sendResetPasswordSchema } from '@/types/sendResetPasswordSchema';
import { signInSchema } from '@/types/signInSchema';
import { signUpSchema } from '@/types/signUpSchema';
import { createClient } from '@/utils/supabase/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signInAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsed = signInSchema.safeParse(data);

  if (!parsed.success) {
    return redirect(
      '/auth/signIn?message=Oups, une erreur est survenue, veuillez reessayer...'
    );
  }

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(
      '/auth/signIn?message=Adresse email ou mot de passe incorrect.'
    );
  }

  return redirect('/protected');
};

export const signUpAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsed = signUpSchema.safeParse(data);

  if (!parsed.success) {
    return redirect(
      '/auth/signUp?message=Oups, une erreur est survenue, veuillez reessayer...'
    );
  }

  const origin = headers().get('origin');

  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect(
      '/auth/signUp?message=Oups, une erreur est survenue, veuillez reessayer...'
    );
  }

  return redirect(
    '/auth/signIn?message=Veuillez verifier vos emails pour confirmer votre inscription.'
  );
};

export const logOutAction = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  redirect('/auth/signIn');
};

export const sendResetPasswordAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsed = sendResetPasswordSchema.safeParse(data);

  if (!parsed.success) {
    return redirect(
      '/auth/resetPassword?message=Oups, une erreur est survenue, veuillez reessayer...'
    );
  }

  const email = formData.get('email') as string;

  const supabase = createClient();
  const origin = headers().get('origin');

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/confirmResetPassword`,
  });

  if (error) {
    redirect(
      '/auth/resetPassword?message=Aucun compte ne correspond a cette adresse email.'
    );
  }

  redirect(
    '/auth/resetPassword?message=Un lien pour changer de mot de passe a bien été envoyé a votre adresse email.'
  );
};

export const confirmResetPasswordAction = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsed = confirmResetPasswordSchema.safeParse(data);

  if (!parsed.success) {
    return redirect(
      '/auth/confirmResetPassword?message=Oups, une erreur est survenue, veuillez reessayer...'
    );
  }

  const password = formData.get('password') as string;

  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    return redirect(
      '/auth/confirmResetPassword?message=Veuillez renseigner votre nouveau mot de passe.'
    );
  }

  redirect('/auth/signIn');
};

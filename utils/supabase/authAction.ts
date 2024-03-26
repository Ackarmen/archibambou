'use server';

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
      '/auth/signIn?message=Adresse email ou mot de passe incorrect.'
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
      '/auth/signUp?message=Veuillez bien renseigner tous les champs.'
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
    "/auth/signIn?message=Veuillez verifier vos emails s'il vous plaît."
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

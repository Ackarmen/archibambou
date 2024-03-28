'use client';

import GoBacklink from '@/components/GoBackLink';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SignUpSchemaType, signUpSchema } from '@/types/signUpSchema';
import { signUpAction } from '@/utils/supabase/authAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import AccountAnswer from '../AccountAnswer';

const SignUpForm = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
  });

  const onSubmit = (value: SignUpSchemaType) => {
    const formData = new FormData();
    formData.append('userName', value.userName);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('confirmpassword', value.confirmpassword);

    startTransition(() => {
      signUpAction(formData);
    });
  };

  return (
    <div className="mx-auto w-1/4">
      <GoBacklink />
      <h2 className="font-bold text-xl text-neutral-800">
        Bienvenue chez Archi Bambou !
      </h2>

      {searchParams?.message && (
        <p className="text-red-500">{searchParams.message}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d&apos;utilisateur*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="exemple@exemple.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmtion du mot de passe*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              'Créer un compte'
            )}
          </Button>
        </form>
      </Form>
      <AccountAnswer
        answer="Vous avez déjà un compte ?"
        path="/auth/signIn"
        action="Connexion"
      />
    </div>
  );
};

export default SignUpForm;

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
import { SignInSchemaType, signInSchema } from '@/types/signInSchema';
import { signInAction } from '@/utils/supabase/authAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import AccountAnswer from '../AccountAnswer';

const SignInForm = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (value: SignInSchemaType) => {
    const formData = new FormData();
    formData.append('email', value.email);
    formData.append('password', value.password);

    startTransition(() => {
      signInAction(formData);
    });
  };

  return (
    <div className="mx-auto w-1/4">
      <GoBacklink />
      <h2 className="font-bold text-xl text-neutral-800">
        Ravi de vous revoir !
      </h2>

      {searchParams?.message && (
        <p className="text-red-500">{searchParams.message}</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              'Connexion'
            )}
          </Button>
        </form>
      </Form>
      <AccountAnswer
        action="Mot de passe oublié ?"
        path="/auth/resetPassword"
      />
      <AccountAnswer
        answer="Vous n'avez pas de compte ?"
        path="/auth/signUp"
        action="Créer un compte"
      />
    </div>
  );
};

export default SignInForm;

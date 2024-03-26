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
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import AccountAnswer from '../AccountAnswer';

const SignUpForm = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmpassword: '',
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    formRef.current?.submit();
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
        <form
          ref={formRef}
          action={signUpAction}
          onSubmit={form.handleSubmit(handleSubmit)}
        >
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
          <Button type="submit" className="w-full">
            Créer un compte
          </Button>
        </form>
      </Form>
      <AccountAnswer
        answer="Vous avez déjà un compte ?"
        path="/auth/signIn"
        action="Conexion"
      />
    </div>
  );
};

export default SignUpForm;

'use client';

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
import {
  SendResetPasswordSchemaType,
  sendResetPasswordSchema,
} from '@/types/sendResetPasswordSchema';
import { sendResetPasswordAction } from '@/utils/supabase/authAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import GoBacklink from '../GoBackLink';

const SendResetPasswordForm = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SendResetPasswordSchemaType>({
    resolver: zodResolver(sendResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (value: SendResetPasswordSchemaType) => {
    const formData = new FormData();
    formData.append('email', value.email);

    startTransition(() => {
      sendResetPasswordAction(formData);
    });
  };

  return (
    <div className="mx-auto w-1/4">
      <GoBacklink />
      <h1>Réinitialisation du mot de passe</h1>
      {searchParams?.message && (
        <p className="text-red-500 text-sm">{searchParams.message}</p>
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
          <Button disabled={isPending} type="submit" className="w-full">
            {isPending ? (
              <ReloadIcon className="h-4 w-4 animate-spin" />
            ) : (
              'Envoyer'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SendResetPasswordForm;

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
  ConfirmResetPasswordSchemaType,
  confirmResetPasswordSchema,
} from '@/types/confirmResetPasswordSchema';
import { confirmResetPasswordAction } from '@/utils/supabase/authAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import GoBacklink from '../GoBackLink';

const ConfirmResetPasswordForm = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ConfirmResetPasswordSchemaType>({
    resolver: zodResolver(confirmResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (value: ConfirmResetPasswordSchemaType) => {
    const formData = new FormData();
    formData.append('password', value.password);
    formData.append('confirmPassword', value.confirmPassword);

    startTransition(() => {
      confirmResetPasswordAction(formData);
    });
  };

  return (
    <div className="mx-auto w-1/4">
      <GoBacklink />
      <h1>Nouveau mot de passe</h1>
      {searchParams?.message && (
        <p className="text-red-500 text-sm">{searchParams.message}</p>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nouveau mot de passe*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="*********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmez votre nouveau mot de passe*</FormLabel>
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
              'Confirmer'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ConfirmResetPasswordForm;

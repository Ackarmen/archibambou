import ConfirmResetPasswordForm from '@/components/form/ConfirmResetPasswordForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const ConfirmResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/signIn');
  }

  return (
    <div className="flex items-center h-screen justify-center">
      <ConfirmResetPasswordForm searchParams={searchParams} />
    </div>
  );
};

export default ConfirmResetPasswordPage;

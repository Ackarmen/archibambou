import SendResetPasswordForm from '@/components/form/SendResetPasswordForm';

const ResetPasswordPage = async ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  return (
    <div className="flex items-center h-screen justify-center">
      <SendResetPasswordForm searchParams={searchParams} />
    </div>
  );
};

export default ResetPasswordPage;

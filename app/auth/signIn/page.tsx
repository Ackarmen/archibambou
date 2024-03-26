import SignInForm from '@/components/form/SignInForm';
import bambouLoginImage from '@/public/bambouLogin.jpg';
import Image from 'next/image';

const SignInPage = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  return (
    <div className="flex items-center">
      <Image
        src={bambouLoginImage}
        alt="image bambou"
        width={800}
        className="object-cover h-screen"
      />
      <SignInForm searchParams={searchParams} />
    </div>
  );
};

export default SignInPage;

import SignUpForm from '@/components/form/SignUpForm';
import bambouSignUpImage from '@/public/bambouSignUp.jpg';
import Image from 'next/image';

const SignUpPage = ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  return (
    <div className="flex flex-row-reverse items-center">
      <Image
        src={bambouSignUpImage}
        alt="image bambou"
        width={800}
        className="object-cover h-screen"
      />
      <SignUpForm searchParams={searchParams} />
    </div>
  );
};

export default SignUpPage;

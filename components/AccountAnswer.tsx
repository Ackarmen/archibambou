import Link from 'next/link';

type AccountCheckProps = {
  answer: string;
  action: string;
  path: string;
};

const AccountAnswer = ({ answer, action, path }: AccountCheckProps) => {
  return (
    <div className="flex items-center justify-center">
      <p>{answer}</p>
      <Link href={path}>
        <span className="ml-3 underline underline-offset-2 decoration-primary">
          {action}
        </span>
      </Link>
    </div>
  );
};

export default AccountAnswer;

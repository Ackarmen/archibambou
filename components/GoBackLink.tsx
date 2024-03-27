import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const GoBacklink = () => {
  return (
    <div className="ml-[-4px] w-fit">
      <Link
        className="flex items-center text-gray-900 text-sm underline underline-offset-2"
        href="/"
      >
        <ChevronLeft size={17} /> Page d&apos;accueil
      </Link>
    </div>
  );
};

export default GoBacklink;

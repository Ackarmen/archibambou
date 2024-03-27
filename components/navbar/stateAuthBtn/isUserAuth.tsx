import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import LogOutAction from '../logOutAction/LogOutAction';

const IsUserAuth = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      {!user ? (
        <div>
          <Link
            className="mr-4 rounded-md px-4 py-2 h-9 text-sm font-medium border border-primary bg-transparent text-gray-300 shadow-sm hover:bg-primary/20 transition"
            href="/auth/signUp"
          >
            Créer un compte
          </Link>
          <Link
            className="rounded-md px-4 py-2 h-9 text-sm font-medium bg-primary text-gray-300 shadow hover:bg-primary/80 transition"
            href="/auth/signIn"
          >
            Conexion
          </Link>
        </div>
      ) : (
        <div>
          <p>Hey, {user.email} !</p>
          <LogOutAction />
        </div>
      )}
    </div>
  );
};

export default IsUserAuth;

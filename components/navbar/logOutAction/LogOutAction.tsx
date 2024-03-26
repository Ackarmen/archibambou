import { logOutAction } from '@/utils/supabase/authAction';
import { Button } from '../../ui/button';

const LogOutAction = () => {
  return (
    <form>
      <Button formAction={logOutAction}>Déconexion</Button>
    </form>
  );
};

export default LogOutAction;

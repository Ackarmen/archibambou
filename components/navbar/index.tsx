import NavigationsMenu from './navMenu/navigation-menu';
import IsUserAuth from './stateAuthBtn/isUserAuth';

const Navbar = () => {
  return (
    <nav className="absolute top-0 z-20 w-full flex items-center p-4 backdrop-blur-xl shadow-lg">
      <div className="flex-1">
        <NavigationsMenu />
      </div>
      <IsUserAuth />
    </nav>
  );
};

export default Navbar;

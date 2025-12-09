import { useEffect, useRef, useState } from 'react';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth';

export default function Nav({ res }) {
  const { user, openModal } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  

  useEffect(() => {
    if (!router.isReady) return;

    if (router.asPath.includes("#resetpassword")) {
      const hash = router.asPath.split("#")[1];
      let token = null;

      if (hash) {
        const params = new URLSearchParams(hash.split("?")[1]);
        token = params.get("token");
      }

      if (token) {
        openModal("changePassword", { token });
        router.replace("/", undefined, { shallow: true });
      }
    }
    if(router.asPath.includes('#verify')){
      const hash = router.asPath.split("#")[1];
      let token = null;

      if (hash) {
        const params = new URLSearchParams(hash.split("?")[1]);
        token = params.get("token");
      }

      if (token) {
        openModal("login", { token });
        router.replace("/", undefined, { shallow: true });
      }
    }
  }, [router.isReady]);

  // ... menu logic here ...
    const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => setIsVisible(false), 300);
    } else {
      setIsVisible(true);
      setTimeout(() => setMenuOpen(true), 10);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[101] bg-black flex justify-between items-center h-20 px-4 lg:px-16">
        <Logo logo={res} />
        <div className="lg:hidden">
          <MenuToggle menuOpen={menuOpen} toggleMenu={toggleMenu} buttonRef={buttonRef} />
        </div>
        <DesktopMenu
          links={res.links}
          res={res}
          user={user}
          onLogin={() => openModal("login")}
        />
      </div>
      <MobileMenu
        isVisible={isVisible}
        menuOpen={menuOpen}
        menuRef={menuRef}
        links={res.links}
        res={res}
        toggleMenu={toggleMenu}
        user={user}
        onLogin={() => openModal("login")}
      />
      <div className="h-10" />
    </>
  );
}

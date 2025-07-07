import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Logo from './Logo';
import MenuToggle from './MenuToggle';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

export default function Nav({ res, onExpertiseClick }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
      setTimeout(() => setIsVisible(false), 300);
    } else {
      setIsVisible(true);
      setTimeout(() => setMenuOpen(true), 10);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        toggleMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const handleExpertise = async () => {
    toggleMenu();
    if (router.pathname !== '/') {
      const handleRouteDone = () => {
        setTimeout(() => {
          if (typeof onExpertiseClick === 'function') onExpertiseClick();
        }, 200);
        router.events.off('routeChangeComplete', handleRouteDone);
      };
      router.events.on('routeChangeComplete', handleRouteDone);
      await router.push('/');
    } else {
      setTimeout(() => {
        if (typeof onExpertiseClick === 'function') onExpertiseClick();
      }, 200);
    }
  };

  

  if (!res) return null;
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[101] bg-black flex justify-between items-center h-20 px-4 lg:px-16">
        <Logo logo={res} />
        <div className="lg:hidden">
          <MenuToggle menuOpen={menuOpen} toggleMenu={toggleMenu} buttonRef={buttonRef} />
        </div>
        <DesktopMenu links={res.links} animation={res}  onExpertiseClick={handleExpertise} />
      </div>
      <MobileMenu
        isVisible={isVisible}
        menuOpen={menuOpen}
        menuRef={menuRef}
        links={res.links}
        animation={res}
        toggleMenu={toggleMenu}
        onExpertiseClick={handleExpertise}
       
      />
      <div className="h-10" />
    </>
  );
}

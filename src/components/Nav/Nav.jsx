import { useEffect, useRef, useState } from 'react';

import Logo from './Logo';
import MenuToggle from './MenuToggle';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';


export default function Nav({ res }) {
  

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

  

  

  if (!res) return null;
  return (
    <>
      <div className=" fixed top-0 left-0 w-full z-[101] bg-black flex justify-between items-center h-20 px-4 lg:px-16">
        <div className='flex items-center '>
          <Logo logo={res} />
          
        </div>
        <div className="lg:hidden">
          <MenuToggle menuOpen={menuOpen} toggleMenu={toggleMenu} buttonRef={buttonRef} />
        </div>
        <DesktopMenu links={res.links} partners={res.agencies}   />
      </div>
      <MobileMenu
        isVisible={isVisible}
        menuOpen={menuOpen}
        menuRef={menuRef}
        links={res.links}
        
        toggleMenu={toggleMenu}
        
       
      />
      <div className="h-10" />
    </>
  );
}

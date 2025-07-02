import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';

export default function MobileMenu({ isVisible, menuOpen, menuRef, links, animation, toggleMenu, onExpertiseClick }) {
  return isVisible ? (
    <div
      ref={menuRef}
      className={`fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-black z-[100] flex flex-col items-start px-8 py-6 gap-6 lg:hidden transition-opacity overflow-y-auto duration-300 ease-in-out ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button onClick={onExpertiseClick} className="capitalize py-2 text-white" data-tina-field={tinaField(animation, 'animation')}>
        {animation.animation}
      </button>
      {links?.map((link, i) => (
        <div key={i} className="flex flex-col w-full">
          <Link href={link.link} onClick={toggleMenu} className="capitalize py-2 text-white" data-tina-field={tinaField(link, 'label')}>
            {link.label}
          </Link>
          
          {link.link == '/careers' && (
                <div className="ml-4">
                    <div className="text-sm text-white py-1">Benefits</div>
                    <div className="text-sm text-white py-1">Jobs</div>
                </div>
            )}
              
        </div>
      ))}
    </div>
  ) : null;
}

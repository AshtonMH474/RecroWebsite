// import { useEffect, useRef, useState } from 'react';

// import Logo from './Logo';
// import MenuToggle from './MenuToggle';
// import DesktopMenu from './DesktopMenu';
// import MobileMenu from './MobileMenu';
// import Login from '../Login';
// import Register from '../Register';
// import NewPasswordModal from '../New-Password';
// import ChangePassword from '../ChangePassword';
// import { useRouter } from 'next/router';
// import { useAuth } from '@/context/auth';


// export default function Nav({ res }) {
//   const { user, setUser, showLoginModal,setShowLoginModal,showRegisterModal,setRegisterModal,showNewPassword,setNewPassword  } = useAuth();
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const menuRef = useRef(null);
//   const buttonRef = useRef(null);

//   const [showResetPassword,setResetPassword] = useState(false)
//   const [token,setToken] = useState('')
//   const router = useRouter(); 

//   useEffect(() => {
//     if (!router.isReady) return;

//     if (router.asPath.includes("#resetpassword")) {
//       const hash = router.asPath.split("#")[1]; // "resetpassword?token=abcd"
//       let t= null;

//       if (hash) {
//         const params = new URLSearchParams(hash.split("?")[1]);
//         t = params.get("token");
//       }

//       if (t) {
//         setToken(t);
//         setResetPassword(true);

//         // ✅ Replace the URL inside Next.js router too
//         router.replace("/", undefined, { shallow: true });
//       }
//     }
//   }, [router.isReady]);





 

//   const toggleMenu = () => {
//     if (menuOpen) {
//       setMenuOpen(false);
//       setTimeout(() => setIsVisible(false), 300);
//     } else {
//       setIsVisible(true);
//       setTimeout(() => setMenuOpen(true), 10);
//     }
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         toggleMenu();
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [menuOpen]);

  

  

//   if (!res) return null;
  
//   return (
//     <>
//       <div className=" fixed top-0 left-0 w-full z-[101] bg-black flex justify-between items-center h-20 px-4 lg:px-16">
//         <div className='flex items-center '>
//           <Logo logo={res} />
          
//         </div>
//         <div className="lg:hidden">
//           <MenuToggle menuOpen={menuOpen} toggleMenu={toggleMenu} buttonRef={buttonRef} />
//         </div>
//         <DesktopMenu links={res.links} res={res} user={user} setShowLoginModal={setShowLoginModal} setUser={setUser}  />
//       </div>
//       <MobileMenu
//         isVisible={isVisible}
//         menuOpen={menuOpen}
//         menuRef={menuRef}
//         links={res.links}
//         res={res}
//         toggleMenu={toggleMenu}
//         setUser={setUser}
//         user={user}
       
//       />
//       <div className="h-10" />
//       {showLoginModal && (
//           <Login 
//             onClose={() => setShowLoginModal(false)} 
//             setUser={setUser}
//             setRegisterModal={setRegisterModal}
//             setNewPassword={setNewPassword}
//           />
//         )}


//         {showRegisterModal && (
//           <Register onClose={() => setRegisterModal(false)} setShowLoginModal={setShowLoginModal} />
//         )}
//         {showNewPassword && (
//           <NewPasswordModal onClose={() => setNewPassword(false)}  setShowLoginModal={setShowLoginModal}/>
//         )}
//         {showResetPassword && (
//           <ChangePassword token={token} onClose={() => setResetPassword(false)}/>
//         )}

//     </>
//   );
// }

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


// import { useEffect, useRef, useState } from 'react'
// import Link from 'next/link'
// import { tinaField } from 'tinacms/dist/react'
// import { useRouter } from 'next/router'

// export default function Nav({ res, onExpertiseClick }) {
//   const router = useRouter()
//   const [menuOpen, setMenuOpen] = useState(false)
//   const menuRef = useRef(null)
//   const buttonRef = useRef(null)

//   const toggleMenu = () => setMenuOpen(prev => !prev)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         menuRef.current &&
//         !menuRef.current.contains(event.target) &&
//         buttonRef.current &&
//         !buttonRef.current.contains(event.target)
//       ) {
//         setMenuOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//  const handleExpertise = async () => {
//   toggleMenu()

//   if (router.pathname !== '/') {
//     const handleRouteDone = () => {
//       setTimeout(() => {
//         if (typeof onExpertiseClick === 'function') {
//           onExpertiseClick()
//         }
//       }, 200) // 👈 Adjust delay if needed (200ms is a safe starting point)
//       router.events.off('routeChangeComplete', handleRouteDone)
//     }

//     router.events.on('routeChangeComplete', handleRouteDone)
//     await router.push('/')
//   } else {
//     setTimeout(() => {
//       if (typeof onExpertiseClick === 'function') {
//         onExpertiseClick()
//       }
//     }, 200)
//   }
// }

//   if (!res) return null

//   return (
//     <div className="z-[101] bg-black w-full flex flex-col lg:flex-row justify-between lg:items-center nav p-0">
//       <div className='flex justify-between items-center'>
//         <div data-tina-field={tinaField(res, 'logo')}>
//           <Link href={'/'}>
//             <img className="h-20 lg:h-30 cursor-pointer pl-4 lg:pl-16" src={res.logo} alt="logo" />
//           </Link>
//         </div>

//         <div className="lg:hidden ml-auto pb-4 pr-4 flex items-center h-full">
//           <button
//             ref={buttonRef}
//             onClick={toggleMenu}
//             className="text-white text-[30px] px-3 pt-2 rounded"
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       <div
//         ref={menuRef}
//         className={`transition-all duration-500 ease-in-out overflow-hidden
//           flex flex-col lg:flex-row items-start lg:items-center
//           gap-4 md:gap-x-8
//           pl-8 md:pl-0
//           pb-0
//           md:pr-16
//           mt-2 md:mt-0
//           ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
//           lg:max-h-none lg:opacity-100 lg:overflow-visible
//         `}
//       >
//         <div data-tina-field={tinaField(res, 'animation')}>
//           <button
//             onClick={handleExpertise}
//             className="capitalize py-2 cursor-pointer text-white"
//           >
//             {res.animation}
//           </button>
//         </div>

//         {res.links?.map((link, i) =>
//           link.style === 'link' && link.link ? (
//             <Link
//               key={i}
//               href={link.link}
//               onClick={toggleMenu}
//               data-tina-field={tinaField(res.links[i], 'label')}
//               className="capitalize py-2 cursor-pointer text-white"
//             >
//               {link.label}
//             </Link>
//           ) : link.style === 'button' && link.link ? (
//             <button
//               key={i}
//               onClick={toggleMenu}
//               data-tina-field={tinaField(res.links[i], 'label')}
//               className="bg-primary text-white cursor-pointer w-auto px-8 py-2 rounded hover:opacity-80 capitalize"
//             >
//               {link.label}
//             </button>
//           ) : null
//         )}
//       </div>
//     </div>
//   )
// }



import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { tinaField } from 'tinacms/dist/react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'

export default function Nav({ res, onExpertiseClick }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const toggleMenu = () => setMenuOpen(prev => !prev)

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Handle special expertise button logic
  const handleExpertise = async () => {
    toggleMenu()
    if (router.pathname !== '/') {
      const handleRouteDone = () => {
        setTimeout(() => {
          if (typeof onExpertiseClick === 'function') {
            onExpertiseClick()
          }
        }, 200)
        router.events.off('routeChangeComplete', handleRouteDone)
      }
      router.events.on('routeChangeComplete', handleRouteDone)
      await router.push('/')
    } else {
      setTimeout(() => {
        if (typeof onExpertiseClick === 'function') {
          onExpertiseClick()
        }
      }, 200)
    }
  }

  if (!res) return null

  return (
    <>
      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full z-[101] bg-black flex justify-between items-center h-20 px-4 lg:px-16">
        {/* Logo */}
        <div className='pl-4 lg:pl-0' data-tina-field={tinaField(res, 'logo')}>
          <Link href="/">
            <img className="h-20 lg:h-30 cursor-pointer" src={res.logo} alt="logo" />
          </Link>
        </div>

        {/* Menu Icon (Mobile) */}
        <div className="lg:hidden">
         <button
  ref={buttonRef}
  onClick={toggleMenu}
  aria-label="Toggle menu"
  className="flex flex-col justify-center items-center w-10 h-10 relative z-[200]"
>
  <span
    className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
      menuOpen ? 'rotate-45 translate-y-[7px]' : ''
    }`}
  ></span>
  <span
    className={`block w-6 h-[2px] bg-white my-[6px] transition-all duration-300 ${
      menuOpen ? 'opacity-0' : ''
    }`}
  ></span>
  <span
    className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
      menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
    }`}
  ></span>
</button>

        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          <button
            onClick={handleExpertise}
            className="capitalize py-2 cursor-pointer text-white"
            data-tina-field={tinaField(res, 'animation')}
          >
            {res.animation}
          </button>

          {res.links?.map((link, i) =>
            link.style === 'link' ? (
              <Link
                key={i}
                href={link.link}
                className="capitalize py-2 cursor-pointer text-white"
                data-tina-field={tinaField(res.links[i], 'label')}
              >
                {link.label}
              </Link>
            ) : link.style === 'button' ? (
              <button
                key={i}
                onClick={toggleMenu}
                className="bg-primary text-white px-8 py-2 rounded hover:opacity-80 capitalize"
                data-tina-field={tinaField(res.links[i], 'label')}
              >
                {link.label}
              </button>
            ) : null
          )}
        </div>
      </div>

      {/* MOBILE MENU */}
     
      {menuOpen && (
        <div
      
          ref={menuRef}
          className="fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-black z-[100] flex flex-col items-start px-8 py-6 gap-6 lg:hidden transition-all duration-500 ease-in-out"
        >
          <button
            onClick={handleExpertise}
            className="capitalize py-2 text-white"
            data-tina-field={tinaField(res, 'animation')}
          >
            {res.animation}
          </button>

          {res.links?.map((link, i) =>
            link.style === 'link' ? (
              <Link
                key={i}
                href={link.link}
                onClick={toggleMenu}
                className="capitalize py-2 text-white  w-full  "
                data-tina-field={tinaField(res.links[i], 'label')}
              >
                {link.label}
              </Link>
            ) : link.style === 'button' ? (
              <button
                key={i}
                onClick={toggleMenu}
                className="bg-primary text-white px-8 py-2 rounded hover:opacity-80 capitalize"
                data-tina-field={tinaField(res.links[i], 'label')}
              >
                {link.label}
              </button>
            ) : null
          )}
        </div>
      )}
     

      
      <div className="h-10" />
    </>
  )
} 

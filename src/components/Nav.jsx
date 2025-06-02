// const { default: Link } = require("next/link");
// import { tinaField } from 'tinacms/dist/react';




// export default function Nav({res}){
//     if (!res) return null;
    
//     return (
//         <div className="bg-black w-full flex justify-between items-center nav">
//             <div data-tina-field={tinaField(res,'logo')}><img className='h-30 pl-16 cursor-pointer' src={res.logo} alt="logo"/></div>
//             <div className='flex gap-x-8 items- pr-16'>
//                 {res.links?.map((link, i) =>
//                     link.style == 'link' && link.link ? (
//                         <Link key={i} data-tina-field={tinaField(res.links[i], 'label')} className='capitalize py-2 cursor-pointer' href={link.link}>{link.label}</Link>
//                     ) : link.style == 'button' && link.link ? (
//                         <button key={i} data-tina-field={tinaField(res.links[i], 'label')} className='bg-primary cursor-pointer px-4 py-2 w-30 rounded hover:opacity-80 capitalize'>{link.label}</button>
//                     ) : null
//                 )}
//             </div>
//         </div>
//     )
// }

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { tinaField } from 'tinacms/dist/react'

export default function Nav({ res }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const toggleMenu = () => setMenuOpen(prev => !prev)

  // Close on outside click
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!res) return null

  return (
    <div className="bg-black w-full flex flex-col md:flex-row justify-between md:items-center nav p-0">
        <div className='flex justify-between items-center'>
            <div data-tina-field={tinaField(res, 'logo')}>
                {/* h-30 pl-16 cursor-pointer */}
                <img className="h-30 cursor-pointer pl-4 md:pl-16" src={res.logo} alt="logo" />
            </div>

            {/* Hamburger Button */}
            <div className="md:hidden ml-auto pr-4 flex items-center h-full">

                <button
                ref={buttonRef}
                onClick={toggleMenu}
                className="text-white text-[30px]  px-3 py-2 rounded"
                >
                ☰
                </button>
            </div>
      </div>

      {/* Nav Links */}
      <div
        ref={menuRef}
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } flex-col pl-8 md:pl-0 pb-4 md:pb-0 md:flex md:flex-row gap-4 md:gap-x-8 items-start md:items-center md:pr-16 mt-2 md:mt-0`}
      >
        {res.links?.map((link, i) =>
          link.style === 'link' && link.link ? (
            <Link
              key={i}
              data-tina-field={tinaField(res.links[i], 'label')}
              className="capitalize py-2 cursor-pointer text-white"
              href={link.link}
            >
              {link.label}
            </Link>
          ) : link.style === 'button' && link.link ? (
            <button
              key={i}
              data-tina-field={tinaField(res.links[i], 'label')}
            //   bg-primary cursor-pointer px-4 py-2 w-30 rounded hover:opacity-80 capitalize
              className="bg-primary text-white cursor-pointer w-30 px-4 py-2 rounded hover:opacity-80 capitalize"
            >
              {link.label}
            </button>
          ) : null
        )}
      </div>
    </div>
  )
}


// import { useEffect, useRef, useState } from 'react'
// import Link from 'next/link'
// import { tinaField } from 'tinacms/dist/react'

// export default function Nav({ res }) {
//   const [menuOpen, setMenuOpen] = useState(false)
//   const menuRef = useRef(null)
//   const buttonRef = useRef(null)

//   const toggleMenu = () => setMenuOpen(prev => !prev)

//   // Close on outside click
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

//   if (!res) return null

//   return (
//     <div className="bg-black w-full p-4 md:px-16 md:py-4">
//       {/* Top bar: logo + hamburger button */}
//       <div className="w-full flex justify-between items-center md:items-center">
//         <div data-tina-field={tinaField(res, 'logo')}>
//           <img className="h-10 cursor-pointer" src={res.logo} alt="logo" />
//         </div>

//         <div className="md:hidden">
//           <button
//             ref={buttonRef}
//             onClick={toggleMenu}
//             className="text-white border border-white/50 px-3 py-2 rounded"
//           >
//             ☰
//           </button>
//         </div>
//       </div>

//       {/* Nav Links */}
//       <div
//         ref={menuRef}
//         className={`${
//           menuOpen ? 'flex' : 'hidden'
//         } flex-col md:flex md:flex-row gap-4 md:gap-x-8 items-start md:items-center md:justify-end mt-4 md:mt-0`}
//       >
//         {res.links?.map((link, i) =>
//           link.style === 'link' && link.link ? (
//             <Link
//               key={i}
//               data-tina-field={tinaField(res.links[i], 'label')}
//               className="capitalize py-2 cursor-pointer text-white"
//               href={link.link}
//             >
//               {link.label}
//             </Link>
//           ) : link.style === 'button' && link.link ? (
//             <button
//               key={i}
//               data-tina-field={tinaField(res.links[i], 'label')}
//               className="bg-primary text-white cursor-pointer px-4 py-2 rounded hover:opacity-80 capitalize"
//             >
//               {link.label}
//             </button>
//           ) : null
//         )}
//       </div>
//     </div>
//   )
// }


import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { tinaField } from 'tinacms/dist/react'

export default function Nav({ res, onExpertiseClick }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const toggleMenu = () => setMenuOpen(prev => !prev)

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
          <img className="h-20 md:h-30 cursor-pointer pl-4 md:pl-16" src={res.logo} alt="logo" />
        </div>

        <div className="md:hidden ml-auto pb-4 pr-4 flex items-center h-full">
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            className="text-white text-[30px] px-3 pt-2 rounded"
          >
            ☰
          </button>
        </div>
      </div>

    <div
  ref={menuRef}
  className={`transition-all duration-500 ease-in-out overflow-hidden
    flex flex-col md:flex-row items-start md:items-center
    gap-4 md:gap-x-8
    pl-8 md:pl-0
    pb-0
    md:pr-16
    mt-2 md:mt-0
    ${menuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
    md:max-h-none md:opacity-100 md:overflow-visible
  `}
>
        <div data-tina-field={tinaField(res, 'animation')}><button  onClick={() => {
            toggleMenu()
            onExpertiseClick()
        }} className="capitalize py-2 cursor-pointer text-white">{res.animation}</button></div>

        {res.links?.map((link, i) =>
          link.style === 'link' && link.link ? (
            <Link
                onClick={toggleMenu}
              key={i}
              data-tina-field={tinaField(res.links[i], 'label')}
              className="capitalize py-2 cursor-pointer text-white"
              href={link.link}
            >
              {link.label}
            </Link>
          ) : link.style === 'button' && link.link ? (
            <button
                onClick={toggleMenu}
              key={i}
              data-tina-field={tinaField(res.links[i], 'label')}
              className="bg-primary text-white cursor-pointer w-auto px-8 py-2 rounded hover:opacity-80 capitalize"
            >
              {link.label}
            </button>
          ) : null
        )}
      </div>
    </div>
  )
}


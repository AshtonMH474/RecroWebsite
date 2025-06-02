'use client'
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
    <div className="bg-black w-full flex flex-col md:flex-row justify-between items-start md:items-center nav p-4 md:p-0">
      <div data-tina-field={tinaField(res, 'logo')}>
        <img className="h-10 cursor-pointer pl-2 md:pl-16" src={res.logo} alt="logo" />
      </div>

      {/* Hamburger Button */}
      <div className="md:hidden ml-auto pr-4">
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="text-white focus:outline-none border border-white/50 px-3 py-2 rounded"
        >
          ☰
        </button>
      </div>

      {/* Nav Links */}
      <div
        ref={menuRef}
        className={`${
          menuOpen ? 'flex' : 'hidden'
        } flex-col md:flex md:flex-row gap-4 md:gap-x-8 items-start md:items-center md:pr-16 mt-2 md:mt-0`}
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
              className="bg-primary text-white cursor-pointer px-4 py-2 rounded hover:opacity-80 capitalize"
            >
              {link.label}
            </button>
          ) : null
        )}
      </div>
    </div>
  )
}

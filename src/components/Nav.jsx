
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { tinaField } from 'tinacms/dist/react'
import { useRouter } from 'next/router'

export default function Nav({ res, onExpertiseClick }) {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false)
      setTimeout(() => setIsVisible(false), 300) // wait for fade-out
    } else {
      setIsVisible(true)
      setTimeout(() => setMenuOpen(true), 10) // short delay to allow transition
    }
  }

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        toggleMenu()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])


  const handleExpertise = async () => {
    toggleMenu()
    if (router.pathname !== '/') {
      const handleRouteDone = () => {
        setTimeout(() => {
          if (typeof onExpertiseClick === 'function') onExpertiseClick()
        }, 200)
        router.events.off('routeChangeComplete', handleRouteDone)
      }
      router.events.on('routeChangeComplete', handleRouteDone)
      await router.push('/')
    } else {
      setTimeout(() => {
        if (typeof onExpertiseClick === 'function') onExpertiseClick()
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            ref={buttonRef}
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="flex flex-col justify-center items-center w-10 h-10 relative z-[200]"
          >
            <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white my-[6px] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
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
              <Link key={i} href={link.link} className="capitalize py-2 cursor-pointer text-white" data-tina-field={tinaField(res.links[i], 'label')}>
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
      {isVisible && (
        <div
          ref={menuRef}
          className={`fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-black z-[100] flex flex-col items-start px-8 py-6 gap-6 lg:hidden transition-opacity overflow-y-auto duration-300 ease-in-out ${
            menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
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
                className="capitalize py-2 text-white w-full"
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

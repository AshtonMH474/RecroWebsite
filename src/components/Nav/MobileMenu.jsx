import { useState } from "react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { handleLogin, handleSignout } from "@/lib/auth_functions";

// Small component for fading + / − toggle
function PlusMinusToggle({ isOpen }) {
  return (
    <span className="relative inline-block w-5 h-5 text-white">
      <span
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden={isOpen}
      >
        +
      </span>
      <span
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden={!isOpen}
      >
        &minus;
      </span>
    </span>
  );
}

export default function MobileMenu({
  isVisible,
  menuOpen,
  menuRef,
  links,
  toggleMenu,
  setUser,
  user,
  res
}) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

  const toggleDropdown = (i) => {
    setOpenDropdownIndex((prev) => (prev === i ? null : i));
  };

  const handleTopLinkClick = (link) => {
    if (typeof window === "undefined") return;

    toggleMenu(); // Always close the menu after clicking

    if (link.linkOptions?.id) {
      if (window.location.pathname !== link.link) {
        window.location.href = `${link.link.replace(/^\/?/, "/")}#${link.linkOptions?.id}`;
      } else {
        
        const el = document.getElementById(link.linkOptions?.id);
        el?.scrollIntoView({ behavior: "smooth", block: link.linkOptions?.scrollPosition || "start" });
      }
    } else {
      window.location.href = link.link;
    }
  };

  const handleSublinkClick = (link, sublink) => {
    if (typeof window === "undefined") return;

    toggleMenu(); // Close mobile menu on click

    if (sublink.linkOptions?.id) {
      if (window.location.pathname !== link.link) {
        window.location.href = `${link.link.replace(/^\/?/, "/")}#${sublink.linkOptions?.id}`;
      } else {
        const el = document.getElementById(sublink.linkOptions?.id);
        el?.scrollIntoView({ behavior: "smooth", block: sublink.linkOptions?.scrollPosition || "start" });
      }
    } else if (sublink.link) {
      window.location.href = sublink.link;
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className={`pb-10 fixed top-20 left-0 w-full h-[calc(100vh-80px)] bg-black z-[100] flex flex-col items-start px-8 py-6 gap-6 lg:hidden transition-opacity overflow-y-auto duration-300 ease-in-out ${
        menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {links?.map((link, i) => {
        const hasSublinks = link.sublinks?.length > 0;

        if (link.style === "button") {
          return (
            <button
              key={i}
              onClick={() => {
                toggleMenu();
                handleTopLinkClick(link);
              }}
              className="bg-primary text-white px-8 py-2 rounded hover:opacity-80 capitalize w-auto text-left"
              data-tina-field={tinaField(link, "label")}
            >
              {link.label}
            </button>
          );
        }

        return (
          <div key={i} className="flex flex-col w-full">
            <div className="flex justify-between items-center w-full">
              <button
                onClick={() => handleTopLinkClick(link)}
                className="capitalize py-2 text-white text-left"
                data-tina-field={tinaField(link, "label")}
              >
                {link.label}
              </button>

              {hasSublinks && (
                <button
                  onClick={() => toggleDropdown(i)}
                  aria-expanded={openDropdownIndex === i}
                  aria-controls={`submenu-${i}`}
                  className="text-white px-2 py-1 flex justify-center items-center"
                >
                  <PlusMinusToggle isOpen={openDropdownIndex === i} />
                </button>
              )}
            </div>

            {hasSublinks && openDropdownIndex === i && (
              <div id={`submenu-${i}`} className="ml-1 flex flex-col">
                {link.sublinks.map((sublink, j) =>
                  sublink.linkOptions?.id && sublink.linkOptions?.type == 'id' ? (
                    <button
                      key={j}
                      onClick={() => handleSublinkClick(link, sublink)}
                      className="w-full capitalize text-left  py-2 text-sm text-white hover:bg-primary transition-colors"
                      data-tina-field={tinaField(sublink,'label')}
                    >
                      {sublink.label}
                    </button>
                  ) : (
                    <Link
                      key={j}
                      href={sublink.linkOptions?.link || "#"}
                      onClick={toggleMenu}
                      className=" capitalize  py-2 text-sm text-white hover:bg-primary transition-colors"
                      data-tina-field={tinaField(sublink,'label')}
                    >
                      {sublink.label}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        );
      })}
      {res?.authStyle == 'button' && !user && (
              <button onClick={() => handleLogin(setUser)} data-tina-field={tinaField(res,'authLabelLogin')} className="bg-primary text-white px-8 py-2 rounded hover:opacity-80 capitalize cursor-pointer">{res.authLabelLogin}</button>
      )}
      {res?.authStyle == 'border' && !user && (
              <button onClick={() => handleLogin(setUser)} data-tina-field={tinaField(res,'authLabelLogin')} className="px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300">{res.authLabelLogin}</button>
      )}
      {res?.authStyle == 'button' && user && (
              <button onClick={() => handleSignout(setUser)} data-tina-field={tinaField(res,'authLabelSignout')} className="bg-primary text-white px-8 py-2 rounded hover:opacity-80 capitalize cursor-pointer">{res.authLabelSignout}</button>
      )}
      {res?.authStyle == 'border' && user && (
              <button onClick={() => handleSignout(setUser)} data-tina-field={tinaField(res,'authLabelSignout')} className="px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300">{res.authLabelSignout}</button>
      )}
    </div>
  );
}

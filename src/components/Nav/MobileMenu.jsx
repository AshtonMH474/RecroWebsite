import { useState } from "react";
import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import { handleSignout } from "@/lib/auth_functions";
import { useAuth } from "@/context/auth";
import { handleIdScroll } from "@/utils/navigationHelpers";
import AuthButtons from "./AuthButtons";

/* ---------------------------------------------
   Small +/− Toggle with Smooth Fade Animation
--------------------------------------------- */
function PlusMinusToggle({ isOpen }) {
  return (
    <span className="relative inline-block w-5 h-5 text-white">
      {/* + icon */}
      <span
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      >
        +
      </span>

      {/* − icon */}
      <span
        className={`absolute inset-0 flex justify-center items-center transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        &minus;
      </span>
    </span>
  );
}

/* ---------------------------------------------
   Mobile Menu Component
--------------------------------------------- */
export default function MobileMenu({
  isVisible,
  menuOpen,
  menuRef,
  links,
  toggleMenu,
  res,
  user,
}) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const { openModal, setUser } = useAuth();

  /* ---------------------------------------------
     Toggle a dropdown open/closed
  --------------------------------------------- */
  const toggleDropdown = (i) => {
    setOpenDropdownIndex((prev) => (prev === i ? null : i));
  };

  /* ---------------------------------------------
     Handle clicking a TOP-LEVEL link
  --------------------------------------------- */
  const handleTopLinkClick = (link) => {
    if (typeof window === "undefined") return;

    toggleMenu();

    // ID-based scroll navigation
    if (link.linkOptions?.id) {
      handleIdScroll(
        link.link,
        link.linkOptions.id,
        link.linkOptions?.scrollPosition || "start"
      );
      return;
    }

    // Normal link
    window.location.href = link.link;
  };

  /* ---------------------------------------------
     Handle clicking a SUBLINK
  --------------------------------------------- */
  const handleSublinkClick = (link, sublink) => {
    if (typeof window === "undefined") return;

    toggleMenu();

    // ID-based scroll navigation
    if (sublink.linkOptions?.id) {
      handleIdScroll(
        link.link,
        sublink.linkOptions.id,
        sublink.linkOptions?.scrollPosition || "start"
      );
      return;
    }

    // Normal link
    if (sublink.link) window.location.href = sublink.link;
  };

  if (!isVisible) return null;

  return (
    <div
      ref={menuRef}
      className={`
        pb-10 fixed top-20 left-0 w-full 
        h-[calc(100vh-80px)] bg-black z-[100] 
        flex flex-col items-start px-8 py-6 gap-6 lg:hidden 
        transition-opacity duration-300 ease-in-out 
        overflow-y-auto
        ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
      `}
    >
      {/* ---------------------------------------------
         Navigation Links
      --------------------------------------------- */}
      {links?.map((link, i) => {
        const hasSublinks = link.sublinks?.length > 0;

        /* ---------------------------------------------
           BUTTON link style
        --------------------------------------------- */
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

        /* ---------------------------------------------
           NORMAL link + optional dropdown
        --------------------------------------------- */
        return (
          <div key={i} className="flex flex-col w-full">
            {/* Top-level row */}
            <div className="flex justify-between items-center w-full">
              <button
                onClick={() => handleTopLinkClick(link)}
                className="capitalize py-2 text-white text-left"
                data-tina-field={tinaField(link, "label")}
              >
                {link.label}
              </button>

              {/* Dropdown toggle button */}
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

            {/* Sublinks */}
            {hasSublinks && openDropdownIndex === i && (
              <div id={`submenu-${i}`} className="ml-1 flex flex-col">
                {link.sublinks.map((sublink, j) => {
                  const isIdLink =
                    sublink.linkOptions?.id &&
                    sublink.linkOptions?.type === "id";

                  return isIdLink ? (
                    <button
                      key={j}
                      onClick={() => handleSublinkClick(link, sublink)}
                      className="w-full capitalize text-left py-2 text-sm text-white hover:bg-primary transition-colors"
                      data-tina-field={tinaField(sublink, "label")}
                    >
                      {sublink.label}
                    </button>
                  ) : (
                    <Link
                      key={j}
                      href={sublink.linkOptions?.link || "#"}
                      onClick={toggleMenu}
                      className="capitalize py-2 text-sm text-white hover:bg-primary transition-colors"
                      data-tina-field={tinaField(sublink, "label")}
                    >
                      {sublink.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      {/* ---------------------------------------------
         Auth Buttons (mirrors DesktopMenu)
      --------------------------------------------- */}
      <AuthButtons
        user={user}
        authStyle={res?.authStyle}
        authLabelLogin={res?.authLabelLogin}
        authLabelSignout={res?.authLabelSignout}
        openModal={(modal) => {
          toggleMenu();
          openModal(modal);
        }}
        handleSignout={(setUserFn) => {
          toggleMenu();
          handleSignout(setUserFn);
        }}
        setUser={setUser}
        isMobile={true}
      />
    </div>
  );
}



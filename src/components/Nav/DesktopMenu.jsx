import { useState, useRef } from "react";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { handleSignout } from "@/lib/auth_functions";
import { useAuth } from "@/context/auth";

export default function DesktopMenu({ links, res, user }) {
  const { openModal, setUser } = useAuth();
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const closeTimeout = useRef(null);

  const handleMouseEnter = (i) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenDropdownIndex(i);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdownIndex(null);
    }, 150);
  };

  return (
    <div className="hidden lg:flex items-center gap-8">
      {links?.map((link, i) => {
        const key = `nav-link-${link.label || i}`;
        const hasSublinks = link.sublinks?.length > 0;

        // ---------------------------------------------------
        // REGULAR NAV LINK
        // ---------------------------------------------------
        if (link.style === "link") {
          return (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => hasSublinks && handleMouseEnter(i)}
              onMouseLeave={() => hasSublinks && handleMouseLeave()}
            >
              {/* Normal Link */}
              {link.linkOptions?.link !== null && (
                <Link
                  href={link.linkOptions.link}
                  className="capitalize py-2 cursor-pointer text-white"
                  data-tina-field={tinaField(link, "label")}
                >
                  {link.label}
                </Link>
              )}

              {/* ID Scroll Link */}
              {link.linkOptions?.type === "id" && link.linkOptions?.id && (
                <div
                  className="capitalize py-2 cursor-pointer text-white"
                  data-tina-field={tinaField(link, "label")}
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      const id = link.linkOptions.id;
                      const scrollPos =
                        link.linkOptions.scrollPosition || "start";

                      // Navigate if on a different page
                      if (window.location.pathname !== link.link) {
                        window.location.href = `${link.link.replace(
                          /^\/?/,
                          "/"
                        )}#${id}`;
                        return;
                      }

                      // Scroll if already on the same page
                      const el = document.getElementById(id);
                      el?.scrollIntoView({ behavior: "smooth", block: scrollPos });
                    }
                  }}
                >
                  {link.label}
                </div>
              )}

              {/* DROPDOWN MENU */}
              {hasSublinks && (
                <div
                  className={`absolute left-0 top-full mt-2 bg-black border border-white/15 rounded-md shadow-lg min-w-[160px] transition-opacity duration-200 z-[999] ${
                    openDropdownIndex === i
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.sublinks.map((sublink, j) => {
                    const subKey = `sublink-${link.label}-${sublink.label}-${j}`;
                    const isIdLink =
                      sublink.linkOptions?.type === "id" &&
                      sublink.linkOptions?.id;

                    // ------------------------------------------
                    // SUBLINK: ID Scroll Link
                    // ------------------------------------------
                    if (isIdLink) {
                      return (
                        <button
                          key={subKey}
                          className="w-full capitalize text-left px-4 pr-20 py-2 text-sm text-white cursor-pointer"
                          data-tina-field={tinaField(sublink, "label")}
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              const id = sublink.linkOptions.id;
                              const scrollPos =
                                sublink.linkOptions.scrollPosition || "start";

                              if (window.location.pathname !== link.link) {
                                window.location.href = `${link.link.replace(
                                  /^\/?/,
                                  "/"
                                )}#${id}`;
                              } else {
                                const el = document.getElementById(id);
                                el?.scrollIntoView({
                                  behavior: "smooth",
                                  block: scrollPos,
                                });
                              }
                            }
                          }}
                        >
                          <span className="relative inline-block">
                            <span className="after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#B55914] after:transition-all after:duration-300 hover:after:w-full">
                              {sublink.label}
                            </span>
                          </span>
                        </button>
                      );
                    }

                    // ------------------------------------------
                    // SUBLINK: Normal Page Link
                    // ------------------------------------------
                    return (
                      <div key={subKey} className="py-2">
                        <Link
                          href={sublink.linkOptions?.link || "#"}
                          className="w-full capitalize text-left px-4 pr-20 py-2 text-sm text-white cursor-pointer"
                          data-tina-field={tinaField(sublink, "label")}
                        >
                          <span className="relative inline-block">
                            <span className="after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#B55914] after:transition-all after:duration-300 hover:after:w-full">
                              {sublink.label}
                            </span>
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        // ---------------------------------------------------
        // BUTTON STYLE NAV LINK
        // ---------------------------------------------------
        if (link.style === "button") {
          return (
            <Link key={key} href={link.link}>
              <button
                className="bg-primary text-white px-8 py-2 rounded hover:opacity-80 capitalize cursor-pointer"
                data-tina-field={tinaField(link, "label")}
              >
                {link.label}
              </button>
            </Link>
          );
        }

        return null;
      })}

      {/* --------------------------------------------------- */}
      {/* AUTH BUTTONS */}
      {/* --------------------------------------------------- */}

      {!user && res?.authStyle === "button" && (
        <button
          onClick={() => openModal("login")}
          className="bg-primary text-white px-8 py-2 rounded hover:opacity-80 capitalize cursor-pointer"
          data-tina-field={tinaField(res, "authLabelLogin")}
        >
          {res.authLabelLogin}
        </button>
      )}

      {!user && res?.authStyle === "border" && (
        <button
          onClick={() => openModal("login")}
          className="px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300"
          data-tina-field={tinaField(res, "authLabelLogin")}
        >
          {res.authLabelLogin}
        </button>
      )}

      {user && res?.authStyle === "button" && (
        <button
          onClick={() => handleSignout(setUser)}
          className="bg-primary text-white px-8 py-2 rounded hover:opacity-80 capitalize cursor-pointer"
          data-tina-field={tinaField(res, "authLabelSignout")}
        >
          {res.authLabelSignout}
        </button>
      )}

      {user && res?.authStyle === "border" && (
        <button
          onClick={() => handleSignout(setUser)}
          className="px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300"
          data-tina-field={tinaField(res, "authLabelSignout")}
        >
          {res.authLabelSignout}
        </button>
      )}
    </div>
  );
}


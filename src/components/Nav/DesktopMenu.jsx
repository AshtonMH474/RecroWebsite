import { useState, useRef } from "react";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { handleSignout } from "@/lib/auth_functions";
import { useAuth } from "@/context/auth";
import { handleIdScroll } from "@/utils/navigationHelpers";
import AuthButtons from "./AuthButtons";

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
                  onClick={() => handleIdScroll(
                    link.link,
                    link.linkOptions.id,
                    link.linkOptions.scrollPosition || "start"
                  )}
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
                          onClick={() => handleIdScroll(
                            link.link,
                            sublink.linkOptions.id,
                            sublink.linkOptions.scrollPosition || "start"
                          )}
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
      <AuthButtons
        user={user}
        authStyle={res?.authStyle}
        authLabelLogin={res?.authLabelLogin}
        authLabelSignout={res?.authLabelSignout}
        openModal={openModal}
        handleSignout={handleSignout}
        setUser={setUser}
      />
    </div>
  );
}


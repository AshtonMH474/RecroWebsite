import { useState, useRef } from "react";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";

export default function DesktopMenu({ links }) {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null);
  const closeTimeout = useRef(null);

  const handleMouseEnter = (i) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
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
        if (link.style === "link") {
          const hasSublinks = link.sublinks?.length > 0;
          return (
            <div
              key={`link-${i}`}
              className="relative"
              onMouseEnter={() => hasSublinks && handleMouseEnter(i)}
              onMouseLeave={() => hasSublinks && handleMouseLeave()}
            >
              {link.linkOptions?.link !== null && (
                <Link
                  href={link.linkOptions.link}
                  className="capitalize py-2 cursor-pointer text-white"
                  data-tina-field={tinaField(link, "label")}
                >
                  {link.label}
                </Link>
              )}
              {link.linkOptions?.type === "id" && link.linkOptions?.id && (
                <div
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      if (window.location.pathname !== link.link) {
                        window.location.href = `${link.link.replace(/^\/?/, "/")}#${link.linkOptions?.id}`;
                      } else {
                        const el = document.getElementById(link.linkOptions?.id);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }
                  }}
                  className="capitalize py-2 cursor-pointer text-white"
                  data-tina-field={tinaField(link, "label")}
                >
                  {link.label}
                </div>
              )}

              {hasSublinks && (
                <div
                  className={`absolute left-0 top-full mt-2 bg-black border border-white/15 rounded-md shadow-lg min-w-[160px] transition-opacity duration-200 z-[999] ${
                    openDropdownIndex === i ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                  }`}
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                >
                  {link.sublinks.map((sublink, j) => {
                    const isIdLink = sublink.linkOptions?.type === "id" && sublink.linkOptions?.id;
                    const key = `sublink-${link.label}-${sublink.label}-${j}`;

                    if (isIdLink) {
                      return (
                        <button
                          key={key}
                          onClick={() => {
                            if (typeof window !== "undefined") {
                              if (window.location.pathname !== link.link) {
                                window.location.href = `${link.link.replace(/^\/?/, "/")}#${sublink.linkOptions.id}`;
                              } else {
                                const el = document.getElementById(sublink.linkOptions?.id);
                                el?.scrollIntoView({ behavior: "smooth", block: "center" });
                              }
                            }
                          }}
                          className="w-full capitalize text-left px-4 py-2 text-sm text-white cursor-pointer"
                          data-tina-field={tinaField(sublink, "label")}
                        >
                          <span className="relative inline-block">
                            <span className="after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-[#B55914] after:transition-all after:duration-300 hover:after:w-full">
                              {sublink.label}
                            </span>
                          </span>
                        </button>
                      );
                    }

                    return (
                      <div className="py-2" key={key}>
                        <Link
                          href={sublink.linkOptions?.link || "#"}
                          className="w-full capitalize text-left px-4 py-2 text-sm text-white cursor-pointer"
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

        if (link.style === "button") {
          return (
            <button
              key={`button-${i}`}
              data-tina-field={tinaField(link, "label")}
              className="bg-primary text-white px-8 py-2 rounded hover:opacity-80 capitalize"
            >
              {link.label}
            </button>
          );
        }

        return null;
      })}
    </div>
  );
}


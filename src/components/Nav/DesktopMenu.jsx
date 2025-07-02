import Link from 'next/link';
import { tinaField } from 'tinacms/dist/react';

export default function DesktopMenu({ links, onExpertiseClick, animation }) {
  return (
    <div className="hidden lg:flex items-center gap-8">
      <button
        onClick={onExpertiseClick}
        className="capitalize py-2 cursor-pointer text-white"
        data-tina-field={tinaField(animation, 'animation')}
      >
        {animation.animation}
      </button>

      {links?.map((link, i) => {
        if (link.style === 'link') {
          return (
            <div key={i} className="relative group">
              <Link
                href={link.link}
                className="capitalize py-2 cursor-pointer text-white"
                data-tina-field={tinaField(link, 'label')}
              >
                {link.label}
              </Link>
                
                {link.link == '/careers' && (
                    <div className="absolute left-0 top-full bg-black rounded shadow-md opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-all duration-200 z-[999] min-w-[160px]">
                        <button
                        onClick={() => {
                            if (typeof window !== "undefined") {
                            if (window.location.pathname !== "/careers") {
                                window.location.href = "/careers#jobs";
                            } else {
                                const el = document.getElementById("jobs-section");
                                el?.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                            }
                        }}
                        className="block px-4 py-2 text-white hover:bg-primary transition w-full text-left"
                        >
                        Jobs
                        </button>
                        <button onClick={() => {
                            if (typeof window !== "undefined") {
                            if (window.location.pathname !== "/careers") {
                                window.location.href = "/careers#benefits_section";
                            } else {
                                const el = document.getElementById("benefits_section");
                                el?.scrollIntoView({ behavior: "smooth", block: "center" });
                            }
                            }
                        }}
                        className="block px-4 py-2 text-white hover:bg-primary transition">Benefits</button>
                    </div>
                )}

              
            </div>
          );
        } else if (link.style === 'button') {
          return (
            <button
              key={i}
              onClick={onExpertiseClick}
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



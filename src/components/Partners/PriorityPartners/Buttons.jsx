import Link from "next/link";
import { tinaField } from "tinacms/dist/react";
import {Pause,Play} from "lucide-react";

export default function Buttons({ buttons }) {
  return (
    <>
        <div className="flex justify-center items-center mt-4">
        {/* <button
          onClick={togglePause}
          className="cursor-pointer bg-black/50 rounded-full p-2 text-white/70 hover:text-white"
        >
          {paused ? <Play size={20} /> : <Pause size={20} />}
        </button> */}
      </div>
        <div className="flex justify-center gap-x-8 mt-6">
        {buttons?.map((button, i) =>
            button.style === "border" && button.link ? (
            <Link href={button.link} key={i}>
                <button
                data-tina-field={tinaField(button, "label")}
                className="px-8 capitalize py-2 border primary-border rounded hover:text-white/80 transition-colors duration-300"
                >
                {button.label}
                </button>
            </Link>
            ) : button.style === "button" && button.link ? (
            <Link href={button.link} key={i}>
                <button
                data-tina-field={tinaField(button, "label")}
                className="bg-primary capitalize cursor-pointer px-8 py-2 w-auto rounded hover:opacity-80 text-white"
                >
                {button.label}
                </button>
            </Link>
            ) : null
        )}
        </div>
    </>
  );
}

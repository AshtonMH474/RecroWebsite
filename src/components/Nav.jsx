const { default: Link } = require("next/link");
import { tinaField } from 'tinacms/dist/react';




export default function Nav({res}){
    if (!res) return null;
    
    return (
        <div className="bg-black w-full flex justify-between items-center nav">
            <div data-tina-field={tinaField(res,'logo')}><img className='h-30 pl-16 cursor-pointer' src={res.logo} alt="logo"/></div>
            <div className='flex gap-x-8 items- pr-16'>
                {res.links?.map((link, i) =>
                    link.style == 'link' && link.link ? (
                        <Link key={i} data-tina-field={tinaField(res.links[i], 'label')} className='capitalize py-2 cursor-pointer' href={link.link}>{link.label}</Link>
                    ) : link.style == 'button' && link.link ? (
                        <button key={i} data-tina-field={tinaField(res.links[i], 'label')} className='bg-primary cursor-pointer px-4 py-2 w-30 rounded hover:opacity-80 capitalize'>{link.label}</button>
                    ) : null
                )}
            </div>
        </div>
    )
}
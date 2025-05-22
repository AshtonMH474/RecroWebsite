const { default: Link } = require("next/link");
import { tinaField, useTina } from 'tinacms/dist/react';
import logo from '../../../public/RecroDarkModeLogo.png'



export default function Nav({res}){
    const {data} = useTina(res)
    
    return (
        <div className="bg-black w-full flex justify-between items-center nav">
            <div data-tina-field={tinaField(data.nav,'logo')}><img className='h-30 pl-16 cursor-pointer' src={data.nav.logo} alt="logo"/></div>
            <div className='flex gap-x-8 items- pr-16'>
                {data.nav.links?.map((link, i) =>
                    link.style == 'link' && link.link ? (
                        <Link key={i} data-tina-field={tinaField(data.nav.links[i], 'label')} className='capitalize py-2 cursor-pointer' href={link.link}>{link.label}</Link>
                    ) : link.style == 'button' && link.link ? (
                        <button key={i} data-tina-field={tinaField(data.nav.links[i], 'label')} className='bg-primary cursor-pointer px-4 py-2 w-30 rounded hover:opacity-80 capitalize'>{link.label}</button>
                    ) : null
                )}
            </div>
        </div>
    )
}
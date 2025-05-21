const { default: Link } = require("next/link");
import logo from '../../../public/RecroDarkModeLogo.png'


export default function Nav(){
    
    return (
        <div className="bg-black w-full flex justify-between items-center nav">
            <img className='h-30 pl-16 cursor-pointer' src={logo.src} alt="logo"/>
            <div className='flex gap-x-8 items- pr-16'>
                <Link className='py-2 cursor-pointer' href={'/solutions'}>Solutions</Link>
                <Link className='py-2 cursor-pointer' href={'/Careers'}>Careers</Link>
                <Link className='py-2 cursor-pointer' href={'/About'}>About</Link>
                <button className='bg-primary cursor-pointer px-4 py-2 w-30 rounded hover:opacity-80 capitalize'>Login</button>
            </div>
        </div>
    )
}
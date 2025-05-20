const { default: Link } = require("next/link");
import logo from '../../../public/RecroDarkModeLogo.png'


export default function Nav(){
    
    return (
        <div className="bg-black w-full flex justify-between items-center nav">
            <img className='h-30 pl-16' src={logo.src} alt="logo"/>
            <div className='flex gap-x-8 items- pr-16'>
                <Link className='py-2' href={'/solutions'}>Solutions</Link>
                <Link className='py-2' href={'/Careers'}>Careers</Link>
                <Link className='py-2' href={'/About'}>About</Link>
                <button className='bg-primary px-4 py-2 w-30 rounded hover:opacity-90 capitalize'>Login</button>
            </div>
        </div>
    )
}
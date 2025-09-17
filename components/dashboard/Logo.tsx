import LogoImg from '@/public/img/logo.png';
import Image from 'next/image';

export default function JSLogo(){
    return(
        <div className={`flex flex-row items-center leading-none text-white`}>
            <Image 
            src="/img/logo-no-bg.png"
            alt={'JS'}  
            width="100" height="90"
            />
            <p className="text-[32px]">Admin</p>
        </div>
    )
}
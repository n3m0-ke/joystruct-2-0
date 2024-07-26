import LogoImg from '@/public/img/logo.png';
import Image from 'next/image';

export default function JSLogo(){
    return(
        <div className={`flex flex-row items-center leading-none text-white`}>
            <Image 
            src={LogoImg} 
            alt={'JS'}  
            className="h-12 w-12 "
            />
            <p className="text-[32px]">JoyStruct</p>
        </div>
    )
}
'use client'
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5'

const BackNavigation = () => {
    const router = useRouter();
    return (
        <div className='flex items-center space-x-4 text-xl mx-2 my-2'>
            <IoArrowBack onClick={() => {

                router.refresh()
                router.push("/")
            }} className='cursor-pointer hover:bg-white/5 rounded-full w-9 h-9 p-2' />
            <div className='mt-[-2px] font-bold ml-4'>Post</div>
        </div>
    )
}

export default BackNavigation
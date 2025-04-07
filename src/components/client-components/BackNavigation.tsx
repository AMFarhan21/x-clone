'use client'
import { useRouter } from 'next/navigation';
import { IoArrowBack } from 'react-icons/io5'

const BackNavigation = ({ user }: any) => {
    const router = useRouter();
    return (
        <div className='flex items-center space-x-4 text-xl px-2 py-2 sticky top-0 bg-black/80'>
            <IoArrowBack onClick={() => {
                router.refresh()
                router.back()
            }} className='cursor-pointer hover:bg-white/5 rounded-full w-9 h-9 p-2' />
            <div className='mt-[-2px] font-bold ml-4'> {user ? user : "Post"} </div>
        </div>
    )
}

export default BackNavigation
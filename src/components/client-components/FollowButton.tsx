'use client'
import { LuBellPlus } from "react-icons/lu";
import { useRouter } from "next/navigation"
import React from "react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import { FaRegCircle, FaRegEnvelope } from "react-icons/fa"
import { HiMiniMagnifyingGlass } from "react-icons/hi2"
import { toast } from "sonner"



const FollowButton = ({ targetUserId, userId, isFollowed }) => {
    const router = useRouter()
    const [follow, setFollow] = useState(isFollowed)
    const [isHover, setIsHover] = useState(false)

    const handleFollow = async () => {
        setFollow(!follow)

        const response = await fetch(`http://localhost:3000/api/profiles/follows`, {
            method: "POST",
            body: JSON.stringify({ targetUserId, userId })
        })
        const data = await response.json()

        if (data.success) {
            console.log(data.message)
            toast.success(data.message)
            // router.refresh()
            // setFollow(data.follow)
        } else {
            console.log(data.message)
            toast.error(data.message)
        }
    }


    return (

        <div className='flex ml-auto mr-4 mt-3 gap-x-2'>
            <button className='bg-black border border-white/50 rounded-full cursor-pointer max-h-9 hover:bg-white/7 transition duration-200 '><BsThreeDots className="text-white text-[27px] p-1 w-9 " /></button>
            <button className='bg-black border border-white/50 rounded-full cursor-pointer max-h-9 hover:bg-white/7 transition duration-200 '><FaRegCircle className="text-white text-[27px] p-1 w-9 " /></button>
            <button className='bg-black border border-white/50 rounded-full cursor-pointer max-h-9 hover:bg-white/7 transition duration-200 '><HiMiniMagnifyingGlass className="text-white text-[27px] p-1 w-9 " /></button>
            <button className='bg-black border border-white/50 rounded-full cursor-pointer max-h-9 hover:bg-white/7 transition duration-200 '><FaRegEnvelope className="text-white text-[27px] p-1 w-9 " /></button>
            <button className='bg-black border border-white/50 rounded-full cursor-pointer max-h-9 hover:bg-white/7 transition duration-200 '><LuBellPlus className="text-white text-[27px] p-1 w-9 " /></button>
            {
                follow ? (
                    <button onClick={handleFollow} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                        className='w-26 h-9 items-center rounded-full border border-white/50 bg-black text-white font-bold cursor-pointer pb-0.5 hover:border-red-600/40 hover:text-red-600 hover:bg-red-600/10'>
                        {
                            isHover ? "Unfollow" : "Following"
                        }
                    </button>
                ) : (
                    <button onClick={handleFollow} className='w-20 h-9 items-center rounded-full border border-white/50 bg-white text-black font-bold cursor-pointer'> Follow </button>
                )
            }
        </div>
    )
}

export default FollowButton
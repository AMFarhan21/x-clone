'use client'
import { useRouter } from "next/navigation"
import React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";
import { UserLogin } from "@/types";

type FollowButtonProps = {
    targetUsername: string,
    targetUserId: string,
    userId?: string,
    isFollowed: boolean,
    userLogin: UserLogin,
}

const FollowButton = ({ targetUsername, targetUserId, userId, isFollowed, userLogin }: FollowButtonProps) => {
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
            // console.log(userLogin)
        } else {
            console.log(data.message)
            toast.error(data.message)
        }
    }


    return (

        <div>
            {
                follow ? (

                    <AlertDialog>
                        <AlertDialogTrigger
                            onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}
                            className='w-26 h-9 items-center rounded-full border border-white/50 bg-black text-white font-bold cursor-pointer pb-0.5 hover:border-red-600/40 hover:text-red-600 hover:bg-red-600/10'>
                            <button onClick={(e) => {
                                e.stopPropagation()
                                e.nativeEvent.preventDefault()
                                handleFollow()
                            }}>
                                {
                                    isHover ? "Unfollow" : "Following"
                                }
                            </button>
                        </AlertDialogTrigger>
                        <AlertDialogOverlay className="bg-blue-300/20" />
                        <AlertDialogContent className="bg-black border border-transparent w-80 min-h-73">
                            <AlertDialogHeader>
                                <AlertDialogTitle className="text-xl font-bold">Unfollow @{targetUsername}?</AlertDialogTitle>
                                <AlertDialogDescription className="">
                                    Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogAction onClick={(e) => {
                                e.stopPropagation()
                                e.nativeEvent.preventDefault()
                                handleFollow()
                            }} className="bg-white text-black font-bold hover:bg-white/80 rounded-full h-11">Unfollow</AlertDialogAction>
                            <AlertDialogCancel onClick={(e) => {
                                e.stopPropagation()
                                e.nativeEvent.preventDefault()
                                handleFollow()
                            }} className="bg-black text-white font-bold hover:text-white hover:bg-white/10 rounded-full mt-[-20px] h-11">Cancel</AlertDialogCancel>
                        </AlertDialogContent>
                    </AlertDialog>

                ) : (
                    <button onClick={(e) => {
                        e.stopPropagation()
                        e.nativeEvent.preventDefault()
                        handleFollow()
                    }} className='w-20 h-9 items-center rounded-full border border-white/50 bg-white text-black font-bold cursor-pointer'> Follow </button>
                )
            }
        </div>
    )
}

export default FollowButton
'use client'
import React, { useState } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { toast } from 'sonner'
import { postType } from './posts'
import { useRouter } from 'next/navigation'

type likeButtonProps = {
    postId: string | null;
    likesCount: number;
    isLiked: boolean;
    userId: string;
    replyId: string | null,
}


const LikeButton = ({ replyId, postId, likesCount, isLiked, userId }: likeButtonProps) => {
    const [liked, setLiked] = useState(isLiked)
    const [count, setCount] = useState(Number(likesCount))


    const handlePostLiked = async () => {
        setLiked(!liked)
        setCount(prev => liked ? prev - 1 : prev + 1)

        const response = await fetch(`http://localhost:3000/api/posts/likes?postId=${postId}&userId=${userId}`, {
            method: liked ? "DELETE" : "POST",
            cache: "no-store"
        })

        const data = await response.json();
        if (data.success) {
            toast.success(isLiked ? 'Post unliked' : 'Post liked')
        } else {
            toast.error(data.message)
            console.log(data.message, data.error)
        }
    }

    const handleReplyLiked = async () => {
        setLiked(!liked)
        setCount(prev => liked ? prev - 1 : prev + 1)

        const response = await fetch(`http://localhost:3000/api/reply/likes?replyId=${replyId}&profilesId=${userId}`, {
            method: liked ? "DELETE" : "POST",
            cache: "no-store"
        })
        const data = await response.json()

        if(data.success) {
            toast.success(data.message)
           
            
        } else {
            toast.error(data.message)
            console.log(data.error)
        }
        
    }


    return (
        
            <button
                onClick={(e) => {
                    e.stopPropagation()
                    if (!userId) {
                        toast.error("Please login first")
                    }

                    if(replyId) {
                        handleReplyLiked()
                    } else {
                        handlePostLiked()
                    }
                }
                }
                className="flex rounded-full bg-transparent hover:bg-pink-600/10 hover:text-pink-600 p-2 my-1 transition duration-300 text-white/50 items-end cursor-pointer space-x-1">
                {liked ? <IoHeart className='text-red-400' /> : <IoHeartOutline />}
                <div className={`mt-[3px] text-xs ${liked ? "text-red-400" : ""}`}>{count}</div>
            </button>

       
    )
}

export default LikeButton
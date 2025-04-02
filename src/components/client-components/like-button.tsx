'use client'
import React, { useTransition } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { likePost, likeReply, unlikePost, unlikeReply } from '../server-components/mutation'
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
    const [postPending, startTransition] = useTransition()
    const router = useRouter()


    const handlePostLiked = async () => {
        const response = await fetch(`http://localhost:3000/api/posts/likes?postId=${postId}&userId=${userId}`, {
            method: isLiked ? "DELETE" : "POST"
        })

        const data = await response.json();
        if (data.success) {
            toast.success(isLiked ? 'Post unliked' : 'Post liked')
            startTransition(() => {
                router.refresh()
            })
        } else {
            toast.error(data.message)
            console.log(data.message, data.error)
        }
    }

    const handlePostUnliked = async () => {

    }


    return (
        <div className="flex items-center text-white/50 text-[18px]">
            <button
                disabled={postPending}
                onClick={(e) => {
                    e.stopPropagation()
                    if (!userId) {
                        toast.error("Please login first")
                    }

                    handlePostLiked()

                    // startTransition(async () => {
                    //     if (replyId) {
                    //         isLiked ? await unlikeReply({
                    //             replyId: replyId, profilesId: userId
                    //         }) : await likeReply({
                    //             replyId: replyId, profilesId: userId
                    //         });
                    //     } else {
                    //         isLiked ? await {handlePostUnliked}({
                    //             postId: postId, profilesId: userId
                    //         }) : await {handlePostLiked}({
                    //             postId: postId, profilesId: userId
                    //         });
                    //     }

                    // });

                }
                }
                className="flex rounded-full bg-transparent hover:bg-pink-600/10 hover:text-pink-600 p-2 my-1 transition duration-400 text-white/50 items-end cursor-pointer space-x-1">
                {isLiked ? <IoHeart className='text-red-400' /> : <IoHeartOutline />}
                <div className={`mt-[3px] text-xs ${isLiked ? "text-red-400" : ""}`}>{likesCount ?? 0}</div>
            </button>

        </div >
    )
}

export default LikeButton
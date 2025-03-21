'use client'
import React, { useTransition } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { likePost, unlikPost } from '../server-components/mutation'
import { toast } from 'sonner'
import { postType } from './posts'

type likeButtonProps = {
    post: postType;
    likesCount: number;
    isLiked: boolean;
    userId: string
}

const LikeButton = ({ post, likesCount, isLiked, userId }: likeButtonProps) => {
    const [postPending, startTransition] = useTransition()

    return (
        <div className="flex items-center text-white/50 text-[18px]">
            <button
                disabled={postPending}
                onClick={() => {
                    if (userId) {
                        startTransition(async () => isLiked ? await unlikPost({ postId: post.id, profilesId: userId }) : await likePost({ postId: post.id, profilesId: userId }))
                    } else {
                        toast.error("Please login to like a post")
                    }
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
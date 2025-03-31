'use client'
import React, { useTransition } from 'react'
import { IoHeart, IoHeartOutline } from 'react-icons/io5'
import { likePost, likeReply, unlikePost, unlikeReply } from '../server-components/mutation'
import { toast } from 'sonner'
import { postType } from './posts'

type likeButtonProps = {
    postId: string;
    likesCount: number;
    isLiked: boolean;
    userId: string;
    replyId: string,
}


const LikeButton = ({ replyId, postId, likesCount, isLiked, userId }: likeButtonProps) => {
    const [postPending, startTransition] = useTransition()

    // console.log(postId)
    // console.log(replyId)
    return (
        <div className="flex items-center text-white/50 text-[18px]">
            <button
                disabled={postPending}
                onClick={(e) => {
                    if (!userId) {
                        toast.error("Please login first")
                    }
                    startTransition(async () => {
                        if (replyId) {
                            isLiked ? await unlikeReply({
                                replyId: replyId, profilesId: userId
                            }) : await likeReply({
                                replyId: replyId, profilesId: userId
                            });
                        } else {
                            isLiked ? await unlikePost({
                                postId: postId, profilesId: userId
                            }) : await likePost({
                                postId: postId, profilesId: userId
                            });
                        }
                        
                    });
                    e.stopPropagation()
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
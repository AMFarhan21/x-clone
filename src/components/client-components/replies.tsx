import React from 'react'
import { BsDot } from 'react-icons/bs'
import DayJs from './DayJs'
import DropdownButton from './DropdownButton'
import ReplyButton from './reply-button'
import LikeButton from './like-button'
import { FaRetweet } from 'react-icons/fa6'
import { IoStatsChart } from 'react-icons/io5'
import { MdBookmarkBorder } from 'react-icons/md'
import { FiShare } from 'react-icons/fi'
import Repost from './rePost-button'

const Replies = ({ reply, userId, post, username }) => {
    const imageArray = reply.imageUrl ? JSON.parse(reply.imageUrl) : [];
    return (
        <div key={reply.id} className="border-b border-gray-600/50 flex pt-3 px-4 cursor-pointer hover:bg-white/2">
            <div className="bg-white/50 min-w-10 h-10 rounded-full p">  </div>
            <div className="ml-4 w-full">
                <div className="flex justify-between">
                    <div className="flex items-center">
                        <div className="font-semibold">{reply.username ?? ""}</div>
                        <div className="text-white/50 text-sm ml-1">@{reply.username}</div>
                        <div className="text-white/50 text-sm"> <BsDot /> </div>
                        <div className="text-white/50 text-sm">
                            {/* {dayjs(reply.profiles.createdAt).fromNow()} */}
                            <DayJs date={reply.created_at} />
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <div>grok</div>
                        <div> <DropdownButton username={reply.username} data={reply} userId={userId} /> </div>
                    </div>
                </div>
                <div className="pb leading-4.5 text-[15px] mt-1 mb-3"> {reply.text} </div>
                {
                    imageArray.length > 0 && (<div className="grid gap-1 roundex-2xl overflow-hidden grid-cols-2">
                        {imageArray.slice(0, 4).map((fileUrl, index) => (
                            <img src={fileUrl}
                                alt="Post Image"
                                key={index}
                                className="w-full h-full object-cover" />
                        ))}
                    </div>)
                }
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-white/50 text-[18px] ">
                        <ReplyButton post={post} userId={userId} postId={post.id} postUsername={username} />
                    </div>
                    <div className="flex items-center text-white/50 text-[18px]">
                        <Repost postId={null} userId={userId} isRePosted={reply.isReplyReposted} rePostCount={reply.replyRepostCount} replyId={reply.id} />
                    </div>
                    <div className="flex items-center text-white/50 text-[18px]">
                        <LikeButton replyId={reply.id || null} postId={reply.postId} likesCount={reply.replyLikesCount} isLiked={reply.isReplyLiked} userId={userId} />
                    </div>
                    <div className="flex items-center text-white/50 text-[18px]">
                        <button className="flex rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/35 items-end cursor-pointer space-x-1"> <IoStatsChart /><div className="mt-[3px] text-xs">1</div></button>
                    </div>
                    <div className="flex text-white/50 items-center space-x-0 text-[18px]">
                        <button className="text-xl rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/50 cursor-pointer"> <MdBookmarkBorder /> </button>
                        <button className="rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/50 cursor-pointer"> <FiShare /> </button>
                    </div>
                </div>
            </div>
        </div >
    )


}

export default Replies
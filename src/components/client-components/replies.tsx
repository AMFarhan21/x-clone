'use client'
import { BsDot } from 'react-icons/bs'
import DayJs from './DayJs'
import DropdownButton from './DropdownButton'
import ReplyButton from './reply-button'
import LikeButton from './like-button'
import { IoStatsChart } from 'react-icons/io5'
import { FiShare } from 'react-icons/fi'
import Repost from './rePost-button'
import BookmarkButton from './bookmark-button'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Post, Profiles, Reply } from '@/types'
import { Grok } from '@lobehub/icons';


type replyProps = {
    reply: Reply;
    userId?: string;
    post?: Post;
    username: string;
    userProfiles: Profiles;
}

const Replies = ({ reply, userId, username, userProfiles }: replyProps) => {
    const imageArray = reply.imageUrl ? JSON.parse(reply.imageUrl) : [];
    const router = useRouter()


    const handleReplyClick = () => {
        router.push(`/${reply.username}/status/${reply.id}`)
    }

    const handleReplyProfile = () => {
        router.push(`/${reply.username}`)
    }

    // console.log(post)

    return (
        <div key={reply.id} onClick={handleReplyClick} className="border-b border-gray-600/50 flex pt-3 px-2 sm:!px-4 cursor-pointer hover:bg-white/2">
            {
                reply.profilePicture ? (
                    <Image alt='profilePicture' width={300} height={300} loading="eager" src={reply.profilePicture} className="bg-white/50 object-cover w-10 h-10 rounded-full p" onClick={(e) => { e.stopPropagation(); handleReplyProfile() }} />
                ) : (
                    <div className="bg-white/50 min-w-10 h-10 rounded-full p">  </div>
                )
            }
            <div className="ml-2 sm:!ml-4 w-full">
                <div className="flex justify-between">
                    <div className="sm:flex items-center">
                        <div className="font-semibold hover:border-b-2 border-white" onClick={(e) => { e.stopPropagation(); handleReplyProfile() }}>{reply.username ?? ""}</div>
                        <div className='flex'>
                        <div className="text-white/50 text-sm ml-1" onClick={(e) => { e.stopPropagation(); handleReplyProfile() }}>@{reply.username}</div>
                        <div className="text-white/50 text-sm"> <BsDot /> </div>
                        <div className="text-white/50 text-sm">
                            {/* {dayjs(reply.profiles.createdAt).fromNow()} */}
                            <DayJs date={reply.created_at} profilesCreated={null} />
                        </div>
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                        <Grok />
                        <div> <DropdownButton<Reply> username={reply.username} data={reply} userId={userId} /> </div>
                    </div>
                </div>
                <div className="pb leading-4.5 text-[15px] mt-2"> {reply.text} </div>
                {
                    imageArray.length > 0 && (<div className={`grid gap-[2px] roundex-2xl overflow-hidden ${imageArray.length === 1 ? "grid-cols-1" : "grid-cols-2"} ${imageArray.length === 2 && "grid-cols-2 h-75 w-full"} ${imageArray.length === 3 && "grid-cols-2 grid-rows-2"} mt-4 rounded-2xl`}>
                        {imageArray.slice(0, 4).map((fileUrl: string, index: number) => (
                            <Image src={fileUrl}
                                alt="Post Image"
                                key={index}
                                width={500} height={500} loading="eager"
                                className="w-full h-full object-cover" />
                        ))}
                    </div>)
                }
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-white/50 text-[18px] " onClick={(e) => { e.stopPropagation()}}>
                        <ReplyButton userProfiles={userProfiles} post={reply} userId={userId} dataId={reply.id} postUsername={username} replyCount={reply.replyCount} />
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
                        <BookmarkButton postId={null} userId={userId} replyId={reply.id} isBookmarked={reply.isReplyBookmarked} />
                        <button className="rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/50 cursor-pointer"> <FiShare /> </button>
                    </div>
                </div>
            </div>
        </div >

    )


}

export default Replies
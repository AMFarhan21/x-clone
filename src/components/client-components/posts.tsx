'use client'

import { BsDot } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { FiShare } from "react-icons/fi";
import LikeButton from "./like-button";
import { useRouter } from "next/navigation";
import ReplyButton from "./reply-button";
import DayJs from "./DayJs";
import DropdownButton from "./DropdownButton";
import Repost from "./rePost-button";
import BookmarkButton from "./bookmark-button";
import Image from "next/image";
import { Post, Profiles } from "@/types";

type postProps = {
    post: Post;
    userId?: string;
    userProfiles: Profiles;
}

const Posts = ({ post, userId, userProfiles }: postProps) => {


    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
    }



    const handlePostClick = () => {
        const select = window.getSelection();
        if (select && select.toString().length > 0) {
            return;
        }
        router.push(`/${post.username}/status/${post.id}`)
        // const imageArray = JSON.parse(post.imageUrl);
    }


    const handlePostProfileClick = () => {
        window.location.href = `/${post.username}`
    }


    const imageArray = post.imageUrl ? JSON.parse(post.imageUrl) : [];



    return (
        <div key={post.id} onClick={handlePostClick} className="border-b border-gray-600/50 pt-3 w-full cursor-pointer hover:bg-white/2">

            <div className="flex !px-2 sm:!px-4">
                {post.profilePicture ? (
                    <Image alt="profilePicture" src={post.profilePicture} width={300} height={300} loading="eager" className="bg-white/50 w-10 h-10 rounded-full object-cover" onClick={(e) => { e.stopPropagation(); handlePostProfileClick() }} />
                ) : (
                    <div className="bg-white/50 min-w-10 h-10 rounded-full" onClick={(e) => { e.stopPropagation(); handlePostProfileClick() }}>  </div>
                )}

                <div className="ml-2 sm:!ml-4 sm:w-full w-[85%]">
                    <div className="flex justify-between ">
                        <div className="flex flex-wrap min-w-0 items-center">

                            <div className="font-semibold hover:border-b-2 border-white whitespace-nowrap " onClick={(e) => { e.stopPropagation(); handlePostProfileClick() }}>{post.displayName ? post.displayName : post.username}</div>

                            <div className="text-white/50 text-sm ml-1 whitespace-nowrap text-ellipsis overflow-hidden" onClick={(e) => { e.stopPropagation(); handlePostProfileClick() }}>@{post.username}</div>
                            <div className="text-white/50 text-sm"> <BsDot /> </div>
                            <div className="text-white/50 text-sm whitespace-nowrap overflow-x-hidden"> <DayJs date={post.created_at} profilesCreated={null} /> </div>

                        </div>
                        <div className="flex flex-wrap space-x-2 items-center">
                            <div>Grok</div>
                            <div>
                                <DropdownButton<Post> username={post.username} data={post} userId={userId} />
                            </div>
                        </div>
                    </div>
                    <div className="pb leading-4.5 text-[15px] mt-2 overflow-x-scroll overflow-clip"> {post.text} </div>

                    {
                        imageArray.length > 0 && (<div className={`grid gap-[2px] mt-4 rounded-2xl w-[100%] overflow-hidden ${imageArray.length === 1 ? "grid-cols-1" : "grid-cols-2"} ${imageArray.length === 2 && "grid-cols-2 h-75 w-full"} ${imageArray.length === 3 && "grid-cols-2 grid-rows-2"} `}>
                            {imageArray.slice(0, 4).map((fileUrl: string, index: number) => {
                                const isVideo = fileUrl.endsWith(".mp4") || fileUrl.endsWith(".mov")

                                return (
                                    isVideo ? (
                                        <video key={index} controls autoPlay loop playsInline className="w-full h-full object-cover">
                                            <source src={fileUrl} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <Image src={fileUrl}
                                            alt="Post Image"
                                            width={500} height={500} loading="eager"
                                            // sizes="10vw"
                                            key={index}
                                            className={`w-full h-full object-cover ${imageArray.length === 3 && index === 0 && "row-span-2"}`} />
                                    )
                                )
                            })}
                        </div>)
                    }


                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-white/50 text-[18px] " onClick={(e) => { e.stopPropagation() }}>
                            <ReplyButton userProfiles={userProfiles} post={post} userId={userId} dataId={post.id} postUsername={post.username} replyCount={post.replyCount} />
                        </div>
                        <div className="flex items-center text-white/50 text-[18px]">
                            <Repost postId={post.id} userId={userId} isRePosted={post.isRePosted} rePostCount={post.rePostCount} replyId={null} />
                        </div>
                        <div className="flex items-center text-white/50 text-[18px]">
                            <LikeButton replyId={null} postId={post.id} likesCount={post.likesCount} isLiked={post.isLiked} userId={userId} />
                        </div >
                        <div className="flex items-center text-white/50 text-[18px]" >
                            <button onClick={handleClick} className="flex rounded-full bg-transparent hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 text-white/35 items-end cursor-pointer space-x-1"> <IoStatsChart /><div className="mt-[3px] text-xs">1</div></button>
                        </div>
                        <div className="flex text-white/50 items-center space-x-0 text-[18px]">
                            <BookmarkButton postId={post.id} userId={userId as string} replyId={null} isBookmarked={post.isBookmarked} />
                            <button className="rounded-full bg-transparent hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 text-white/50 cursor-pointer" onClick={handleClick}> <FiShare /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts
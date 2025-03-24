'use server'

import { BsDot, BsThreeDots } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { FiShare } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import LikeButton from "./like-button";
import { getLikesCount, isLiked } from "../server-components/fetch-data";
import { createClient } from "@/utils/supabase/server";

dayjs.extend(relativeTime)

export type profilesType = {
    id: string;
    username: string;
    full_name: string;
    email: string;
    created_at: string;
}

export type postType = {
    id: string;
    text: string;
    profilesid: string;
    created_at: string;
    profiles: profilesType;
}

type postProps = {
    post: postType;
}

const Posts = async({ post }: postProps) => {

    const supabase = await createClient();
    const user = await supabase.auth.getUser()

    // const getPostLikesCount = await getLikesCount(post.id);
    // const isLikedByUser = await isLiked({postId: post.id, profilesId: user.data.user?.id});
    
    return (
        <div>
            <div key={post.id} className="border-b border-gray-600/50 flex pt-3 px-4">
                <div className="bg-white/50 min-w-10 h-10 rounded-full p">  </div>
                <div className="ml-4 w-full">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <div className="font-semibold">{post.username ?? ""}</div>
                            <div className="text-white/50 text-sm ml-1">@{post.username}</div>
                            <div className="text-white/50 text-sm"> <BsDot /> </div>
                            <div className="text-white/50 text-sm"> {dayjs(post.created_at).fromNow()} </div>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <div>grok</div>
                            <div> <BsThreeDots /> </div>
                        </div>
                    </div>
                    <div className="pb leading-4.5 text-[15px] mt-1"> {post.text} </div>
                    <div> <img src="https://pbs.twimg.com/media/GmYXVr0aYAA0_i1?format=jpg&name=small" className="rounded-2xl mt-2" /> </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-white/50 text-[18px]">
                            <button className="flex rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/50 items-end cursor-pointer space-x-1"> <HiOutlineChatBubbleOvalLeft /><div className="mt-[3px] text-xs">1</div></button>
                        </div>
                        <div className="flex items-center text-white/50 text-[18px]">
                            <button className="flex mt-[6px] rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/35 items-end cursor-pointer space-x-1"> <FaRetweet className="text-xl" /><div className="mt-[-20px] text-xs text-white/50">1</div></button>
                        </div>
                        <LikeButton post={post} likesCount={post.likes_count} isLiked={post.is_liked} userId={user.data.user?.id}/>
                        <div className="flex items-center text-white/50 text-[18px]">
                            <button className="flex rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/35 items-end cursor-pointer space-x-1"> <IoStatsChart /><div className="mt-[3px] text-xs">1</div></button>
                        </div>
                        <div className="flex text-white/50 items-center space-x-0 text-[18px]">
                            <button className="text-xl rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/50 cursor-pointer"> <MdBookmarkBorder /> </button>
                            <button className="rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/50 cursor-pointer"> <FiShare /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts
'use client'

import { BsDot, BsThreeDots } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { FiShare } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import dayjs from "dayjs";
import LikeButton from "./like-button";
import { useRouter } from "next/navigation";
import ReplyButton from "./reply-button";
import DayJs from "./DayJs";
import DeleteButton from "./DeleteButton";
import DropdownButton from "./DropdownButton";

export type postType = {
    id: string;
    text: string;
    profilesId: string;
    created_at: string;
    username: string;
    fullName?: string | null;
    isLiked: boolean;
    likesCount: number;


};

type postProps = {
    post: postType;
    userId: string;
}

const Posts = ({ post, userId }: postProps) => {

    const router = useRouter();

    const handleClick = (e) => {
        e.stopPropagation();
    }

    const handlePostClick = () => {
        const select = window.getSelection();
        if (select && select.toString().length > 0) {
            return;
        }
        router.push(`/${post.username}/status/${post.id}`)
    }

    return (
        <div>
            <div key={post.id} className="border-b border-gray-600/50 flex pt-3 px-4 cursor-pointer hover:bg-white/2" onClick={handlePostClick}>
                <div className="bg-white/50 min-w-10 h-10 rounded-full p">  </div>
                <div className="ml-4 w-full">
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <div className="font-semibold">{post.username ?? ""}</div>
                            <div className="text-white/50 text-sm ml-1">@{post.username}</div>
                            <div className="text-white/50 text-sm"> <BsDot /> </div>
                            <div className="text-white/50 text-sm"> <DayJs date={post.created_at} /> </div>
                        </div>
                        <div className="flex space-x-2 items-center">
                            <div>Grok</div>
                            <div>
                                <DropdownButton username={post.username} data={post} userId={userId} />
                            </div>
                        </div>
                    </div>
                    <div className="pb leading-4.5 text-[15px] mt-1"> {post.text} </div>
                    <div> <img src="https://pbs.twimg.com/media/GmYXVr0aYAA0_i1?format=jpg&name=small" className="rounded-2xl mt-2" /> </div>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-white/50 text-[18px] " onClick={handleClick}>
                            <ReplyButton post={post} userId={userId} postId={post.id} postUsername={post.username} />
                        </div>
                        <div className="flex items-center text-white/50 text-[18px]" onClick={handleClick}>
                            <button className="flex mt-[6px] rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/35 items-end cursor-pointer space-x-1"> <FaRetweet className="text-xl" /><div className="mt-[-20px] text-xs text-white/50">1</div></button>
                        </div>
                        <LikeButton replyId={null} postId={post.id} likesCount={post.likesCount} isLiked={post.isLiked} userId={userId} />
                        <div className="flex items-center text-white/50 text-[18px]" onClick={handleClick}>
                            <button className="flex rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/35 items-end cursor-pointer space-x-1"> <IoStatsChart /><div className="mt-[3px] text-xs">1</div></button>
                        </div>
                        <div className="flex text-white/50 items-center space-x-0 text-[18px]">
                            <button className="text-xl rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/50 cursor-pointer" onClick={handleClick}> <MdBookmarkBorder /> </button>
                            <button className="rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/50 cursor-pointer" onClick={handleClick}> <FiShare /> </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Posts
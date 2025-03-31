import DayJs from '@/components/client-components/DayJs';
import DropdownButton from '@/components/client-components/DropdownButton';
import LikeButton from '@/components/client-components/like-button';
import Posts from '@/components/client-components/posts';
import ReplyButton from '@/components/client-components/reply-button';
import { getOnePost, getReplies } from '@/components/server-components/fetch-data';
import { db } from '@/lib/db';
import { reply } from '@/lib/db/schema';
import { createClient } from '@/utils/supabase/server';
import { and, eq, exists, sql } from 'drizzle-orm';
import React from 'react'
import { BsDot, BsThreeDots } from 'react-icons/bs';
import { FaRetweet } from 'react-icons/fa6';
import { FiShare } from 'react-icons/fi';
import { IoStatsChart } from 'react-icons/io5';
import { MdBookmarkBorder } from 'react-icons/md';

const PostStatus = async ({ params }: { params: Promise<{ username: string; postId: string }> }) => {


  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const userId = userData.user?.id
  const { username, postId } = await params


  const post = await getOnePost(userId, postId)


  const replies = await getReplies(userId, postId)

  // console.log(replies)

  return (

    <div className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
      {post ? <Posts key={post.id} post={post} userId={userId} /> : <div>This post not exists</div>}
      <div>
        {replies.map(reply => (
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
              <div className="pb leading-4.5 text-[15px] mt-1"> {reply.text} </div>
              {/* <div> <img src="https://pbs.twimg.com/media/GmYXVr0aYAA0_i1?format=jpg&name=small" className="rounded-2xl mt-2" /> </div> */}
              <div className="flex justify-between items-center">
                <div className="flex items-center text-white/50 text-[18px] ">
                  <ReplyButton post={post} userId={userId} postId={post.id} postUsername={username} />
                </div>
                <div className="flex items-center text-white/50 text-[18px]">
                  <button className="flex mt-[6px] rounded-full bg-transparent hover:bg-white/5 p-2 my-1 text-white/35 items-end cursor-pointer space-x-1"> <FaRetweet className="text-xl" /><div className="mt-[-20px] text-xs text-white/50">1</div></button>
                </div>
                <LikeButton replyId={reply.id || null} postId={reply.postId} likesCount={reply.likesReplyCount} isLiked={reply.isReplyLiked} userId={userId} />
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
        ))}
      </div>
    </div>

  )
}

export default PostStatus
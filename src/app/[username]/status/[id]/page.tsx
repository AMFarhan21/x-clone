import BackNavigation from '@/components/client-components/BackNavigation';
import ComposeReply from '@/components/client-components/compose-reply';
import Posts from '@/components/client-components/posts';
import Replies from '@/components/client-components/replies';
import { userIsLogin } from '@/components/server-components/action';
import { getRepliesAction } from '@/components/server-components/replyAction';
import { Reply } from '@/types';
import React from 'react'

const PostStatus = async ({ params }: { params: Promise<{ username: string; id: string }> }) => {

  const { data: userData, error: userError } = await userIsLogin();
  if (userError) {
    console.log(userError)
    return
  }
  const userId = userData.user?.id as string
  const { username, id } = await params

  const response = await getRepliesAction(userId, id)
  const replies = await response?.json();


  return (

    <div className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50 mb-10 sm:mb-0">
      <BackNavigation location="Post" />
      {replies.resOnePost ? <Posts key={replies.resOnePost[0].id} userProfiles={replies.userProfiles} post={replies.resOnePost[0]} userId={userId} /> : <div>This post not exists</div>}
      <ComposeReply userProfiles={replies.userProfiles} userId={userId} dataId={replies.resOnePost[0].id} />

      
      {replies.res.map((reply: Reply) => (
        <Replies key={reply.id} userProfiles={replies.userProfiles} reply={reply} userId={userId} post={replies.resOnePost[0]} username={username} />
      ))}

    </div>
  )
}

export default PostStatus
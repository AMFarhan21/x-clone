import BackNavigation from '@/components/client-components/BackNavigation';
import ComposeReply from '@/components/client-components/compose-reply';
import Posts from '@/components/client-components/posts';
import Replies from '@/components/client-components/replies';
import { createClient } from '@/utils/supabase/server';
import React from 'react'

const PostStatus = async ({ params }: { params: Promise<{ username: string; id: string }> }) => {


  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    console.log(userError)
  }
  const userId = userData.user?.id
  const { username, id } = await params


  const response = await fetch(`http://localhost:3000/api/reply?userId=${userId}&dataId=${id}`)
  const replies = await response.json();

  // if (replies.success) {
  //   console.log(replies.resOnePost[0])
  // } else {
  //   console.log(replies.message)
  // }

  // console.log(replies.userProfiles.profilePicture)


  return (

    <div className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
      <BackNavigation user={null} />
      {replies.resOnePost ? <Posts key={replies.resOnePost[0].id} userProfiles={replies.userProfiles} post={replies.resOnePost[0]} userId={userId} /> : <div>This post not exists</div>}
      <ComposeReply userProfiles={replies.userProfiles} userId={userId} dataId={replies.resOnePost[0].id} />


      {replies.res.map((reply) => (
        <Replies key={reply.id} userProfiles={replies.userProfiles} reply={reply} userId={userId} post={replies.resOnePost} username={username} />
      ))}

    </div>
  )
}

export default PostStatus
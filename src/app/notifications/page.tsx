"use server"
import { BsDot, BsGear, BsThreeDots } from 'react-icons/bs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IoHeart, IoStatsChart } from 'react-icons/io5';
import { FaRetweet } from 'react-icons/fa6';
import { HiChatBubbleLeft } from 'react-icons/hi2';
import { Bookmark } from 'lucide-react';
import { FiShare } from 'react-icons/fi';
import { FaUser } from 'react-icons/fa';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

type groupedType = {
  postId: string,
  postText: string,
  postImageUrl: string,
  replyId: string,
  replyText: string,
  replyImageUrl: string,
  likerId: string,
  likerUsername: string,
  likerDisplayName: string,
  likerProfilePicture: string,
  reposterId: string,
  reposterUsername: string,
  reposterDisplayName: string,
  reposterProfilePicture: string,
  likesId: string,
  repostId: string,
  createdAt: string

  followersId: string,
  id: string,
  type: string,
  action: string,
  userId: string,
  username: string,
  displayName: string,
  profilePicture: string,
  latest: string
}

type groupedPostLikesType = {
  [postId: string]: {
    postText: string,
    postImageUrl: string,
    otherUsers: groupedType[]
  }
}

type groupedReplyLikesType = {
  [replyId: string]: {
    replyText: string,
    replyImageUrl: string,
    otherUsers: groupedType[]
  }
}

type groupedPostRepostType = {
  [postId: string]: {
    postText: string,
    postImageUrl: string,
    otherUsers: groupedType[]
  }
}

type groupedReplyRepostType = {
  [replyId: string]: {
    replyText: string,
    replyImageUrl: string,
    otherUsers: groupedType[]
  }
}



const notifications = async () => {
  const supabase = await createClient()
  const { data: user, error } = await supabase.auth.getUser()
  if (error) {
    console.log("NOTIFICATIONS SUPABASE GETUSER() ERROR", error)
    return
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/notifications?userId=${user.user?.id}`)
  const res = await response.json()
  const { postLikesNotif, replyLikesNotif, repostPostNotif, repostReplyNotif, followsNotif } = res

  const postGroupLikes: groupedPostLikesType = {}
  postLikesNotif.forEach((item: groupedType) => {
    if (!postGroupLikes[item.postId]) {
      postGroupLikes[item.postId] = {
        postText: item.postText,
        postImageUrl: item.postImageUrl,
        otherUsers: []
      }

    }
    postGroupLikes[item.postId].otherUsers.push(item)
  })
  const postGroupLikesArray = Object.entries(postGroupLikes)

  // REPLY LIKES GROUP
  const replyGroupLikes: groupedReplyLikesType = {}
  replyLikesNotif.forEach((item: groupedType) => {
    if (!replyGroupLikes[item.replyId]) {
      replyGroupLikes[item.replyId] = {
        replyText: item.replyText,
        replyImageUrl: item.replyImageUrl,
        otherUsers: []
      }
    }

    replyGroupLikes[item.replyId].otherUsers.push(item)
  })
  const replyGroupLikesArray = Object.entries(replyGroupLikes)

  // POST REPOST GROUP
  const postGroupRepost: groupedPostRepostType = {}
  repostPostNotif.forEach((item: groupedType) => {
    if (!postGroupRepost[item.postId]) {
      postGroupRepost[item.postId] = {
        postText: item.postText,
        postImageUrl: item.postImageUrl,
        otherUsers: []
      }
    }
    postGroupRepost[item.postId].otherUsers.push(item)
  })
  const postGroupRepostArray = Object.entries(postGroupRepost)

  // REPLY REPOST GROUP
  const replyGroupRepost: groupedReplyRepostType = {}
  repostReplyNotif.forEach((item: groupedType) => {
    if (!replyGroupRepost[item.replyId]) {
      replyGroupRepost[item.replyId] = {
        replyText: item.replyText,
        replyImageUrl: item.replyImageUrl,
        otherUsers: []
      }
    }

    replyGroupRepost[item.replyId].otherUsers.push(item)
  })
  const replyGroupRepostArray = Object.entries(replyGroupRepost)

  const followsNotifArray = followsNotif.map((item: groupedType) => ({
    id: item.id,
    type: "follow",
    action: "follow",
    userId: item.followersId,
    username: item.username,
    displayName: item.displayName,
    profilePicture: item.profilePicture,
    latest: item.createdAt
  }))



  // COMBINED
  const combinedNotification = [
    ...postGroupLikesArray.map(([postId, data]) => {
      const sortedLikers = [...data.otherUsers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      return {
        id: postId,
        type: "post",
        action: "likes",
        text: data.postText,
        imageUrl: data.postImageUrl,
        otherUsers: sortedLikers,
        otherUsersId: sortedLikers[0].likesId,
        latest: sortedLikers[0].createdAt
      }
    }),
    ...replyGroupLikesArray.map(([replyId, data]) => {
      const sortedLikers = [...data.otherUsers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      return {
        id: replyId,
        type: "reply",
        action: "likes",
        text: data.replyText,
        imageUrl: data.replyImageUrl,
        otherUsers: sortedLikers,
        otherUsersId: sortedLikers[0].likesId,
        latest: sortedLikers[0].createdAt
      }
    }),
    ...postGroupRepostArray.map(([postId, data]) => {
      const sortedReposter = [...data.otherUsers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      return {
        id: postId,
        type: "post",
        action: "repost",
        text: data.postText,
        imageUrl: data.postImageUrl,
        otherUsers: sortedReposter,
        otherUsersId: sortedReposter[0].repostId,
        latest: sortedReposter[0].createdAt
      }
    }),
    ...replyGroupRepostArray.map(([replyId, data]) => {
      const sortedReposter = [...data.otherUsers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      return {
        id: replyId,
        type: "reply",
        action: "repost",
        text: data.replyText,
        imageUrl: data.replyImageUrl,
        otherUsers: sortedReposter,
        otherUsersId: sortedReposter[0].repostId,
        latest: sortedReposter[0].createdAt
      }
    }),
    ...followsNotifArray
    .map((data: groupedType) => ({
      id: data.id,
      type: data.type,
      action: data.action,
      userId: data.userId,
      username: data.username,
      profilePicture: data.profilePicture,
      latest: data.latest
    }))
  ].sort((a, b) => new Date(b.latest).getTime() - new Date(a.latest).getTime())


  return (
    <div className='w-full border-l border-r border-gray-600/50 h-screen xl:max-w-[48%]'>
      <div className='flex items-center justify-between text-xl p-4'>
        <div className='font-bold'>Notifications</div>
        <div> <BsGear /> </div>
      </div>
      <Tabs defaultValue="All">
        <TabsList className="grid grid-cols-3 bg-black/0 text-white/50 font-semibold items-center w-full border-b border-white/15 text-sm">
          <TabsTrigger
            className='hover:bg-white/10 py-3 focus:text-white text-white/50 relative
                       after:content-[""] after:absolute after:bottom-0 after:left-[15%]
                       after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full
                       after:scale-x-0 after:transition-transform after:origin-center
                       data-[state=active]:text-white data-[state=active]:after:scale-x-100'
            value="All">
            All
          </TabsTrigger>
          <TabsTrigger
            className='hover:bg-white/10 py-3 focus:text-white text-white/50 relative
                       after:content-[""] after:absolute after:bottom-0 after:left-[15%]
                       after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full
                       after:scale-x-0 after:transition-transform after:origin-center
                       data-[state=active]:text-white data-[state=active]:after:scale-x-100'
            value="Verified">
            Verified
          </TabsTrigger>
          <TabsTrigger
            className='hover:bg-white/10 py-3 focus:text-white text-white/50 relative
                       after:content-[""] after:absolute after:bottom-0 after:left-[15%]
                       after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full
                       after:scale-x-0 after:transition-transform after:origin-center
                       data-[state=active]:text-white data-[state=active]:after:scale-x-100'
            value="Mentions">
            Mentions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="All" className='min-h-160 p-4'>
          {
            combinedNotification.map((item) => {

              if (!item.otherUsers) {
                if (item.type === "follow") {
                  return (
                    <div key={item.id} className='flex items-top gap-x-2 border-b border-gray-600/60 mb-4'>
                      <div> <FaUser className='text-blue-400/80 text-2xl' /> </div>
                      <div>
                        <div className='flex gap-x-2 mb-2'>
                          <Image src={item.profilePicture} width={200} height={200} alt='profilePicture' className='w-8 h-8 rounded-full bg-gray-600 object-cover' />
                        </div>
                        <div className='font-bold mb-2'>
                          {item.username} <span className='font-light'>followed you</span>
                        </div>
                      </div>
                    </div>
                  )
                }
              }

              const filteredUsers = item.otherUsers.filter((u: groupedType) => u.likerId !== user.user?.id && u.repostId !== user.user?.id)
              if (filteredUsers.length === 0) return null;

              const display = filteredUsers.length > 1 ? filteredUsers.slice(0, 2) : filteredUsers.slice(0, 1);
              const otherAccount = filteredUsers.length - display.length
              const likeUsers = display.map((users: groupedType) => users.likerUsername).join(", ") + (otherAccount > 0 ? `and ${otherAccount} others` : '')
              const repostUsers = display.map((users: groupedType) => users.reposterUsername).join(", ") + (otherAccount > 0 ? `and ${otherAccount} other` : '')


              switch (item.type) {
                case "post":
                  return (
                    <div key={item.id} className='flex items-top gap-x-2 border-b border-gray-600/60 mb-4'>
                      <div>
                        {
                          item.action === "likes" ? (
                            <IoHeart className='text-pink-700 text-3xl' />
                          ) : (
                            <FaRetweet className='text-green-400/80 text-2xl' />
                          )
                        }
                      </div>
                      <div>
                        <div className='flex gap-x-2 mb-2'>
                          {
                            item.action === "likes" ? (
                              display.map((u: groupedType) => ((
                                <Image key={u.likerId} alt="profilePicture" width={200} height={200} src={u.likerProfilePicture} className='w-8 h-8 rounded-full bg-gray-600 object-cover' />
                              )))
                            ) : (
                              display.map((u: groupedType) => ((
                                <Image key={u.repostId} alt="profilePicture" width={200} height={200} src={u.reposterProfilePicture} className='w-8 h-8 rounded-full bg-gray-600 object-cover' />
                              )))
                            )
                          }
                        </div>
                        {
                          item.action === "likes" ? (
                            <div className='font-bold mb-2'>
                              {likeUsers} <span className='font-light'>liked your post</span>
                            </div>
                          ) : (
                            <div className='font-bold mb-2'>
                              {repostUsers} <span className='font-light'>reposted your reply</span>
                            </div>
                          )
                        }
                        <div className='text-gray-400/80 font-light leading-5 mb-4'>
                          {item.text !== "" ? item.text : item.imageUrl}
                        </div>
                      </div>
                    </div>
                  )
                case "reply":
                  return (
                    <div key={item.id} className='flex items-top gap-x-2 border-b border-gray-600/60 mb-4'>
                      <div>
                        {
                          item.action === "likes" ? (
                            <IoHeart className='text-pink-700 text-3xl' />
                          ) : (
                            <FaRetweet className='text-green-400/80 text-2xl' />
                          )
                        }
                      </div>
                      <div>
                        <div className='flex gap-x-2 mb-2'>
                          {
                            item.action === "likes" ? (
                              display.map((u: groupedType) => ((
                                <Image key={u.likerId} alt="profilePicture" width={200} height={200} src={u.likerProfilePicture} className='w-8 h-8 rounded-full bg-gray-600 object-cover' />
                              )))
                            ) : (
                              display.map((u: groupedType) => ((
                                <Image key={u.repostId} alt="profilePicture" width={200} height={200} src={u.reposterProfilePicture} className='w-8 h-8 rounded-full bg-gray-600 object-cover' />
                              )))
                            )
                          }
                        </div>
                        {
                          item.action === "likes" ? (
                            <div className='font-bold mb-2'>
                              {likeUsers} <span className='font-light'>liked your post</span>
                            </div>
                          ) : (
                            <div className='font-bold mb-2'>
                              {repostUsers} <span className='font-light'>reposted your reply</span>
                            </div>
                          )
                        }
                        <div className='text-gray-400/80 font-light leading-5 mb-4'>
                          {item.text !== "" ? item.text : item.imageUrl}
                        </div>
                      </div>
                    </div>
                  )
              }
            })
          }


          {/* Reply */}
          <div className="border-b border-gray-600/50 flex cursor-pointer hover:bg-white/2">
            <div className='min-w-8 h-8 rounded-full bg-gray-600'></div>
            <div>
              <div className="ml-4 w-full">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="font-semibold hover:border-b-2 border-white">NOUZEN</div>
                    <div className="text-white/50 text-sm ml-1">Nouzen44</div>
                    <div className="text-white/50 text-sm"> <BsDot /> </div>
                    <div className="text-white/50 text-sm"> 1 hour ago </div>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <div>Grok</div>
                    <div>
                      <BsThreeDots />
                    </div>
                  </div>
                </div>
                <div className="pb leading-4.5 text-[15px] mt-2">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit repellat perspiciatis consequuntur sunt, delectus nemo fuga illo velit, earum voluptate minima! Itaque necessitatibus, laboriosam enim rerum fuga voluptates similique placeat.
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-white/50 text-[18px] ">
                  <HiChatBubbleLeft />
                </div>
                <div className="flex items-center text-white/50 text-[18px]">
                  <FaRetweet />
                </div>
                <div className="flex items-center text-white/50 text-[18px]">
                  <IoHeart />
                </div >
                <div className="flex items-center text-white/50 text-[18px]" >
                  <button className="flex rounded-full bg-transparent hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 text-white/35 items-end cursor-pointer space-x-1"> <IoStatsChart /><div className="mt-[3px] text-xs">1</div></button>
                </div>
                <div className="flex text-white/50 items-center space-x-0 text-[18px]">
                  <Bookmark />
                  <button className="rounded-full bg-transparent hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 text-white/50 cursor-pointer"> <FiShare /> </button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value='Verified' className='min-h-160 p-4'>
          <div>
            Hello world 2
          </div>
        </TabsContent>
        <TabsContent value='Mentions' className='min-h-160 p-4'>
          <div>
            Hello world 3
          </div>
        </TabsContent>
      </Tabs>
    </div >
  )
}

export default notifications
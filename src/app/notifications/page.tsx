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

type likesType = {
  postId: string,
  postText: string,
  postImageUrl: string,
  likerId: string,
  likerUsername: string,
  likerDisplayName: string,
  likerProfilePicture: string
}

type groupedLIkesType = {
  [postId: string]: {
    postText: string,
    postImageUrl: string,
    likers: likesType[]
  }
}


const notifications = async () => {
  const supabase = await createClient()
  const { data: user, error } = await supabase.auth.getUser()
  if (error) {
    console.log("NOTIFICATIONS SUPABASE GETUSER() ERROR", error)
    return
  }

  const response = await fetch(`/api/posts?userId=${user.user?.id}`)
  const res = await response.json()
  const getNotifLikes = res.likesNotif

  const groupedLikes: groupedLIkesType = {}
  getNotifLikes.forEach((item: likesType) => {
    if (!groupedLikes[item.postId]) {
      groupedLikes[item.postId] = {
        postText: item.postText,
        postImageUrl: item.postImageUrl,
        likers: []
      }

    }
    groupedLikes[item.postId].likers.push(item)
  })

  const groupedLikesArray = Object.entries(groupedLikes)


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
            groupedLikesArray.map(([postId, data]) => {
              const filteredLikers = data.likers.filter((l) => l.likerId !== user.user?.id)
              if (filteredLikers.length === 0) return null;

              const display = filteredLikers.length > 1 ? filteredLikers.slice(0, 2) : filteredLikers.slice(0, 1);
              const otherAccount = filteredLikers.length - display.length
              const allLikers = display.map(liker => liker.likerUsername).join(", ") + (otherAccount > 0 ? `and ${otherAccount} others` : '')


              return (
                <div key={postId} className='flex items-top gap-x-2 border-b border-gray-600/60 mb-4'>
                  <div> <IoHeart className='text-pink-700 text-3xl' /> </div>
                  <div>
                    <div className='flex gap-x-2 mb-2'>
                      {
                        display.map((l, idx) => ((
                          <Image key={idx} alt="profilePicture" width={200} height={200} src={l.likerProfilePicture} className='w-8 h-8 rounded-full bg-gray-600 object-cover' />
                        )))
                      }
                    </div>
                    <div className='font-bold mb-2'>
                      {allLikers} liked your post
                    </div>
                    <div className='text-gray-400/80 font-light leading-5 mb-4'>
                      {data.postText !== "" ? data.postText : data.postImageUrl}
                    </div>
                  </div>
                </div>
              )
            }
            )
          }
          {/* Likes */}


          {/* Repost */}
          <div className='flex items-top gap-x-2 border-b border-gray-600/60 mb-4'>
            <div> <FaRetweet className='text-green-400/80 text-2xl' /> </div>
            <div>
              <div className='flex gap-x-2 mb-2'>
                <div className='w-8 h-8 rounded-full bg-gray-600'></div>
                <div className='w-8 h-8 rounded-full bg-gray-600'></div>
              </div>
              <div className='font-bold mb-2'>
                Farhan and Nori liked your post
              </div>
              <div className='text-gray-400/80 font-light leading-5 mb-4'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum corrupti, consequuntur id eveniet optio, itaque tempore ad voluptatibus sed molestiae sint eius enim reprehenderit rem ut recusandae dolorum repudiandae exercitationem?
              </div>
            </div>
          </div>

          {/* Followed by */}
          <div className='flex items-top gap-x-2 border-b border-gray-600/60 mb-4'>
            <div> <FaUser className='text-blue-400/80 text-2xl' /> </div>
            <div>
              <div className='flex gap-x-2 mb-2'>
                <div className='w-8 h-8 rounded-full bg-gray-600'></div>
                <div className='w-8 h-8 rounded-full bg-gray-600'></div>
              </div>
              <div className='font-bold mb-2'>
                Farhan and Nori liked your post
              </div>
              <div className='text-gray-400/80 font-light leading-5 mb-4'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatum corrupti, consequuntur id eveniet optio, itaque tempore ad voluptatibus sed molestiae sint eius enim reprehenderit rem ut recusandae dolorum repudiandae exercitationem?
              </div>
            </div>
          </div>

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
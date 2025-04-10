import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BackNavigation from '@/components/client-components/BackNavigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RiVerifiedBadgeFill } from 'react-icons/ri';


const verifiedFollowersPage = async ({ params }: { params: Promise<{ username: string }> }) => {
  const { username } = await params;
  console.log(username)

  return (

    <div className='w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50'>
      <BackNavigation user={username} />
      <Tabs defaultValue="verified_followers" >
        <TabsList className="grid grid-cols-3 bg-black/0 text-white/50 font-semibold items-center border-b border-white/15 text-sm">
          <TabsTrigger
            className='hover:bg-white/10 py-3 focus:text-white text-white/50 relative
                       after:content-[""] after:absolute after:bottom-0 after:left-[15%]
                       after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full
                       after:scale-x-0 after:transition-transform after:origin-center
                       data-[state=active]:text-white data-[state=active]:after:scale-x-100 '
            value="verified_followers">
            Verified Followers
          </TabsTrigger>
          <Link href={`/${username}/followers`} className='m-auto w-full cursor-pointer hover:bg-white/10 py-3 focus:text-white text-white/50 relative
                                   after:content-[""] after:absolute after:bottom-0 after:left-[15%]
                                   after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full
                                   after:scale-x-0 after:transition-transform after:origin-center
                                   data-[state=active]:text-white data-[state=active]:after:scale-x-100'>
            <TabsTrigger
              className='w-full h-full'
              value="followers">
              Followers
            </TabsTrigger>
          </Link>
          <Link href={`/${username}/following`} className='m-auto w-full cursor-pointer hover:bg-white/10 py-3 focus:text-white text-white/50 relative
                                     after:content-[""] after:absolute after:bottom-0 after:left-[15%]
                                     after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full
                                     after:scale-x-0 after:transition-transform after:origin-center
                                     data-[state=active]:text-white data-[state=active]:after:scale-x-100'>
            <TabsTrigger
              className='w-full h-full'
              value="following">
              Following
            </TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value='verified_followers' className='m-auto min-w-80 px-4 py-1 min-h-160'>
        <div className='flex mb-5'>
                    <div className="min-w-10 h-10 bg-white/40 rounded-full"></div>
                    <div>
                      <div className='flex justify-between mb-1'>
                        <div className='ml-2 leading-5'>
                          <div className='font-bold flex items-center'> <div>username/displayname</div> <RiVerifiedBadgeFill className='text-blue-400 mt-1 ml-1' /></div>
                          <div className='text-white/50 font-light'>@username</div>
                          <div className='text-white/50 font-light'>category</div>
                        </div>
                        <Button className='bg-white text-black rounded-full font-semibold'>Follow</Button>
                      </div>
                      <div className='ml-2 leading-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci fuga corrupti esse dolorem debitis nesciunt, culpa nemo nam? Vel, at asperiores? Impedit possimus dolorem temporibus nihil enim at quod soluta!</div>
                    </div>
                  </div>
                  <div className='flex mb-5'>
                    <div className="min-w-10 h-10 bg-white/40 rounded-full"></div>
                    <div>
                      <div className='flex justify-between mb-1'>
                        <div className='ml-2 leading-6'>
                          <div className='font-bold flex items-center'> <div>username/displayname</div> <RiVerifiedBadgeFill className='text-blue-400 mt-1 ml-1' /></div>
                          <div className='text-white/50 font-light'>@username</div>
                          <div className='text-white/50 font-light'>category</div>
                        </div>
                        <Button className='bg-white text-black rounded-full font-semibold'>Follow</Button>
                      </div>
                      <div className='ml-2 leading-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci fuga corrupti esse dolorem debitis nesciunt, culpa nemo nam? Vel, at asperiores? Impedit possimus dolorem temporibus nihil enim at quod soluta!</div>
                    </div>
                  </div>
        </TabsContent>
      </Tabs>

    </div>

  )
}

export default verifiedFollowersPage
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BackNavigation from '@/components/client-components/BackNavigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { db } from '@/lib/db';
import { profiles } from '@/lib/db/schema';
import Image from 'next/image';
import { createClient } from '@/utils/supabase/server';
import FollowButton from '@/components/client-components/FollowButton';
import { BsThreeDots } from 'react-icons/bs';
import { FaRegCircle, FaRegEnvelope } from 'react-icons/fa';
import { HiMiniMagnifyingGlass } from 'react-icons/hi2';
import { LuBellPlus } from 'react-icons/lu';
import { Follows, Profiles, UserLogin } from '@/types';


const followersPage = async ({ params }: { params: Promise<{ username: string }> }) => {

  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser()
  if (error) {
    console.log(error)
  }


  const { username } = await params;

  const getOneProfiles = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.username, username)
  })

  const userId = getOneProfiles?.id
  const getFollowers = await db.query.follows.findMany({
    where: (follows, { eq }) => eq(follows.following, userId as string),
    with: {
      followers: true
    }
  })


  const userLoginFollowingList = await db.query.follows.findMany({
    where: (follows, { eq }) => eq(follows.profilesId, user.user?.id as string)
  })

  const userLoginFollowingListIds = userLoginFollowingList.map(following => following.following)



  // console.log(getFollowers)

  return (
    <div className='w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50'>
      <BackNavigation user={username} />
      <Tabs defaultValue="followers" >
        <TabsList className="grid grid-cols-3 bg-black/0 text-white/50 font-semibold items-center border-b border-white/15 text-sm">
          <Link href={`/${username}/verified_followers`} className='m-auto w-full cursor-pointer hover:bg-white/10 py-3 focus:text-white text-white/50 relative
                               after:content-[""] after:absolute after:bottom-0 after:left-[15%]
                               after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full
                               after:scale-x-0 after:transition-transform after:origin-center
                               data-[state=active]:text-white data-[state=active]:after:scale-x-100'>
            <TabsTrigger
              className='w-full h-full'
              value="verifiedFollowers">
              Verified Followers
            </TabsTrigger>
          </Link>
          <TabsTrigger
            className='hover:bg-white/10 py-3 focus:text-white text-white/50 relative
                       after:content-[""] after:absolute after:bottom-0 after:left-[15%]
                       after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full
                       after:scale-x-0 after:transition-transform after:origin-center
                       data-[state=active]:text-white data-[state=active]:after:scale-x-100'
            value="followers">
            Followers
          </TabsTrigger>
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
        <TabsContent value='followers' className='m-auto min-w-80 py-1 min-h-160'>

          {
            getFollowers.map((getFollower) => {
              const isMe = user.user?.id === getFollower.followers?.id
              const isUserLoginFollowing = userLoginFollowingListIds.includes(getFollower.followers?.id as string)

              return (

                <Link key={getFollower.followers?.id} href={`/${getFollower.followers?.username}`} className='flex mb-5 min-w-153 px-4'>
                  <Image alt='profilePicture' src={getFollower.followers?.profilePicture as string} width={300} height={300} className="object-cover w-10 h-10 bg-white/40 rounded-full" />
                  <div className='w-full'>
                    <div className='flex justify-between mb-1 overflow-hidden w-full'>
                      <div className='ml-2 leading-5 w-full'>
                        <div className='font-bold flex items-center'> <div>{getFollower.followers?.displayName ? getFollower.followers?.displayName : getFollower.followers?.username} </div> <RiVerifiedBadgeFill className='text-blue-400 mt-1 ml-1' /></div>
                        <div className='text-white/50 font-light'>@{getFollower.followers?.username}</div>
                        <div className='text-white/50 font-light'> {getFollower.followers?.category} </div>
                      </div>
                      {
                        !isMe && (
                          <FollowButton userLogin={user.user?.user_metadata as UserLogin} userId={user.user?.id} targetUsername={getFollower.followers?.username as string} targetUserId={getFollower.followers?.id as string} isFollowed={isUserLoginFollowing} />
                        )
                      }
                    </div>
                    <div className='ml-2 leading-5'> {getFollower.followers?.bio} </div>
                  </div>
                </Link>
              )
            })
          }





        </TabsContent>
      </Tabs>

    </div >
  )
}

export default followersPage
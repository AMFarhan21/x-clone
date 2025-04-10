import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BackNavigation from '@/components/client-components/BackNavigation';
import Link from 'next/link';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import Image from 'next/image';
import FollowButton from '@/components/client-components/FollowButton';
import { createClient } from '@/utils/supabase/server';


const followingPage = async ({ params }: { params: Promise<{ username: string }> }) => {

  const supabase = await createClient();
  const { data: user, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error)
  }

  // console.log(user.user?.user_metadata.username)


  const { username } = await params;
  // console.log(username)

  const getOneProfiles = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.username, username)
  })


  const getFollowings = await db.query.follows.findMany({
    where: (follows, { eq }) => eq(follows.profilesId, getOneProfiles?.id),
    with: {
      following: true,
    }
  })


  const userLoginFollowingList = await db.query.follows.findMany({
    where: (follows, {eq}) => eq(follows.profilesId, user.user?.id)
  })

  const userLoginFollowingListIds = userLoginFollowingList.map(following => following.following)



  return (
    <div className='w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50'>
      <BackNavigation user={username} />
      <Tabs defaultValue="following" >
        <TabsList className="grid grid-cols-3 bg-black/0 text-white/50 font-semibold items-center border-b border-white/15 text-sm">
          <Link href={`/${username}/vellowinggetFollowing.following`} className='m-auto w-full cursor-pointer hover:bg-white/10 py-3 focus:text-white text-white/50 relative
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
          <TabsTrigger
            className='hover:bg-white/10 py-3 focus:text-white text-white/50 relative
                       after:content-[""] after:absolute after:bottom-0 after:left-[15%]
                       after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full
                       after:scale-x-0 after:transition-transform after:origin-center
                       data-[state=active]:text-white data-[state=active]:after:scale-x-100'
            value="following">
            Following
          </TabsTrigger>
        </TabsList>
        <TabsContent value='following' className='m-auto min-w-80 py-1 min-h-160'>
          {
            getFollowings.map(getFollowing => {
              const isMe = getFollowing.following?.username === user.user?.user_metadata.username
              const isUserLoginFollowing = userLoginFollowingListIds.includes(getFollowing.following?.id) 

              return (
                <Link key={getFollowing.following?.id} href={`/${getFollowing.following?.username}`} className='flex mb-5 min-w-153 px-4'>
                  <Image alt="profilePicture" src={getFollowing.following?.profilePicture} width={300} height={300} className="object-cover w-10 h-10 bg-white/40 rounded-full" />
                  <div className='w-full'>
                    <div className='flex justify-between mb-1 w-full'>
                      <div className='ml-2 leading-5 w-full'>
                        <div className='font-bold flex items-center'> <div> {getFollowing.following?.displayName ? getFollowing.following.displayName : getFollowing.following?.username} </div> <RiVerifiedBadgeFill className='text-blue-400 mt-1 ml-1' /></div>
                        <div className='text-white/50 font-light'>@{getFollowing.following?.username}</div>
                        <div className='text-white/50 font-light'>{getFollowing.following?.category}</div>
                      </div>
                      {
                        !isMe && (
                          <FollowButton  userLogin={user.user?.user_metadata} userId={user.user?.id} targetUsername={getFollowing.following?.username} targetUserId={getFollowing.following?.id} isFollowed={isUserLoginFollowing}  />
                        )
                      }

                    </div>
                    <div className='ml-2 leading-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci fuga corrupti esse dolorem debitis nesciunt, culpa nemo nam? Vel, at asperiores? Impedit possimus dolorem temporibus nihil enim at quod soluta!</div>
                  </div>
                </Link>
              )
            })
          }
        </TabsContent>
      </Tabs>

    </div>
  )
}

export default followingPage
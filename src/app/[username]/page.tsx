import BackNavigation from '@/components/client-components/BackNavigation';
import DayJs from '@/components/client-components/DayJs';
import EditProfile from '@/components/client-components/EditProfile';
import FollowButton from '@/components/client-components/FollowButton';
import Posts from '@/components/client-components/posts';
import Replies from '@/components/client-components/replies';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/lib/db';
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaRetweet } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { MdCalendarMonth } from 'react-icons/md';
import { RiLinkM, RiVerifiedBadgeFill } from 'react-icons/ri';

const ProfilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
    const supabase = await createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error) { console.log(error) }

    const userId = user.user?.id

    // targetUserId
    const { username } = await params
    

    const response = await fetch(`http://localhost:3000/api/profiles?userId=${userId}&username=${username}`)
    const data = await response.json()
    // console.log(data.isFollowed[0].isFollowed)
    // console.log(data.userProfiles[0].username)
    // console.log(user.user?.user_metadata.username)
    console.log(data.getOneProfiles.username)


    const imageArray = data.posts.flatMap((post) => {
        return post.imageUrl ? JSON.parse(post.imageUrl) : [];
    })

    return (
        <div className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
            {
                user.user?.user_metadata.username === username ? (
                    <>
                        <BackNavigation user={data.userProfiles[0].username} />
                        <div>
                            {
                                data.userProfiles[0].backgroundPicture ? (
                                    <Image alt='backgroundPicture' src={data.userProfiles[0].backgroundPicture} width={500} height={500} loading='eager' className='w-full h-[27vh] bg-gray-600 cursor-pointer object-cover' />
                                ) : (
                                    <div className='w-full h-[27vh] bg-gray-600 cursor-pointer'></div>
                                )
                            }
                            <div>
                                <div className='flex'>

                                    {
                                        data.userProfiles[0].profilePicture ? (
                                            <Image alt='profilePicture' src={data.userProfiles[0].profilePicture}  width={300} height={300} loading="eager" className='w-33 h-33 bg-gray-600 rounded-full mx-6 mb-7 mt-[-70px] border-3 border-black cursor-pointer object-cover' />
                                        ) : (
                                            <div className='w-33 h-33 bg-gray-600 rounded-full mx-6 mb-7 mt-[-70px] border-3 border-black cursor-pointer'></div>
                                        )
                                    }

                                    <EditProfile userId={userId} userProfiles={data.userProfiles[0]} />
                                </div>
                                <div className='mx-4 mb-5 space-y-2'>
                                    <div>
                                        <div className='flex space-x-4 items-center'>
                                            <div className='font-bold text-xl'> {data.userProfiles[0].displayName ? data.userProfiles[0].displayName : data.userProfiles[0].username} </div>
                                            <Button className='h-6 rounded-full border border-white/50 bg-black font-bold cursor-pointer my-auto'><RiVerifiedBadgeFill className='text-blue-400' />Get verified</Button>
                                        </div>
                                        <div className='text-white/50 text-base font-light'> @{data.userProfiles[0].username} </div>
                                    </div>
                                    <div>
                                        {data.userProfiles[0].bio}
                                    </div>
                                    <div className='flex space-x-4 text-white/50 text-base font-light items-center flex-wrap'>
                                        {data.userProfiles[0].location && <div className='flex items-center gap-x-1'><IoLocationOutline className='text-[17px]' /> <div>{data.userProfiles[0].location} </div></div>}
                                        {data.userProfiles[0].website && <div className='flex items-center gap-x-1'><RiLinkM className='text-white/50 text-[17px]' /> <div className='text-blue-400'> <Link href={data.userProfiles[0].website.slice(0, 3) === "htt" || data.userProfiles[0].website.slice(0, 3) === "www" ? data.userProfiles[0].website : `https://www.${data.userProfiles[0].website}`}>{data.userProfiles[0].website}</Link> </div></div>}
                                        <div className='flex gap-x-1 items-center'><MdCalendarMonth className='text-[17px] font-light' /> Joined <DayJs date={data.userProfiles[0].created_at} profilesCreated={data.userProfiles[0].created_at} /> </div>
                                    </div>
                                    <div className='flex space-x-5'>
                                        <div className='text-white/50 text-base font-light'><span className='font-bold text-white'>{data.userProfiles[0].followingsCount} </span>Following</div>
                                        <div className='text-white/50 text-base font-light'><span className='font-bold text-white'>{data.userProfiles[0].followersCount} </span>Followers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <BackNavigation user={data.getOneProfiles.username} />
                        <div>
                            {
                                data.getOneProfiles.backgroundPicture ? (
                                    <Image alt='backgroundPicture' src={data.getOneProfiles.backgroundPicture} width={500} height={500} className='w-full h-[27vh] bg-gray-600 cursor-pointer object-cover' />
                                ) : (
                                    <div className='w-full h-[27vh] bg-gray-600 cursor-pointer'></div>
                                )
                            }
                            <div>
                                <div className='flex'>

                                    {
                                        data.getOneProfiles.profilePicture ? (
                                            <Image alt='profilePicture' src={data.getOneProfiles.profilePicture} width={300} height={300} loading="eager" className='w-36 h-36 bg-gray-600 rounded-full mx-6 mb-5 mt-[-70px] border-3 border-black cursor-pointer object-cover' />
                                        ) : (
                                            <div className='w-33 h-33 bg-gray-600 rounded-full mx-6 mb-7 mt-[-70px] border-3 border-black cursor-pointer'></div>
                                        )
                                    }



                                    <FollowButton userId={userId} targetUsername={data.getOneProfiles.username} targetUserId={data.getOneProfiles.id} isFollowed={data.isFollowed[0].isFollowed} />

                                </div>
                                <div className='mx-4 mb-5 space-y-2'>
                                    <div>
                                        <div className='flex space-x-4 items-center'>
                                            <div className='font-bold text-xl'> {data.getOneProfiles.displayName ? data.getOneProfiles.displayName : data.getOneProfiles.username} </div>
                                            {
                                                user.user?.user_metadata.username === username && <Button className='h-6 rounded-full border border-white/50 bg-black font-bold cursor-pointer my-auto'><RiVerifiedBadgeFill className='text-blue-400' />Get verified</Button>
                                            }
                                        </div>
                                        <div className='text-white/50 text-base font-light'> @{data.getOneProfiles.username} </div>
                                    </div>
                                    <div>
                                        {data.getOneProfiles.bio}
                                    </div>
                                    <div className='flex space-x-4 text-white/50 text-base font-light items-center flex-wrap'>
                                        {data.getOneProfiles.location && <div className='flex items-center gap-x-1'><IoLocationOutline className='text-[17px]' /> <div>{data.getOneProfiles.location} </div></div>}
                                        {data.getOneProfiles.website && <div className='flex items-center gap-x-1'><RiLinkM className='text-white/50 text-[17px]' /> <div className='text-blue-400'> <Link href={data.getOneProfiles.website.slice(0, 3) === "htt" || data.getOneProfiles.website.slice(0, 3) === "www" ? data.getOneProfiles.website : `https://www.${data.getOneProfiles.website}`}>{data.getOneProfiles.website}</Link> </div></div>}
                                        <div className='flex gap-x-1 items-center'><MdCalendarMonth className='text-[17px] font-light' /> Joined <DayJs date={data.getOneProfiles.created_at} profilesCreated={data.getOneProfiles.created_at} /> </div>
                                    </div>
                                    <div className='flex space-x-5'>
                                        <div className='text-white/50 text-base font-light'><span className='font-bold text-white'>{data.getOneProfiles.followingsCount}</span> Following</div>
                                        <div className='text-white/50 text-base font-light'><span className='font-bold text-white'>{data.getOneProfiles.followersCount}</span> Followers</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }



            <Tabs defaultValue="posts">
                <TabsList className="grid grid-cols-6 bg-black/0 text-white/50 font-semibold items-center w-full border-b border-white/15 text-sm">
                    <TabsTrigger
                        className='hover:bg-white/10 py-3 focus:text-white relative after:content-[""]
                        after:absolute after:bottom-0 after:left-[15%] after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full after:scale-x-0
                        data-[state=active]:after:scale-x-100 after:transition-transform after:origin-center'
                        value="posts">
                        Posts
                    </TabsTrigger>
                    <TabsTrigger
                        className='hover:bg-white/10 py-3 focus:text-white relative after:content-[""]
                        after:absolute after:bottom-0 after:left-[15%] after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full after:scale-x-0
                        data-[state=active]:after:scale-x-100 after:transition-transform after:origin-center '
                        value="replies">
                        Replies
                    </TabsTrigger>
                    <TabsTrigger
                        className='hover:bg-white/10 py-3 focus:text-white relative after:content-[""]
                        after:absolute after:bottom-0 after:left-[15%] after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full after:scale-x-0
                        data-[state=active]:after:scale-x-100 after:transition-transform after:origin-center '
                        value="highlights">
                        Highlights
                    </TabsTrigger>
                    <TabsTrigger
                        className='hover:bg-white/10 py-3 focus:text-white relative after:content-[""]
                        after:absolute after:bottom-0 after:left-[15%] after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full after:scale-x-0
                        data-[state=active]:after:scale-x-100 after:transition-transform after:origin-center '
                        value="article">
                        Article
                    </TabsTrigger>
                    <TabsTrigger
                        className='hover:bg-white/10 py-3 focus:text-white relative after:content-[""]
                        after:absolute after:bottom-0 after:left-[15%] after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full after:scale-x-0
                        data-[state=active]:after:scale-x-100 after:transition-transform after:origin-center '
                        value="media">
                        Media
                    </TabsTrigger>
                    <TabsTrigger
                        className='hover:bg-white/10 py-3 focus:text-white relative after:content-[""]
                        after:absolute after:bottom-0 after:left-[15%] after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full after:scale-x-0
                        data-[state=active]:after:scale-x-100 after:transition-transform after:origin-center '
                        value="likes">
                        Likes
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="posts" className='min-h-160'>
                    <div>
                        {data.posts.map((post) => (
                            <div key={post.id}>
                                {post.isRePosted && <div className='text-sm text-white/50 font-semibold flex items-center gap-x-2 ml-10 mt-[8px] mb-[-9px]'><FaRetweet className='text-base' /> You reposted</div>}
                                <Posts userProfiles={data.userProfiles} post={post} userId={userId} />
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value='replies' className='min-h-160'>
                    <div>
                        {data.replies.map(reply => (
                            <div key={reply.id}>
                                {reply.isReplyReposted && <div className='text-sm text-white/50 font-semibold flex items-center gap-x-2 ml-10 mt-[8px] mb-[-9px]'><FaRetweet className='text-base' /> You reposted</div>}
                                <Replies userProfiles={data.userProfiles} reply={reply} userId={userId} post={data.posts} username={username} />
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value='highlights' className='m-auto flex flex-col w-80 py-6 min-h-160'>
                    <div className='text-3xl font-bold mb-1'>Hightlight on your profile</div>
                    <div className='text-white/50 font-thin mb-6'>You must be subscribed to Premium to highlight posts on your profile.</div>
                    <button className='rounded-full bg-white text-black font-bold py-3 text-base max-w-60'>Subscribe to Premium</button>
                </TabsContent>
                <TabsContent value='article' className='m-auto flex flex-col w-80 py-6 min-h-160'>
                    <div className='text-3xl font-bold mb-1'>Write Articles on X</div>
                    <div className='text-white/50 font-thin mb-6'>You must be subscribed to Premium to highlight posts on your profile.</div>
                    <button className='rounded-full bg-white text-black font-bold py-3 text-base max-w-60'>Subscribe to Premium</button>
                </TabsContent>
                <TabsContent value='media' className='m-auto flex flex-col w-80 py-6 min-h-160'>
                    <div className='text-3xl font-bold mb-1'>Lights, camera … attachments!</div>
                    <div className='text-white/50 font-thin mb-6'>When you post photos or videos, they will show up here.</div>
                </TabsContent>
                <TabsContent value='likes' className='m-auto flex flex-col w-80 py-6 min-h-160'>
                    <div className='text-3xl font-bold mb-1'>You don’t have any likes yet</div>
                    <div className='text-white/50 font-thin mb-6'>Tap the heart on any post to show it some love. When you do, it’ll show up here.</div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default ProfilePage
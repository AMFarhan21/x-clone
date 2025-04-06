import BackNavigation from '@/components/client-components/BackNavigation';
import DayJs from '@/components/client-components/DayJs';
import EditProfile from '@/components/client-components/EditProfile';
import Posts from '@/components/client-components/posts';
import Replies from '@/components/client-components/replies';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/utils/supabase/server'
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
    const { username } = await params

    const response = await fetch(`http://localhost:3000/api/profiles?userId=${userId}`)
    const data = await response.json()
    // console.log(data.posts)

    return (
        <div className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
            <BackNavigation user={data.userProfiles} />
            <div>
                {
                    data.userProfiles.backgroundPicture ? (
                        <img src={data.userProfiles.backgroundPicture} className='w-full h-[27vh] bg-gray-600 cursor-pointer object-cover' />
                    ) : (
                        <div className='w-full h-[27vh] bg-gray-600 cursor-pointer'></div>
                    )
                }
                <div>
                    <div className='flex'>

                        {
                            data.userProfiles.profilePicture ? (
                                <img src={data.userProfiles.profilePicture} className='w-33 h-33 bg-gray-600 rounded-full mx-6 mb-7 mt-[-70px] border-3 border-black cursor-pointer object-cover' />
                            ) : (
                                <div className='w-33 h-33 bg-gray-600 rounded-full mx-6 mb-7 mt-[-70px] border-3 border-black cursor-pointer'></div>
                            )
                        }

                        <EditProfile userId={userId} userProfiles={data.userProfiles} />
                    </div>
                    <div className='mx-4 mb-5 space-y-2'>
                        <div>
                            <div className='flex space-x-4 items-center'>
                                <div className='font-bold text-xl'> {data.userProfiles.displayName ? data.userProfiles.displayName : data.userProfiles.username} </div>
                                <Button className='h-6 rounded-full border border-white/50 bg-black font-bold cursor-pointer my-auto'><RiVerifiedBadgeFill className='text-blue-400' />Get verified</Button>
                            </div>
                            <div className='text-white/50 text-base font-light'> @{data.userProfiles.username} </div>
                        </div>
                        <div>
                            {data.userProfiles.bio}
                        </div>
                        <div className='flex space-x-4 text-white/50 text-base font-light items-center flex-wrap'>
                            {data.userProfiles.location && <div className='flex items-center gap-x-1'><IoLocationOutline className='text-[17px]' /> <div>{data.userProfiles.location} </div></div>}
                            {data.userProfiles.website && <div className='flex items-center gap-x-1'><RiLinkM className='text-white/50 text-[17px]' /> <div className='text-blue-400'> <Link href={data.userProfiles.website.slice(0, 3) === "htt" || data.userProfiles.website.slice(0, 3) === "www" ? data.userProfiles.website : `https://www.${data.userProfiles.website}` }>{data.userProfiles.website}</Link> </div></div>}
                            <div className='flex gap-x-1 items-center'><MdCalendarMonth className='text-[17px] font-light' /> Joined <DayJs date={data.userProfiles.created_at} profilesCreated={data.userProfiles.created_at} /> </div>
                        </div>
                        <div className='flex space-x-5'>
                            <div className='text-white/50 text-base font-light'><span className='font-bold text-white'>10</span> Following</div>
                            <div className='text-white/50 text-base font-light'><span className='font-bold text-white'>35</span> Followers</div>
                        </div>
                    </div>
                </div>
            </div>


            <Tabs defaultValue="posts">
                <TabsList className="grid grid-cols-6 bg-black/0 text-white/50 font-semibold items-center w-full border-b border-white/15 text-sm">
                    <TabsTrigger
                        className='hover:bg-white/10 py-3 focus:text-white relative after:content-[""]
                        after:absolute after:bottom-0 after:left-[15%] after:w-[70%] after:h-[3px] after:bg-blue-400 after:rounded-full after:scale-x-0
                        data-[state=active]:after:scale-x-100 after:transition-transform after:origin-center '
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
                                {post.isRePosted && <div className='text-sm text-white/50 font-semibold flex items-center gap-x-2 ml-10'><FaRetweet className='text-base' /> You reposted</div>}
                                <Posts post={post} userId={userId} />
                            </div>
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value='replies' className='min-h-160'>
                    <div>
                        {data.replies.map(reply => (
                            <Replies key={reply.id} reply={reply} userId={userId} post={data.posts} username={username} />
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
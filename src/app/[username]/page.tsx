import BackNavigation from '@/components/client-components/BackNavigation';
import DayJs from '@/components/client-components/DayJs';
import Posts from '@/components/client-components/posts';
import Replies from '@/components/client-components/replies';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/utils/supabase/server'
import React from 'react'
import { MdCalendarMonth } from 'react-icons/md';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

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
                <div className='w-full h-[27vh] bg-gray-600 cursor-pointer'></div>
                <div>
                    <div className='flex'>
                        <div className='w-33 h-33 bg-gray-600 rounded-full mx-6 mb-7 mt-[-70px] border-3 border-black cursor-pointer'></div>
                        <Button className='ml-auto mr-3 mt-3 rounded-full border border-white/50 bg-black font-bold cursor-pointer'>Edit profile</Button>
                    </div>
                    <div className='mx-4 mb-5 space-y-2'>
                        <div>
                            <div className='flex space-x-4 items-center'>
                                <div className='font-bold text-xl'> {data.userProfiles.username} </div>
                                <Button className='h-6 rounded-full border border-white/50 bg-black font-bold cursor-pointer my-auto'><RiVerifiedBadgeFill className='text-blue-400' />Get verified</Button>
                            </div>
                            <div className='text-white/50 text-base font-light'> @{data.userProfiles.username} </div>
                        </div>
                        <div className='flex gap-x-1 text-white/50 text-base font-light items-center'><MdCalendarMonth className='text-base font-light' /> Joined <DayJs date={data.userProfiles.created_at} /> </div>
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
                <TabsContent value="posts">
                    <div>
                        {data.posts.map((post) => (
                            <Posts key={post.id} post={post} userId={userId} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value='replies'>
                    <div>
                        {data.replies.map(reply => (
                            <Replies key={reply.id} reply={reply} userId={userId} post={data.posts} username={username} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value='highlights'>
                    highlights
                </TabsContent>
                <TabsContent value='article'>
                    article
                </TabsContent>
                <TabsContent value='media'>
                    media
                </TabsContent>
                <TabsContent value='likes'>
                    likes
                </TabsContent>
            </Tabs>





        </div>
    )
}

export default ProfilePage
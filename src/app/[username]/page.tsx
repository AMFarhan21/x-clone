import Posts from '@/components/client-components/posts';
import Replies from '@/components/client-components/replies';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createClient } from '@/utils/supabase/server'
import React from 'react'

const ProfilePage = async ({ params }: { params: Promise<{ username: string }> }) => {
    const supabase = await createClient();
    const { data: user, error } = await supabase.auth.getUser();
    if (error) {console.log(error)}

    const userId = user.user?.id
    const { username } = await params

    const response = await fetch(`http://localhost:3000/api/profiles?userId=${userId}`)
    const data = await response.json()
    // console.log(user)

    return (
        <div className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
            <div>
                HALO INI ADALAH HALAMAN PROFILE
            </div>


            <Tabs defaultValue="posts">
                <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="posts">Posts</TabsTrigger>
                    <TabsTrigger value="replies">Replies</TabsTrigger>
                    <TabsTrigger value="highlights">Highlights</TabsTrigger>
                    <TabsTrigger value="article">Article</TabsTrigger>
                    <TabsTrigger value="media">Media</TabsTrigger>
                    <TabsTrigger value="likes">Likes</TabsTrigger>
                </TabsList>
                <TabsContent value="posts">
                    <div>
                        {data.posts.map((post) => (
                            <Posts key={post.id} post={post} userId={user} />
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

import ComposeTweet from "./client-components/compose-tweet";
import { createServiceRoleClient } from "@/utils/supabase/serverSecret";

import Posts from "./client-components/posts";
import { createClient } from "@/utils/supabase/server";


export interface Post {
  id: string;
  text: string;
  imageUrl: string;
  profilesId: string;
  created_at: string;
  updated_at: string;
  username: string;
  full_name: string;
  likesCount: number;
  isLiked: boolean;
}


const MainComponent = async () => {

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user?.id


  const response = await fetch(`http://localhost:3000/api/posts?user=${user}`)
  const posts = await response.json()

  // console.log(posts)




  return (
    <main className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
      <div className="text-sm font-bold flex justify-around py-5 border-b border-gray-600/50 w-full backdrop-blur-md bg-black/10 sticky top-0">
        <div>For you</div>
        <div>Following</div>
      </div>

      {/* CREATE POST */}
      <ComposeTweet />


      {/* LIST OF POSTS */}
      <div className="flex flex-col">
        {
          posts.result.map((post: Post) => (
            <Posts key={post.id} post={post} userId={user || ""} />
          ))
        }
      </div>
    </main>
  )
}

export default MainComponent
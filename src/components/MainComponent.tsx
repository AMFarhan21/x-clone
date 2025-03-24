
import ComposeTweet from "./client-components/compose-tweet";
import { createServiceRoleClient } from "@/utils/supabase/serverSecret";

import Posts from "./client-components/posts";
import { getPosts } from "./server-components/fetch-data";
import { createClient } from "@/utils/supabase/server";


const MainComponent = async () => {

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData.user?.id
  // console.log("SUCCESS MainComponent/getPosts -> getUser:", user)
  // console.log("ERROR MainComponent/getPosts -> getUser: ", userError)

  
  const posts = await getPosts(user);




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
          posts?.map(post => (
            <Posts key={post.id} post={post} />
          ))
        }
      </div>
    </main>
  )
}

export default MainComponent
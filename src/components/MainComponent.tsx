import Posts from "./client-components/posts";
import { createClient } from "@/utils/supabase/server";
import ComposePost from "./client-components/compose-post";
import { Post } from "@/types";
import AuthModel from "./client-components/AuthModel";

const MainComponent = async () => {

  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error)
  }
  const userId = userData.user?.id
  // console.log(userData.user)

  // console.log("MAIN COMPONENT ERRRRROOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOR:", error)


  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/posts?userId=${userId}`)
  const posts = await response.json()

  return (
    <main className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
      <AuthModel />
      <div className="flex items-center">
        <div className="hover:bg-white/3 text-sm font-bold flex justify-around py-5 border-b border-gray-600/50 w-full backdrop-blur-md bg-black/3 sticky top-0 cursor-pointer">For you</div>
        <div className="hover:bg-white/3 text-sm font-bold flex justify-around py-5 border-b border-gray-600/50 w-full backdrop-blur-md bg-black/10 sticky top-0 cursor-pointer">Following</div>
      </div>

      {/* CREATE POST */}
      {userId && <ComposePost userProfiles={posts.userProfiles} />}


      {/* LIST OF POSTS */}
      <div className="flex flex-col">
        {
          userId ? posts.result.map((post: Post) => (
            <Posts key={post.id} post={post} userId={userId || ""} userProfiles={posts.userProfiles} />
          )) : <div></div>
        }
      </div>
    </main>
  )
}

export default MainComponent
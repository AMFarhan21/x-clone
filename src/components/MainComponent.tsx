import { BsDot, BsThreeDots } from "react-icons/bs";
import { BiCommentX, BiSolidComment } from "react-icons/bi";
import { FaCommentAlt, FaRegComment, FaRegCommentAlt, FaRetweet } from "react-icons/fa";
import { IoAnalyticsOutline, IoAnalyticsSharp, IoHeartOutline, IoStatsChart } from "react-icons/io5";
import { PiBookmarkSimpleBold, PiBookmarkSimpleLight } from "react-icons/pi";
import { FiShare } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";
import ComposeTweet from "./server-components/compose-tweet";
import { createClient } from "@/utils/supabase/server";



const MainComponent = async () => {

  const supabase = await createClient();
  const { data: posts, error } = await supabase.from("post").select("*");
  console.log("DATA: ", posts);
  console.log("ERROR: ", error);




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
            <div key={post.id} className="border-b border-gray-600/50 flex py-3 px-4">
              <div className="bg-white/50 min-w-10 h-10 rounded-full p">  </div>
              <div className="ml-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="font-semibold">Tsername</div>
                    <div className="text-white/50 text-sm ml-1">@username</div>
                    <div className="text-white/50 text-sm"> <BsDot /> </div>
                    <div className="text-white/50 text-sm">2h</div>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <div>grok</div>
                    <div> <BsThreeDots /> </div>
                  </div>
                </div>
                <div className="pb-4 leading-4.5 text-[15px] mt-1"> {post.text} </div>
                {/* <div> <img src="https://pbs.twimg.com/media/Gl7W5kTXwAAne3c?format=jpg&name=medium" className="rounded-2xl mt-1" /> </div> */}
                <div className="flex justify-between mt-3 items-center">
                  <div className="flex text-white/50 items-end cursor-pointer space-x-1 text-[16px]"> <FaRegCommentAlt /> <div className="text-xs">123</div> </div>
                  <div className="flex text-white/50 items-end cursor-pointer space-x-1 text-xl"> <FaRetweet /> <div className="text-xs">123</div> </div>
                  <div className="flex text-white/50 items-end cursor-pointer space-x-1 text-xl"> <IoHeartOutline /> <div className="text-xs">123</div> </div>
                  <div className="flex text-white/50 items-end cursor-pointer space-x-1 text-[16px]"> <IoStatsChart /> <div className="text-xs">123</div> </div>
                  <div className="flex text-white/50 items-center cursor-pointer space-x-4 ">
                    <div className="text-2xl"> <MdBookmarkBorder /> </div>
                    <div className="text-xl"> <FiShare /> </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default MainComponent
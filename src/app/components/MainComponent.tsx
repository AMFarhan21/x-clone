import { BsDot, BsThreeDots } from "react-icons/bs";
import { BiCommentX, BiSolidComment } from "react-icons/bi";
import { FaCommentAlt, FaRegComment, FaRegCommentAlt, FaRetweet } from "react-icons/fa";
import { IoAnalyticsOutline, IoAnalyticsSharp, IoHeartOutline, IoStatsChart } from "react-icons/io5";
import { PiBookmarkSimpleBold, PiBookmarkSimpleLight } from "react-icons/pi";
import { FiShare } from "react-icons/fi";
import { MdBookmarkBorder } from "react-icons/md";

const MainComponent = () => {
  return (
    <main className="ml-70 w-[600px] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
    <div className="text-sm font-bold flex justify-around py-5 border-b border-gray-600/50 w-full backdrop-blur-md bg-black/10 sticky top-0">
      <div>For you</div>
      <div>Following</div>
    </div>

{/* CREATE POST */}
    <div className="text-sm font-bold flex h-3xl space-x-3 pt-5 pb-2 px-4 border-b border-gray-600/50">
      <div className="min-w-10 h-10 bg-slate-400 rounded-full "></div>
      <div className="flex flex-col w-full pr-4">
        <div className="pb-4">
          <textarea typeof="text" placeholder="What is happening?!" className="min-h-[40px] font-normal text-xl w-full text-wrap border border-transparent focus:outline-none resize-none"></textarea>
        </div>
        <div className="flex justify-between w-full items-center">
          <div className="flex space-x-2 ">
            <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
            <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
            <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
          </div>
          <button className="bg-white/40 py-2 px-5 rounded-full text-black" >Post</button>
        </div>
      </div>
    </div>


{/* LIST OF POSTS */}
    <div className="flex flex-col">
      {
        Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-gray-600/50 flex py-3 px-4">
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
              <div className="pb-4 leading-4.5 text-[15px] mt-1">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam quasi facilis illo unde aperiam facere. Aspernatur quibusdam consequatur quos, quod architecto enim, nulla voluptatem tempora deserunt rem nisi? Iusto, voluptas.</div>
              <div> <img src="https://pbs.twimg.com/media/GlZlOviXAAAOox5?format=jpg&name=small" className="rounded-2xl mt-1" /> </div>
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
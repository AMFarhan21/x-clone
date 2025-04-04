import React from 'react'
import { GoHome } from "react-icons/go";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FaRegBell } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { createClient } from '@/utils/supabase/server';
import { signOut } from '@/lib/action';

const NAVIGATION_ITEMS = [
  {
    title: "Twitter",
    icon: FaXTwitter
  },
  {
    title: "Home",
    icon: GoHome
  },
  {
    title: "Explore",
    icon: HiMiniMagnifyingGlass
  },
  {
    title: "Notifications",
    icon: FaRegBell
  },
  {
    title: "Messages",
    icon: FaRegEnvelope
  },
  {
    title: "Bookmarks",
    icon: FiBookmark
  },
  {
    title: "Profile",
    icon: HiOutlineUser
  },
]

const LeftSidebar = async () => {

  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    console.log(error)
  }

  const username = data.user?.user_metadata.username


  return (
    <section className="w-[24%] flex flex-col items-stretch h-screen space-y-4 sticky top-0">
      <div className="flex flex-col h-full items-stretch mt-1 ml-2 pr-6">
        {NAVIGATION_ITEMS.map((item) => (
          <Link href={item.title === "Twitter" || item.title === "Home" ? '/' : item.title === "Profile" ? `/${username}` : `/${item.title.toLowerCase()}`} key={item.title} className="flex hover:bg-white/10 transition duration-200 text-2xl items-center justify-start w-fit space-x-4 rounded-3xl p-4 py-3">
            <div>
              <item.icon className="text-3xl" />
            </div>
            {item.title !== "Twitter" && <div className="text-xl"> {item.title} </div>}
          </Link>

        ))}
        <button className="w-full bg-white text-black rounded-full p-4 font-bold hover:bg-white/90 transition duration-200">
          Post
        </button>
      </div>

      <form>
        <button formAction={signOut} className='cursor-pointer font-bold hover:bg-gray-400 p-2 rounded-full'>Sign Out</button>
      </form>

      <button className="flex items-center justify-between space-x-4 w-full bg-transparent text-black rounded-full p-4 font-bold hover:bg-white/10 transition duration-200 w-full  pr-3">
        <div className="flex items-center space-x-2">
          <div className="rounded-full bg-white w-9 h-9">

          </div>
          <div className="text-left">
            <div className="text-sm text-white font-semibold">Club of coders</div>
            <div className="text-sm text-white/60 font-normal">@clubofcoders</div>
          </div>
        </div>
        <div className="text-white">
          <BsThreeDots />
        </div>

      </button>
    </section>
  )
}

export default LeftSidebar
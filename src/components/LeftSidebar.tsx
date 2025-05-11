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
import { RiQuillPenAiLine } from 'react-icons/ri';
import { db } from '@/lib/db';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger, } from './ui/dropdown-menu';
import LogoutButton from './client-components/LogoutButton';
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from './ui/dialog';
import ComposePost from './client-components/compose-post';
import { Profiles } from '@/types';

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
    return;
  }

  // const username = data.user?.user_metadata.username


  const userProfiles = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, data.user?.id)
  })

  // console.log(userProfiles)


  return (
    <section className="hidden sticky sm:top-0 sm:w-20 lg:w-[24%] sm:flex sm:flex-col justify-between sm:items-stretch sm:h-screen sm:space-y-4 sm:overflow-y-scroll  ">
      <div className="">
        {NAVIGATION_ITEMS.map((item) => (
          <Link href={item.title === "Twitter" || item.title === "Home" ? '/' : item.title === "Profile" ? `/${userProfiles?.username}` : `/${item.title.toLowerCase()}`} key={item.title}
            className="flex hover:bg-white/10 transition duration-200 text-2xl items-center justify-start w-fit space-x-4 rounded-3xl sm:pl-4 lg:p-4 py-3">
            <div>
              <item.icon className="text-3xl" />
            </div>
            {item.title !== "Twitter" && <div className="text-xl hidden lg:flex"> {item.title} </div>}
          </Link>

        ))}

        <Dialog>
          <DialogTrigger className="my-2 w-full bg-white text-black rounded-full p-4 font-bold hover:bg-white/90 transition duration-200 lg:flex hidden justify-around">Post</DialogTrigger>
          <DialogOverlay className='bg-blue-300/15'></DialogOverlay>
          <DialogContent className='bg-black text-white border border-transparent'>
            <ComposePost userProfiles={userProfiles as Profiles | undefined} />
          </DialogContent>
        </Dialog>

        <div className='lg:hidden flex justify-start pl-2 py-2'>
          <Dialog>
            <DialogTrigger className="min-w-12 h-12 items-center justify-center bg-blue-400 text-white sm:bg-white sm:text-black rounded-full hover:bg-white/90 transition duration-200">
              <RiQuillPenAiLine className='text-2xl items-center justify-center m-auto' />
            </DialogTrigger>
            <DialogOverlay className='bg-blue-300/15'></DialogOverlay>
            <DialogContent className='bg-black text-white border border-transparent'>
              <ComposePost userProfiles={userProfiles as Profiles | undefined} />
            </DialogContent>
          </Dialog>
          <button >
          </button>
        </div>
      </div>


      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-between space-x-4 bg-transparent text-black rounded-full p-4 font-bold hover:bg-white/10 transition duration-200 w-full pr-3">
            <div className="flex items-center space-x-2">
              <Image src={userProfiles?.profilePicture as string} alt='profilePicture' width={300} height={300} className="object-cover rounded-full bg-white min-w-10 min-h-10" />
              <div className="text-left hidden lg:inline-block ">
                <div className="text-sm text-white font-semibold"> {userProfiles?.displayName ? userProfiles.displayName : userProfiles?.username} </div>
                <div className="text-sm text-white/60 font-normal">@{userProfiles?.username}</div>
              </div>
            </div>
            <div className="hidden lg:inline-block text-white">
              <BsThreeDots />
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-70 bg-black rounded-2xl text-white font-bold hover:bg-black shadow-[0px_0px_8px_rgba(255,255,255,0.5)] border border-transparent">
          <DropdownMenuGroup className="">
            <DropdownMenuItem className="hover:bg-white/10 rounded-xl cursor-pointer px-4 py-3 mt-1 text-sm">
              Add an existing account
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10 rounded-xl cursor-pointer px-4 py-3 mb-1 text-sm">
              <LogoutButton username={userProfiles?.username as string} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>


    </section>
  )
}

export default LeftSidebar
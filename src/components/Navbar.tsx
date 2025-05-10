import Link from 'next/link'
import React from 'react'
import { FaRegBell, FaRegEnvelope } from 'react-icons/fa'
import { GoHome } from 'react-icons/go'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import ComposePost from './client-components/compose-post'
import { createClient } from '@/utils/supabase/server'
import { db } from '@/lib/db'
import { Profiles } from '@/types'
import { Dialog, DialogContent, DialogOverlay, DialogTrigger } from './ui/dialog'
import { RiQuillPenAiLine } from 'react-icons/ri'

const NAVIGATION_ITEMS = [
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

]

const Navbar = async () => {

    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error) {
        console.log(error)
    }

    const userProfiles = await db.query.profiles.findFirst({
        where: (profiles, { eq }) => eq(profiles.id, data.user?.id as string)
    })

    return (
        <section className='sm:hidden w-full fixed bottom-0 z-50 bg-black h-14'>

            <div className='flex justify-start pl-2 py-2 sm:hidden absolute right-6 bottom-16'>
                <Dialog>
                    <DialogTrigger className="min-w-12 h-12 items-center justify-center bg-blue-400 text-white sm:bg-white sm:text-black rounded-full hover:bg-white/90 transition duration-200">
                        <RiQuillPenAiLine className='text-2xl items-center justify-center m-auto' />
                    </DialogTrigger>
                    <DialogOverlay className='bg-blue-300/15'></DialogOverlay>
                    <DialogContent className='bg-black text-white border border-transparent sm:hidden'>
                        <ComposePost userProfiles={userProfiles as Profiles | undefined} />
                    </DialogContent>
                </Dialog>
                <button >
                </button>
            </div>
            <div className='flex w-full items-center justify-around h-10 text-3xl align-middle text-center mt-2'>
                {NAVIGATION_ITEMS.map((item) => (
                    <Link key={item.title} href={item.title === "Home" ? "/" : `${item.title.toLowerCase()}`}>
                        <item.icon />
                    </Link>
                ))}
            </div>
        </section>
    )
}

export default Navbar
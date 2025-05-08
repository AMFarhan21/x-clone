import Link from 'next/link'
import React from 'react'
import { FaRegBell, FaRegEnvelope } from 'react-icons/fa'
import { GoHome } from 'react-icons/go'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'

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

const Navbar = () => {


    return (
        <section className='sm:hidden w-full fixed bottom-0 z-50 bg-black h-14'>
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
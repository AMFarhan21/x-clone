import React from 'react'
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";


function RightSection() {
    return (
        <section className="lg:flex hidden flex-col ml-8 my-1 w-[36%] h-screen space-y-4 sticky top-1 overflow-scroll" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {/* SEARCH */}
            <div className=" bg-black sticky top-2">
                <div className="relative w-full h-full">
                    <input id="searchBox" type="text" placeholder="Search" className="pl-8 peer border border-white/20 focus:border-blue-400 focus:border-2 focus:outline-none rounded-full text-sm w-full px-4 py-3" />
                    <label htmlFor="searchBox" className="absolute top-0 left-3 items-center justify-center h-full flex text-white/40 peer-focus:text-blue-400">
                        <HiMiniMagnifyingGlass className="" />
                    </label>
                </div>
            </div>

            {/* PREMIUM */}
            <div className="border border-white/20 rounded-2xl p-4">
                <div className="text-xl font-bold mb-2">Subscribe to Premium</div>
                <div className="text-sm">Subscribe to unlock new features and if eligible, receive a share of revenue.</div>
                <div>
                    <button className="bg-blue-400 text-white text-sm font-bold px-4 py-2 rounded-full mt-2 cursor-pointer">Subscribe</button>
                </div>
            </div>


            {/* TRENDING */}
            <div className="border border-white/20 p-4 rounded-2xl">
                <div className="text-xl font-bold">What's happening</div>
                <div className="flex space-x-2 py-3 cursor-pointer">
                    <div className="w-20 h-20 rounded-2xl bg-white/30"></div>
                    <div>
                        <div className="font-bold text-sm">Fashion Weeks Womenswear FW25/26</div>
                        <div className="text-white/30 text-xs">LIVE</div>
                    </div>
                </div>
                {
                    Array.from({ length: 4 }).map((item, i) => (
                        <div key={i} className="flex justify-between hover:bg-white/5 py-3 cursor-pointer">
                            <div>
                                <div className="text-xs text-white/40">
                                    BTS-Trending
                                </div>
                                <div className="text-sm font-bold">
                                    #HappyBirthdaySUGA
                                </div>
                                <div className="text-xs text-white/40">
                                    42.8K posts
                                </div>
                            </div>
                            <BsThreeDots />
                        </div>

                    ))

                }
                <div className="mt-6 text-blue-400 text-sm cursor-pointer">Show more</div>
            </div>

            {/* FOLLOW OTHER PEOPLE */}
            <div className="border border-white/20 p-4 rounded-2xl">
                <div className="font-bold text-xl">You might like</div>
                {
                    Array.from({ length: 3 }).map((item, i) => (
                        <div key={i} className="flex justify-between mt-4 cursor-pointer">
                            <div className="flex">
                                <div className="bg-white/20 w-10 h-10 rounded-full"></div>
                                <div className="ml-2">
                                    <div className="text-md font-bold">Aqua水淼</div>
                                    <div className="text-sm text-white/40">@aqua_cosplay</div>
                                </div>
                            </div>
                            <div className="bg-white hover:bg-white/80 transition pointer duration-200 text-black rounded-full px-4 py-2 h-9 font-bold text-sm">
                                Follow
                            </div>
                        </div>
                    ))
                }

                <div className="mt-6 text-blue-400 text-sm cursor-pointer">Show more</div>
            </div>

            {/* MORE */}
            <div className="text-xs pb-20 px-3">
                <div className="flex space-x-3 text-white/40">
                    <Link href="/">Terms of Service</Link>
                    <Link href="/">Privacy Policy</Link>
                    <Link href="/">Cookie Policy</Link>
                </div>
                <div className="flex space-x-3 text-white/40">
                    <Link href="/">Accessibility</Link>
                    <Link href="/">Ads info</Link>
                    <Link href="/" className="flex items-center">More<BsThreeDots /> </Link>
                    <Link href="/">© 2025 X Corp.</Link>
                </div>
            </div>
        </section>
    )
}

export default RightSection
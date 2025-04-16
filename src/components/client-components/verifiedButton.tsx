'use client'

import { Profiles } from '@/types'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { RiVerifiedBadgeFill } from 'react-icons/ri'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogTitle, DialogTrigger } from '../ui/dialog'
import { AlertDialogHeader } from '../ui/alert-dialog'
import { XIcon } from 'lucide-react'
import { IoCheckmark, IoCheckmarkCircleSharp, IoCheckmarkSharp } from 'react-icons/io5'
import { GoChecklist } from 'react-icons/go'
import { FaRegCircleCheck } from 'react-icons/fa6'

type verifiedButtonProps = {
    userProfiles: Profiles,
    data: Profiles,
}

const VerifiedButton = ({ userProfiles, data }: verifiedButtonProps) => {

    const [isPressed1, setIsPressed1] = useState(true)
    const [isPressed2, setIsPressed2] = useState(false)
    

    return (

        <Dialog>
            <DialogTrigger>
                {
                    userProfiles.username === data.username && <Button className='rounded-full border border-white/50 bg-black font-bold cursor-pointer'><RiVerifiedBadgeFill className='text-blue-400' />Get verified</Button>
                }
            </DialogTrigger>
            {/* <DialogOverlay className='bg-blue-400/20' /> */}
            <DialogContent className='bg-black text-white min-w-screen h-screen items-center border border-transparent overflow-scroll'>
                <AlertDialogHeader className='z-0'>
                    <DialogClose className='absolute top-6 left-6'> <XIcon /> </DialogClose>
                    <DialogTitle className='font-bold text-[54px] w-170 mx-auto mt-12'>Get verified with Premium</DialogTitle>
                    <DialogDescription className='m-auto text-[17.5px] w-200 text-center font-normal text-white/70'>
                        Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security. <br></br>
                        (For organizations, <span className='font-bold text-white border-b-3 border-white'>sign up here</span>)
                    </DialogDescription>
                    <DialogDescription>
                        <div className='w-55 h-8 bg-slate-400/25 items-center m-auto rounded-full p-[2px] mb-6 mt-4'>
                            <div className='bg-black w-35 h-7 items-center rounded-full text-white px-2 pt-[3px]'>
                                Annual <span className='font-bold bg-green-400/20 text-green-200 rounded-xl w-15 text-xs h-4 px-2'> Best Value</span>
                            </div>
                        </div>
                        <div className='flex w-178 m-auto'>
                            <div onClick={() => { setIsPressed1(true); setIsPressed2(false) }} className={`bg-slate-400/23 w-85 h-110 ${isPressed1 && "border-2 border-blue-400"} rounded-2xl m-auto p-6 text-white`}>
                                <div className='flex justify-between items-center'>
                                    <div className='text-xl font-semibold'>Premium</div>
                                    {
                                        isPressed1 ? (
                                            <div> <IoCheckmarkSharp className='text-xl bg-blue-400 rounded-full p-1' /> </div>
                                        ) : (
                                            <div className='w-5 h-5 rounded-full bg-black border'> </div>
                                        )
                                    }
                                </div>
                                <div className='text-4xl font-bold mt-2'>IDR 104,167<span className='text-lg font-light'>  / month</span></div>
                                <div className='flex justify-between mt-2'>
                                    <div className='w-40 text-base leading-5 text-white/60'>IDR 1,250,000 billed anually</div>
                                    <div className='bg-green-800/10 text-green-200 rounded-full px-2 text-xs h-4 font-bold'>SAVE 13%</div>
                                </div>

                                <ul className='space-y-1 mt-4 '>
                                    <div className='font-semibold text-base'>Everything in Basic, and</div>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Half Ads for You and Following</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Larger reply boost</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Get paid to post</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Checkmark</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Grok with increased limits</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  X pro, Analytics, Media Studio</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Creator Subscription</span></li>
                                </ul>
                            </div>
                            <div onClick={() => { setIsPressed2(true); setIsPressed1(false) }} className={`bg-slate-400/23 w-85 h-110 ${isPressed2 && "border-2 border-blue-400"} rounded-2xl m-auto p-6 text-white`}>
                                <div className='flex justify-between items-center'>
                                    <div className='text-xl font-semibold'>Premium+</div>
                                    {
                                        isPressed2 ? (
                                            <div> <IoCheckmarkSharp className='text-xl bg-blue-400 rounded-full p-1' /> </div>
                                        ) : (
                                            <div className='w-5 h-5 rounded-full bg-black border'> </div>
                                        )
                                    }
                                </div>
                                <div className='text-4xl font-bold mt-2'>IDR 538,333<span className='text-lg font-light'>  / month</span></div>
                                <div className='flex justify-between mt-2'>
                                    <div className='w-40 text-base leading-5 text-white/60'>IDR 6,460,000 billed anually</div>
                                    <div className='bg-green-800/10 text-green-200 rounded-full px-2 text-xs h-4 font-bold'>SAVE 17%</div>
                                </div>

                                <ul className='space-y-1 mt-4'>
                                    <div className='font-semibold  text-base'>Everything in Basic, and</div>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Fully ad-free</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Largest reply boost</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Write Articles</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Radar</span></li>
                                    <div className='font-semibold text-base'>Everything in Basic, and</div>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Highest usage limits</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Unlock DeepSearch & Think</span></li>
                                    <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Early access to new features</span></li>
                                </ul>
                            </div>
                        </div>
                    </DialogDescription>
                    <DialogDescription className='m-auto w-[1000px] text-white text-lg mt-[80px]'>
                        <div className='text-2xl font-bold'>Compare tiers & features</div>

                        {/* Enhanced Experience */}
                        <div className='grid grid-cols-3 font-semibold mt-8 border-b-1 border-white/15 py-1.5'>
                            <div>Enhanced Experience</div>
                            <div>Premium</div>
                            <div>Premium+</div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Ads</div>
                            <div className=''>Half in For You & Following</div>
                            <div className=''>Fully ad-free</div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Reply boost</div>
                            <div className=''>Larger</div>
                            <div className=''>Largest</div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Radar</div>
                            <div className=''></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Edit post</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Longer posts</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Background video playback</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Downlaod videos</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>

                        {/* Grok Ai */}
                        <div className='grid grid-cols-3 font-semibold mt-8 border-b-1 border-white/15 py-1.5'>
                            <div>Grok AI</div>
                            <div>Premium</div>
                            <div>Premium+</div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Use limits</div>
                            <div className=''>Higher</div>
                            <div className=''>Highest</div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Unlock DeepSearch & Think</div>
                            <div className=''></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Early access to new features</div>
                            <div className=''></div>
                            <div className=''><IoCheckmark /></div>
                        </div>

                        {/* Creator Hub */}
                        <div className='grid grid-cols-3 font-semibold mt-8 border-b-1 border-white/15 py-1.5'>
                            <div>Creator Hub</div>
                            <div>Premium</div>
                            <div>Premium+</div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Write Articles</div>
                            <div className=''></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Get paid to post</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>X Pro</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Media Studio</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Analytics</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>

                        {/* Verification & Security */}
                        <div className='grid grid-cols-3 font-semibold mt-8 border-b-1 border-white/15 py-1.5'>
                            <div>Verification & Security</div>
                            <div>Premium</div>
                            <div>Premium+</div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Checkmark</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Optional ID verification</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Encrypted direct messages</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>


                        {/* Customization */}
                        <div className='grid grid-cols-3 font-semibold mt-8 border-b-1 border-white/15 py-1.5'>
                            <div>Customization</div>
                            <div>Premium</div>
                            <div>Premium+</div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Highlights tab</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Bookmark folders</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>App icons</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>
                        <div className='grid grid-cols-3 text-white border-b-1 border-white/15 py-1.5 font-light text-base'>
                            <div className='text-white/85'>Customize navigation</div>
                            <div className=''><IoCheckmark /></div>
                            <div className=''><IoCheckmark /></div>
                        </div>

                    </DialogDescription>

                </AlertDialogHeader>
                <AlertDialogHeader className='bg-black border-t-1 border-white/30 sticky bottom-0 min-w-full h-40'>
                    <div className='flex m-auto w-196'>
                        <div className='w-235 mt-3'>
                            <div className='text-xl font-semibold'>Premium{isPressed2 && "+"} </div>
                            <div className='text-4xl font-bold mt-3'> {isPressed1 ? "IDR 1,250,000" : "IDR 6,460,000"} <span className='text-lg font-light'> / year</span></div>
                            <div className='text-white/80'>Billed annually</div>
                        </div>
                        <div>
                            <Button className='bg-blue-400 text-white w-full font-bold rounded-full mt-4 py-4.5'>Subscribe & Pay</Button>
                            <div className='border border-white/30 text-[13px] text-white/80 p-2 my-3 rounded-lg leading-4'>
                                By subscribing, you agree to our <span className='border-b font-bold'>Purchaser Terms of Service</span>. Subscriptions auto-renew until canceled. <span className='border-b font-bold'>Cancel anytime</span>,  at least 24 hours prior to renewal to avoid additional charges. Manage your subscription through the platform you subscribed on.
                            </div>
                        </div>
                    </div>
                </AlertDialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default VerifiedButton
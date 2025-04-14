import { Profiles } from '@/types'
import React from 'react'
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
    return (

        <Dialog>
            <DialogTrigger>
                {
                    userProfiles.username === data.username && <Button className='rounded-full border border-white/50 bg-black font-bold cursor-pointer'><RiVerifiedBadgeFill className='text-blue-400' />Get verified</Button>
                }
            </DialogTrigger>
            {/* <DialogOverlay className='bg-blue-400/20' /> */}
            <DialogContent className='bg-black text-white min-w-screen h-screen items-center border border-transparent overflow-scroll'>
                <AlertDialogHeader>
                    <DialogClose className='absolute top-6 left-6'> <XIcon /> </DialogClose>
                    <DialogTitle className='font-bold text-[54px] w-170 mx-auto'>Get verified with Premium</DialogTitle>
                    <DialogDescription className='m-auto text-[17.5px] w-200 text-center font-normal text-white/70'>
                        Enjoy an enhanced experience, exclusive creator tools, top-tier verification and security. <br></br>
                        (For organizations, <span className='font-bold text-white border-b-3 border-white'>sign up here</span>)
                    </DialogDescription>
                    <DialogDescription>
                        <div className='w-55 h-8 bg-slate-400/25 items-center m-auto rounded-full p-[2px] mb-4'>
                            <div className='bg-black w-35 h-7 items-center rounded-full text-white px-2 pt-[3px]'>
                                Annual <span className='font-bold bg-green-400/20 text-green-200 rounded-xl w-15 text-xs h-4 px-2'> Best Value</span>
                            </div>
                        </div>
                        <div className='bg-slate-400/23 w-90 h-110 border-2 border-blue-400 rounded-2xl m-auto p-8 text-white'>
                            <div className='flex justify-between items-center'>
                                <div className='text-xl font-semibold'>Premium</div>
                                <div> <IoCheckmarkSharp className='text-xl bg-blue-400 rounded-full p-1' /> </div>
                            </div>
                            <div className='text-4xl font-bold mt-2'>IDR 104,167<span className='text-lg font-light'>  / month</span></div>
                            <div className='flex justify-between mt-2'>
                                <div className='w-40 text-base leading-5 text-white/60'>IDR 1,200,000 billed anually</div>
                                <div className='bg-green-800/10 text-green-200 rounded-full px-2 text-xs h-4 font-bold'>SAVE 13%</div>
                            </div>
                            <div className='font-semibold mt-4 text-base'>Everything in Basic, and</div>
                            <ul className='space-y-1 mt-2'>
                                <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Half Ads for You and Following</span></li>
                                <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Larger reply boost</span></li>
                                <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Get paid to post</span></li>
                                <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Checkmark</span></li>
                                <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Grok with increased limit</span></li>
                                <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  X pro, Analytics, Media Studio</span></li>
                                <li className='flex items-center text-base text-white/80'><IoCheckmark /> <span className='ml-2'>  Creator Subscription</span></li>
                            </ul>
                        </div>
                    </DialogDescription>
                </AlertDialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default VerifiedButton
'use client'
import { BsDot } from 'react-icons/bs'
import { Dialog, DialogClose, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '../ui/dialog'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import DayJs from './DayJs'
import ComposeReply from './compose-reply'
import { useState } from 'react'
import { Post, Profiles, Reply } from '@/types'
import Image from 'next/image'
import { XIcon } from 'lucide-react'


type postProps = {
    post: Post | Reply,
    userId?: string,
    postUsername?: string,
    userProfiles: Profiles,
    replyCount: number,
    dataId: string,
}

const ReplyButton = ({ userProfiles, post, userId, dataId, replyCount }: postProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleReplySuccess = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen} >

                <DialogTrigger className="flex rounded-full bg-transparent  hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 transition duration-300 text-white/50 items-end cursor-pointer space-x-1 ">
                    <HiOutlineChatBubbleOvalLeft />
                    <div className="mt-[3px] text-xs">
                        {replyCount}
                    </div>
                </DialogTrigger>
                <DialogOverlay className="bg-blue-300/20" />
                <DialogTitle></DialogTitle>
                <DialogContent className="bg-black/100 border-transparent sm:min-w-150  max-h-[90vh] overflow-y-auto overflow-x-hidden">
                    <DialogClose className='pl-2 pt-2'> <XIcon /> </DialogClose>
                    <div className="flex px-2 sm:px-4 ">
                        {
                            post.profilePicture ? (
                                <Image alt="profilePicture" src={post.profilePicture} width={300} height={300} className="object-cover bg-white/50 w-10 h-10 rounded-full" />
                            ) : (
                                <div className="bg-white/50 min-w-10 h-10 rounded-full p"></div>
                            )
                        }
                        <div className="ml-2 w-full">
                            <div className="flex justify-between">
                                <div className="sm:flex items-center">
                                    <div className="font-semibold">{post.username ?? ""}</div>
                                    <div className='flex'>
                                        <div className="text-white/50 text-sm ml-1">@{post.username}</div>
                                        <div className="text-white/50 text-sm"> <BsDot /></div>
                                        <div className="text-white/50 text-sm"> <DayJs date={post.created_at} profilesCreated={null} /> </div>
                                    </div>
                                </div>
                            </div>
                           
                        </div>
                    </div>
                     <div className="px-2 text-xs sm:text-[15px] line-clamp-4 overflow-x-scroll"> {post.text ? post.text : post.imageUrl} </div>
                            {/* <div className="text-[15px] line-clamp-12"> {post.imageUrl} </div> */}
                            <div className="ml-2 sm:flex mt-4">
                                <div className="mr-1 text-gray-500">Replying to</div><div className="text-blue-400">@{post.username}</div>
                            </div>
                    <ComposeReply userProfiles={userProfiles} userId={userId} dataId={dataId} onReplySuccess={handleReplySuccess} />
                </DialogContent>
            </Dialog>
        </div>


    )
}

export default ReplyButton
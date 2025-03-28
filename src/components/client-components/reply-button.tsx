'use client'
import { BsDot } from 'react-icons/bs'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '../ui/dialog'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { postType } from './posts'
import { useState } from 'react'
import { handleReplySubmit } from '../server-components/mutation'
import { toast } from 'sonner'


type postProps = {
    post: postType
    dayjs: any
    userId: string
    postId: string
}

const ReplyButton = ({ post, dayjs, userId, postId }: postProps) => {

    const [reply, setReply] = useState("")
    const [isOpen, setIsOpen] = useState(false)


    const handleSubmit = async (formData: FormData) => {
        const res = await handleReplySubmit(formData, postId, userId)
        if (res?.success) {
            toast.success(res.message)
            setIsOpen(false)
        } else {
            toast.error(res.message)
        }

    }


    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogTrigger>
                    <button className="flex rounded-full bg-transparent  hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 transition duration-400 text-white/50 items-end cursor-pointer space-x-1 " >
                        <HiOutlineChatBubbleOvalLeft />
                        <div className="mt-[3px] text-xs"></div>
                    </button>

                </DialogTrigger>
                <DialogOverlay className="bg-blue-300/20" />
                <DialogTitle></DialogTitle>
                <DialogContent className="bg-black/100 border-transparent min-w-150">
                    <div className="flex mt-6">
                        <div className="bg-white/50 min-w-10 h-10 rounded-full p"></div>
                        <div className="ml-2 w-full">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <div className="font-semibold">{post.username ?? ""}</div>
                                    <div className="text-white/50 text-sm ml-1">@{post.username}</div>
                                    <div className="text-white/50 text-sm"> <BsDot /> </div>
                                    <div className="text-white/50 text-sm"> {dayjs(post.createdAt).fromNow()} </div>
                                    {post.id}
                                </div>
                            </div>
                            <div className="text-[15px] line-clamp-12"> {post.text} </div>
                            <div className="flex mt-4">
                                <div className="mr-1 text-gray-500">Replying to</div><div className="text-blue-400">@{post.username}</div>
                            </div>
                        </div>
                    </div>
                    <form action={handleSubmit}>
                        <div className="text-sm font-bold flex h-3xl space-x-3 pt-4">
                            <div className="min-w-10 h-10 bg-slate-400 rounded-full"></div>
                            <div className="flex flex-col w-full">
                                <div className="pb-4">
                                    <textarea
                                        value={reply}
                                        onChange={(e) => setReply(e.target.value)}
                                        typeof="text"
                                        name="reply"
                                        placeholder="Post your reply"
                                        className="min-h-[40px] font-normal text-xl w-full text-wrap border border-transparent focus:outline-none resize-none pb-8 mt-1"
                                    ></textarea>
                                </div>

                            </div>

                        </div>
                        <div className="flex justify-between w-full items-center">
                            <div className="flex space-x-2">
                                <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                                <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                                <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                            </div>
                            <Button type="submit" className={`rounded-full text-black font-bold ${reply ? "bg-white/100 hover:bg-white/90" : "bg-white/40 hover:bg-white/40"} `} >
                                Reply
                            </Button>
                        </div>
                    </form>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ReplyButton
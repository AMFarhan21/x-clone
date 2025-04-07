'use client'
import { BsDot, BsEmojiSmile } from 'react-icons/bs'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogTrigger } from '../ui/dialog'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { postType } from './posts'
import { useRef, useState } from 'react'
import { handleReplySubmit } from '../server-components/mutation'
import { toast } from 'sonner'
import DayJs from './DayJs'
import ComposeReply from './compose-reply'
import { useState } from 'react'


type postProps = {
    post: postType
    userId: string
    postId: string
    postUsername: string
}

const ReplyButton = ({ post, userId, postId, postUsername, replyCount }: postProps) => {
    const [reply, setReply] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    // IMAGE AND VIDEO
    const [file, setFile] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(Array.from(e.target.files))
        }
    }

    // REPLY FORM DATA
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            setLoading(true)

            const formData = new FormData();
            formData.append("text", reply);
            file.forEach((f) => formData.append("files", f))

            const response = await fetch(`http://localhost:3000/api/reply?postId=${postId}&profilesId=${userId}`, {
                method: "POST",
                body: formData,
            })
            const data = await response.json();

            if (data.success) {
                toast.success(data.message)
                router.refresh()
                console.log(data.message)
                setReply("")
                setIsOpen(false)
                setLoading(false)
            } else {
                toast.error(data.message)
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>

                <DialogTrigger onClick={(e) => e.stopPropagation()} className="flex rounded-full bg-transparent  hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 transition duration-300 text-white/50 items-end cursor-pointer space-x-1 ">
                    <HiOutlineChatBubbleOvalLeft />
                    <div className="mt-[3px] text-xs">
                        {replyCount}
                    </div>
                </DialogTrigger>
                <DialogOverlay className="bg-blue-300/20" />
                <DialogTitle></DialogTitle>
                <DialogContent onClick={(e) => e.stopPropagation()} className="bg-black/100 border-transparent min-w-150">
                    <div className="flex mt-6">
                        <div className="bg-white/50 min-w-10 h-10 rounded-full p"></div>
                        <div className="ml-2 w-full">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <div className="font-semibold">{post.username ?? ""}</div>
                                    <div className="text-white/50 text-sm ml-1">@{post.username}</div>
                                    <div className="text-white/50 text-sm"> <BsDot /> </div>
                                    <div className="text-white/50 text-sm"> <DayJs date={post.created_at} /> </div>
                                </div>
                            </div>
                            <div className="text-[15px] line-clamp-12"> {post.text} </div>
                            <div className="flex mt-4">
                                <div className="mr-1 text-gray-500">Replying to</div><div className="text-blue-400">@{post.username}</div>
                            </div>
                        </div>
                    </div>
                    <ComposeReply userProfiles={userProfiles} userId={userId} dataId={postId} onReplySuccess={handleReplySuccess} />
                </DialogContent>
            </Dialog>
        </div>


    )
}

export default ReplyButton
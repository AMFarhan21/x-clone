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
import { RiCalendarScheduleLine, RiImage2Line } from 'react-icons/ri'
import { useRouter } from 'next/navigation'
import { MdOutlineGifBox } from 'react-icons/md'
import { FaRegCircle } from 'react-icons/fa'
import { BiPoll } from 'react-icons/bi'
import { IoLocationOutline } from 'react-icons/io5'


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

                <DialogTrigger onClick={(e) => e.stopPropagation()} className="flex rounded-full bg-transparent  hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 transition duration-400 text-white/50 items-end cursor-pointer space-x-1 ">
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
                    <form onSubmit={handleSubmit}>
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
                            <div className="flex space-x-3">
                                <div className='text-blue-400 text-[18px] cursor-pointer flex items-center' onClick={(e) => {
                                    e.stopPropagation();
                                    fileInputRef.current?.click()
                                }}>
                                    <RiImage2Line />
                                    <input className='hidden' type='file' name='files' accept='image/*, video/*' ref={fileInputRef} onChange={handleFileChange} multiple></input>
                                </div>
                                <div className="text-blue-400 text-[18px] cursor-pointer"> <MdOutlineGifBox /> </div>
                                <div className="text-blue-400 text-[18px] cursor-pointer"> <FaRegCircle /> </div>
                                <div className="text-blue-400 text-[18px] cursor-pointer"> <BiPoll /> </div>
                                <div className="text-blue-400 text-[18px] cursor-pointer"> <BsEmojiSmile/> </div>
                                <div className="text-blue-400 text-[18px] cursor-pointer"> <RiCalendarScheduleLine /> </div>
                                <div className="text-blue-400/50 text-[18px] cursor-pointer"> <IoLocationOutline /> </div>
                            </div>
                            <Button disabled={loading} type="submit" className={`rounded-full text-black font-bold ${reply ? "bg-white/100 hover:bg-white/90" : "bg-white/40 hover:bg-white/40"} `} >
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
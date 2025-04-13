'use client'
import { useRouter } from 'next/navigation'
import React, { useRef, useState } from 'react'
import { BiPoll } from 'react-icons/bi'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaRegCircle } from 'react-icons/fa'
import { IoLocationOutline } from 'react-icons/io5'
import { MdOutlineGifBox } from 'react-icons/md'
import { RiCalendarScheduleLine, RiImage2Line } from 'react-icons/ri'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import Image from 'next/image'

type ComposeReplyProps = {
    userProfiles?: {
        profilePicture?: string
    }
    userId?: string,
    dataId?: string,
    onReplySuccess?: () => void | null,
}

const ComposeReply = ({ userProfiles, userId, dataId, onReplySuccess }: ComposeReplyProps) => {
    const [reply, setReply] = useState("")
    const [hide, setHide] = useState(true)
    const [previewImage, setPreviewImage] = useState<string[]>([])


    // IMAGE AND VIDEO
    const [file, setFile] = useState<File[]>([])
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesInput = Array.from(e.target.files);
            setFile(filesInput)

            const previewImageUrl = filesInput.map(file => URL.createObjectURL(file))
            setPreviewImage(previewImageUrl)
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

            const response = await fetch(`http://localhost:3000/api/reply?dataId=${dataId}&profilesId=${userId}`, {
                method: "POST",
                body: formData,
            })
            const data = await response.json();

            if (data.success) {
                toast.success(data.message)
                router.refresh()
                console.log(data.message)
                setReply("")
                setLoading(false)
                onReplySuccess?.()
            } else {
                toast.error(data.message)
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(userProfiles)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={`text-sm font-bold flex h-3xl space-x-3 pt-4 px-4 ${hide ? "border-b border-white/20" : ""} `}>
                    {
                        userProfiles?.profilePicture ? (
                            <Image src={userProfiles?.profilePicture} alt="profilePicture" width={300} height={300} loading="eager" className="object-cover w-10 h-10 bg-slate-400 rounded-full" />
                        ) : (
                            <div className="min-w-10 h-10 bg-slate-400 rounded-full"></div>
                        )
                    }
                    <div className="flex flex-col w-full">
                        <div className="">
                            <textarea
                                value={reply}
                                onChange={(e) => { setReply(e.target.value); setHide(false) }}
                                onClick={() => setHide(false)}
                                typeof="text"
                                name="reply"
                                placeholder="Post your reply"
                                className="min-h-[40px] font-normal text-xl w-full text-wrap border border-transparent focus:outline-none resize-none  mt-1"
                            ></textarea>
                        </div>
                        {
                            previewImage.length > 0 && <div className={`grid rounded-xl overflow-hidden gap-[2px] w-full h-75
                                ${previewImage.length === 1 && "grid-cols-1"}
                                ${previewImage.length === 2 && "grid-cols-2"}
                                ${previewImage.length === 3 && "grid-cols-2 grid-rows-2"}
                                ${previewImage.length === 4 && "grid-cols-2 grid-rows-2"}
                            `}>
                                {
                                    previewImage.map((image, i) => (
                                        <Image key={i} alt='image' src={image} width={300} height={300} className={`object-cover w-full h-full ${previewImage.length === 3 && i === 0 && "row-span-2"}`} />
                                    ))
                                }

                            </div>
                        }
                    </div>


                </div>
                <div className="flex justify-between w-full items-center px-4 pb-2 pt-8 border-b border-white/20" hidden={hide}>
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
                        <div className="text-blue-400 text-[18px] cursor-pointer"> <BsEmojiSmile /> </div>
                        <div className="text-blue-400 text-[18px] cursor-pointer"> <RiCalendarScheduleLine /> </div>
                        <div className="text-blue-400/50 text-[18px] cursor-pointer"> <IoLocationOutline /> </div>
                    </div>
                    <Button disabled={loading || (reply.length === 0 && previewImage.length === 0)} type="submit" className="rounded-full text-black font-bold bg-white hover:bg-white/80">
                        Reply
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ComposeReply
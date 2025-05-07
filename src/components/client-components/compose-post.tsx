'use client'

import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { FaRegCircle } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';
import { RiCalendarScheduleLine, RiImage2Line } from 'react-icons/ri';
import { MdOutlineGifBox } from 'react-icons/md';
import { BiPoll } from 'react-icons/bi';
import { BsEmojiSmile } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { Profiles } from '@/types';

type composePostProps = {
  userProfiles: Profiles,
}

const ComposePost = ({ userProfiles }: composePostProps) => {

  const [previewImage, setPreviewImage] = useState<string[]>([])
  const [file, setFile] = useState<File[]>([])
  const [post, setPost] = useState("")
  const [loading, setLoading] = useState(false)

  // IMAGE/VIDEO
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setFile(filesArray)

      const previewImageURL = filesArray.map(file => URL.createObjectURL(file))
      setPreviewImage(previewImageURL)
    }
  }

  // POST
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault()
    try {
      // const res = await handlePostSubmit(formData);
      const formData = new FormData();
      formData.append("text", post);
      file.forEach((f) => formData.append("files", f))

      const response = await fetch('http://localhost:3000/api/posts', {
        method: "POST",
        body: formData,
      })

      const res = await response.json()

      if (res.success) {
        toast.success('Post created successfully!');
        router.refresh()
        setLoading(false)
        setPreviewImage([])
        setFile([])
      } else {
        toast.error(res.message);
        setLoading(false)
        setPreviewImage([])
        setFile([])
      }

      setPost("")
    } catch (error) {
      console.error('Error Creating Post (client):', error);
      toast.error('An error occurred while creating the post.');
    }
  };






  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="text-sm font-bold flex h-3xl space-x-3 pt-5 pb-2 px-4 border-b border-gray-600/50">
          {
            userProfiles.profilePicture ? (
              <Image onClick={() => router.push(`/${userProfiles.username}`)} src={userProfiles.profilePicture} alt='profilePicture' width={300} height={300} loading="eager" className="cursor-pointer object-cover w-10 h-10 bg-slate-400 rounded-full" />
            ) : (
              <div className="min-w-10 h-10 bg-slate-400 rounded-full"></div>
            )
          }
          <div className="flex flex-col w-full pr-4">
            <div className="w-full">
              <textarea
                value={post}
                onChange={e => setPost(e.target.value)}
                typeof="text"
                name="post"
                placeholder="What is happening?!"
                className="min-h-[40px] font-normal text-xl w-full text-wrap border border-transparent focus:outline-none resize-none"
              ></textarea>
            </div>

            {
              previewImage.length > 0 && (
                <div className={`grid overflow-hidden ${previewImage.length === 1 && "grid-cols-1"} ${previewImage.length === 2 && "grid-cols-2"} ${previewImage.length === 3 && "grid-cols-2 grid-rows-2"} ${previewImage.length >= 4 && "grid-cols-2 grid-rows-2"} rounded-2xl gap-[2px] h-75 w-full`}>
                  {
                    previewImage.map((image, i) => (
                      <div key={i} className='relative w-full h-full'>
                        <Image alt='image' src={image} width={500} height={500} className={`w-full h-full object-cover ${previewImage.length === 3 && i === 0 && "row-span-2"}`} />
                        <button className='absolute bg-black/50 p-1 rounded-full top-2 right-2' onClick={(e) => {
                          e.preventDefault();
                          setPreviewImage(prev => prev.filter((img, index) => index !== i)); 
                          setFile(prev => prev.filter((img, index) => index !== i));
                        }} ><XIcon /></button>
                      </div>
                    ))
                  }
                </div>
              )
            }
            <div className="flex justify-between w-full items-center mt-4">
              <div className="flex space-x-4">
                <div className="text-blue-400 text-[18px] cursor-pointer flex items-center" onClick={() => fileInputRef.current?.click()}>
                  <RiImage2Line />
                  <input className='hidden' type='file' name='files' accept='image/*, video/*' ref={fileInputRef} onChange={handleFileChange} multiple />
                </div>
                <div className="text-blue-400 text-[18px] cursor-pointer"> <MdOutlineGifBox /> </div>
                <div className="text-blue-400 text-[18px] cursor-pointer"> <FaRegCircle /> </div>
                <div className="text-blue-400 text-[18px] cursor-pointer"> <BiPoll /> </div>
                <div className="text-blue-400 text-[18px] cursor-pointer"> <BsEmojiSmile /> </div>
                <div className="text-blue-400 text-[18px] cursor-pointer"> <RiCalendarScheduleLine /> </div>
                <div className="text-blue-400/50 text-[18px] cursor-pointer"> <IoLocationOutline /> </div>
              </div>
              <Button disabled={loading || (post.length === 0 && previewImage.length === 0)} type="submit" className="py-2 px-5 rounded-full text-black font-bold bg-white/100 hover:bg-white/90">
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComposePost;
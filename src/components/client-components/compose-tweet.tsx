'use client'

import React, { useRef, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { handlePostSubmit } from '../server-components/mutation';
import { FaImage, FaRegCircle } from 'react-icons/fa';
import { CiImageOn } from 'react-icons/ci';
import { IoImageOutline, IoLocationOutline } from 'react-icons/io5';
import { RiCalendarScheduleLine, RiImage2Line } from 'react-icons/ri';
import { MdOutlineGifBox } from 'react-icons/md';
import { BiPoll } from 'react-icons/bi';
import { BsEmojiSmile } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

const ComposeTweet = () => {
  

  

  // IMAGE/VIDEO

  const [file, setFile] = useState<File[]> ([])
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files){
      setFile(Array.from(e.target.files)) 
    }
  }

  // POST
  const router = useRouter();
  const [post, setPost] = useState("")
  const [loading, setLoading] = useState(false)
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
      } else {
        toast.error(res.message);
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
          <div className="min-w-10 h-10 bg-slate-400 rounded-full"></div>
          <div className="flex flex-col w-full pr-4">
            <div className="pb-4">
              <textarea
                value={post}
                onChange={e => setPost(e.target.value)}
                typeof="text"
                name="post"
                placeholder="What is happening?!"
                className="min-h-[40px] font-normal text-xl w-full text-wrap border border-transparent focus:outline-none resize-none"
              ></textarea>
            </div>
            <div className="flex justify-between w-full items-center">
              <div className="flex space-x-4">
                <div className="text-blue-400 text-[18px] cursor-pointer flex items-center" onClick={() => fileInputRef.current?.click()}>
                  <RiImage2Line />
                  <input className='hidden' type='file' name='files' accept='image/*, video/*' ref={fileInputRef} onChange={handleFileChange} multiple />
                </div>
                <div className="text-blue-400 text-[18px]"> <MdOutlineGifBox /> </div>
                <div className="text-blue-400 text-[18px]"> <FaRegCircle /> </div>
                <div className="text-blue-400 text-[18px]"> <BiPoll /> </div>
                <div className="text-blue-400 text-[18px]"> <BsEmojiSmile /> </div>
                <div className="text-blue-400 text-[18px]"> <RiCalendarScheduleLine /> </div>
                <div className="text-blue-400/50 text-[18px]"> <IoLocationOutline /> </div>
              </div>
              <Button disabled={loading} type="submit" className={`py-2 px-5 rounded-full text-black font-bold ${post ? "bg-white/100 hover:bg-white/90" : "bg-white/40 hover:bg-white/40"}`}>
                Post
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComposeTweet;
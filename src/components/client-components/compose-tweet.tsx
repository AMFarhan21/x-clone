'use client'

import React, { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { handlePostSubmit } from '../server-components/mutation';

const ComposeTweet = () => {
  const handleSubmit = async (formData: FormData) => {
    try {
      const res = await handlePostSubmit(formData);
      if (res.success) {
        toast.success('Post created successfully!') ;
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while creating the post.');
    }
  };

  const [post, setPost] = useState("")

  return (
    <div>
      <form action={handleSubmit}>
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
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
                <div className="w-4 h-4 bg-slate-400 rounded-full"></div>
              </div>
              <Button type="submit" className={`py-2 px-5 rounded-full text-black font-bold ${post ? "bg-white/100 hover:bg-white/90" : "bg-white/40 hover:bg-white/40"}`}>
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
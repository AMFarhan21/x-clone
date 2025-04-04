'use client'
import React, { useState } from 'react'
import { FaRetweet } from 'react-icons/fa6'
import { toast } from 'sonner'

const Repost = ({postId, userId, isRePosted, rePostCount, replyId}) => {

    const [reposted, setReposted] = useState(isRePosted)
    const [count, setCount] = useState(Number(rePostCount))

    const handleRepost = async() => {

        setReposted(!reposted)
        setCount(prev => reposted ? prev - 1 : prev + 1)

        const response = await fetch("http://localhost:3000/api/posts/rePosts", {
            method: "POST",
            body: JSON.stringify({postId, userId}),
            cache: "no-store"
        })
        
        const data = await response.json()

        if(data.success) {
            console.log(data.message)
            toast.success(data.message)
        } else {
            console.log(data.message, data.error)
            toast.error(data.message)
        }
    }


    const handleReplyRepost = async() => {
        setReposted(!reposted)
        setCount(prev => reposted ? prev - 1 : prev + 1)

        const response = await fetch('http://localhost:3000/api/reply/rePosts', {
            method: "POST",
            body: JSON.stringify({replyId, userId}),
            cache: "no-store"
        })
        const data = await response.json()

        if(data.success) {
            console.log(data.message)
            toast.success(data.message)
        } else {
            console.log(data.message)
            toast.error(data.message)
        }
    }

    return (
        <button onClick={(e) => {
            e.stopPropagation()
            if(replyId) {
                handleReplyRepost()
            } else {
                handleRepost()
            }
        }} className={`flex mt-[6px] rounded-full bg-transparent p-2 my-1 hover:bg-green-300/10 hover:text-green-400/80 transition duration-300 ${reposted ? "text-green-400/80" : "text-white/50"} items-end cursor-pointer space-x-1`}>
            <FaRetweet className="text-xl"  />
            <div className="mt-[-20px] text-xs"> {count} </div>
        </button>
    )
}

export default Repost
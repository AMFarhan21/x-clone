'use client'
import React, { useState } from 'react'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { toast } from 'sonner'

type bookmarkProps = {
    postId?: string | null,
    userId?: string,
    replyId?: string | null,
    isBookmarked: boolean,
}

const BookmarkButton = ({ postId, userId, replyId, isBookmarked }: bookmarkProps) => {

    const [bookmarked, setBookmarked] = useState(isBookmarked)

    const handleBookmark = async () => {
        setBookmarked(!bookmarked)

        const response = await fetch('/api/posts/bookmarks', {
            method: "POST",
            body: JSON.stringify({ postId, userId }),
            cache: "no-store"
        })
        const data = await response.json()
        if (data.success) {
            console.log(data.message)
            toast.success(data.message)
            // router.refresh()
        } else {
            console.log(data.message)
            toast.error(data.message)
        };
    }


    const handleReplyBookmark = async () => {
        setBookmarked(!bookmarked)

        const response = await fetch('/api/reply/bookmarks', {
            method: "POST",
            body: JSON.stringify({ replyId, userId }),
            cache: 'no-store'
        })
        const data = await response.json()
        if (data.success) {
            console.log(data.message)
            toast.success(data.message)
            // router.refresh()
        } else {
            console.log(data.message)
            toast.error(data.message)
        };
    }

    return (
        <button onClick={(e) => {
            e.stopPropagation();
            if(replyId) {
                handleReplyBookmark()
            } else {
                handleBookmark()
            }
        }} className={`text-xl rounded-full bg-transparent hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 ${bookmarked ? "text-blue-400" : "text-white/50"} cursor-pointer`}>
            {bookmarked ? <MdBookmark /> : <MdBookmarkBorder />}
        </button>
    )
}

export default BookmarkButton
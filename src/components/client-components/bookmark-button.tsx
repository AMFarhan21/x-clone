import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md'
import { toast } from 'sonner'

const BookmarkButton = ({ postId, userId, replyId, isBookmarked }) => {

    const [bookmarked, setBookmarked] = useState(isBookmarked)

    // const router = useRouter()

    const handleBookmark = async () => {
        setBookmarked(!bookmarked)

        const response = await fetch('http://localhost:3000/api/posts/bookmarks', {
            method: "POST",
            body: JSON.stringify({ postId, userId })
        })
        const data = await response.json()
        if (data.success) {
            console.log(data.message)
            toast.success(data.message)
            // router.refresh()
        } else {
            console.log(data.message)
            toast.error(data.message)
        }
    }

    return (
        <button onClick={(e) => {
            e.stopPropagation();
            handleBookmark()
        }} className={`text-xl rounded-full bg-transparent hover:bg-blue-400/10 hover:text-blue-400 p-2 my-1 ${bookmarked ? "text-blue-400" : "text-white/50"} cursor-pointer`}>
            {bookmarked ? <MdBookmark /> : <MdBookmarkBorder />}
        </button>
    )
}

export default BookmarkButton
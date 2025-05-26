import BackNavigation from "@/components/client-components/BackNavigation"
import Posts from "@/components/client-components/posts"
import { userIsLogin } from "@/components/server-components/action"
import { getBookmarksAction } from "@/components/server-components/bookmarkAction"
import { Post } from "@/types"

const page = async () => {
    const { data, error } = await userIsLogin()
    if (error) return
    const userId = data.user?.id as string

    const response = await getBookmarksAction(userId)
    const bookmarks = await response.json()
    
    return (
        <div className='w-full xl:w-[48%] mb-10'>
            <BackNavigation location={"Bookmarks"} />
            {
                bookmarks.result.length ? (
                    bookmarks.result.map((bookmark: Post) => (
                    <Posts key={bookmark.id} post={bookmark} userProfiles={bookmarks.userProfiles} userId={userId}/>
                ))
                ) : (
                    <div className="m-auto font-bold text-3xl flex flex-wrap "> 
                        You dont have any bookmarks yet bro, bookmark something then comeback
                    </div>
                )
            }
        </div>
    )
}

export default page
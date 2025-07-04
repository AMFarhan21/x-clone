import Posts from "./client-components/posts";
import ComposePost from "./client-components/compose-post";
import { Post } from "@/types";
import AuthModel from "./client-components/AuthModel";
import Image from "next/image";
import { db } from "@/lib/db";
import Link from "next/link";
import { userIsLogin } from "./server-components/action";
import { getPostsAction } from "./server-components/postAction";
import { Suspense } from "react";
import Loading from "./client-components/Loading";

const MainComponent = async () => {
  const { data: userData, error } = await userIsLogin();
  if (error) {
    console.log(error);
    return;
  }
  const userId = userData.user?.id as string;

  const loggedInUser = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.id, userId),
  });

  const response = await getPostsAction(userId);
  const posts = await response.json();

  return (
    <main className="w-full xl:w-[48%] h-full min-h-screen flex-col sm:border-l sm:border-r sm:border-gray-600/40">
      <AuthModel />
      <div className="sticky top-0 backdrop-blur-md bg-black/80">
        <div className="flex items-center justify-between sm:hidden pt-2">
          <Link href={`/${loggedInUser?.username}`}>
            {loggedInUser?.profilePicture ? (
              <Image
                alt="profilePicture"
                src={loggedInUser?.profilePicture as string}
                width={200}
                height={200}
                loading="eager"
                className="object-cover ml-4 max-w-10 h-10 rounded-full cursor-pointer"
              />
            ) : (
              <div className="ml-4 min-w-10 h-10 rounded-full py-5 border-b border-gray-600/50 bg-gray-400 sticky top-0 cursor-pointer"></div>
            )}
          </Link>
          <Link href={`/`} className="w-5 mr-[-60px]">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj5Z6h2su_P2Dpy48AmTVcigVGKB5bsYuMZQ&s"
              className=""
            />
          </Link>
          <button className="px-4 py-2 bg-transparent text-white rounded-full  border border-white/40 mr-4 cursor-pointer">
            Upgrade
          </button>
        </div>
        <div className="flex items-center mt-[-4px]">
          <div className="hover:bg-white/3 text-sm font-bold flex justify-around py-5 border-b border-gray-600/50 w-full  sticky top-0 cursor-pointer">
            For you
          </div>
          <div className="hover:bg-white/3 text-sm font-bold flex justify-around py-5 border-b border-gray-600/50 w-full  sticky top-0 cursor-pointer">
            Following
          </div>
        </div>
      </div>

      {/* CREATE POST */}
      {userId && (
        <div className="hidden sm:block">
          <ComposePost userProfiles={posts.userProfiles} />
        </div>
      )}

      {/* LIST OF POSTS */}
      <div className="mb-10 sm:mb-0">
        {userId ? (
          posts.result.map((post: Post) => (
            <Suspense key={post.id} fallback={<div><Loading /></div>}>
              <Posts
                post={post}
                userId={userId || ""}
                userProfiles={posts.userProfiles}
              />
            </Suspense>
          ))
        ) : (
          <div></div>
        )}
      </div>
    </main>
  );
};

export default MainComponent;

import AuthModel from '@/components/client-components/AuthModel'
import LeftSidebar from '@/components/LeftSidebar'
import RightSection from '@/components/RightSection'
import React from 'react'

const PostStatus = () => {
  return (
    <div className="w-full h-full flex justify-center items-center relative ">

      <div className="max-w-screen-xl w-full h-full flex relative">
        <AuthModel />
        <LeftSidebar />



        <div className="w-full xl:max-w-[48%] h-full min-h-screen flex-col border-l border-r border-gray-600/50">
        
          

        </div>





        <RightSection />
      </div>
    </div>
  )
}

export default PostStatus
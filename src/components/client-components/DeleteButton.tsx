"use client"

import { handleDeletePost } from "../server-components/mutation"
import { DropdownMenuItem } from "../ui/dropdown-menu"


const DeleteButton = ({ userId, dataId }: { userId?: string, dataId?: string }) => {
  return (
    <DropdownMenuItem className="hover:bg-white/5 rounded-xl text-red-600 cursor-pointer px-4 py-1 mt-2 text-sm" onClick={(e) => e.stopPropagation()}>
      <div onClick={(e) => {
        e.stopPropagation()
        if(userId && dataId) {
          handleDeletePost({ userId, dataId })
        }
      }}>Delete</div>
    </DropdownMenuItem>

  )
}

export default DeleteButton
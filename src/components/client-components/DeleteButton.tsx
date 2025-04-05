"use client"

import { handleDeletePost } from "../server-components/mutation"
import { DropdownMenuItem } from "../ui/dropdown-menu"


const DeleteButton = ({ userId, dataId }: { userId: string, dataId: string }) => {
  return (
    <DropdownMenuItem className="hover:bg-white/5 rounded-xl text-red-600 cursor-pointer px-4 py-1 text-sm" onClick={(e) => e.stopPropagation()}>
      <div onClick={(e) => {
        e.stopPropagation()
        handleDeletePost({ userId, dataId })
      }}>Delete</div>
    </DropdownMenuItem>

  )
}

export default DeleteButton
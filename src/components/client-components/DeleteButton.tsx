"use client"

import { handleDeletePost } from "../server-components/mutation"
import { DropdownMenuItem } from "../ui/dropdown-menu"


const DeleteButton = ({ userId, dataId }: { userId: string, dataId: string }) => {
  return (
    <DropdownMenuItem className="hover:!bg-black hover:!text-red-600 cursor-pointer text-red-600" onClick={(e) => e.stopPropagation}>
      <div onClick={(e) => {
        e.stopPropagation
        handleDeletePost({ userId, dataId })
      }}>Delete</div>
    </DropdownMenuItem>

  )
}

export default DeleteButton
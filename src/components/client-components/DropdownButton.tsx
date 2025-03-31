import { BsThreeDots } from "react-icons/bs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";


import React from 'react'
import DeleteButton from "./DeleteButton";

const DropdownButton = ({ username, data, userId }: { username: string, data: any, userId: string }) => {
    return (
        <div>
            {
                data.profilesId === userId ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <BsThreeDots />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-black text-white font-bold hover:bg-black shadow-[0px_0px_8px_rgba(255,255,255,0.5)] border border-transparent">
                            <DropdownMenuGroup className="space-y-3 px-3">
                                <DeleteButton userId={userId} dataId={data.id} />
                                
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Pin to your profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Highlight on your profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Add/remove @{username} from Lists
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Change who can reply
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    View data engagements
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Embed data
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    View data analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Request Community Note
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    :
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <BsThreeDots />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-black text-white font-bold hover:bg-black shadow-[0px_0px_8px_rgba(255,255,255,0.5)] border border-transparent">
                            <DropdownMenuGroup className="space-y-3 px-3">
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Follow @{username}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Add/remove @{username} from Lists
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Mute @{username}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Block @{username}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    View data engagements
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Embed data
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Report data
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:!bg-black hover:!text-white cursor-pointer">
                                    Request Community Note
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>

            }


        </div>
    )
}

export default DropdownButton


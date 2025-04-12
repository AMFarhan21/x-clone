import { BsThreeDots } from "react-icons/bs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import DeleteButton from "./DeleteButton";

type postOrReply = {
    profilesId: string,
    id: string
}

type DropdownButtonProps<T> = {
    username: string;
    userId?: string;
    data: T;
}

const DropdownButton = <T extends postOrReply>({ username, data, userId }: DropdownButtonProps<T>) => {
    return (
        <div>
            {
                data.profilesId === userId ?
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <BsThreeDots />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-70 bg-black text-white font-bold hover:bg-black shadow-[0px_0px_8px_rgba(255,255,255,0.5)] border border-transparent">
                            <DropdownMenuGroup className="space-y-3 px-3">
                                <DeleteButton userId={userId} dataId={data.id} />
                                
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl cursor-pointer px-4 py-1 text-sm">
                                    Pin to your profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl cursor-pointer px-4 py-1 text-sm">
                                    Highlight on your profile
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl cursor-pointer px-4 py-1 text-sm">
                                    Add/remove @{username} from Lists
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl cursor-pointer px-4 py-1 text-sm">
                                    Change who can reply
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl cursor-pointer px-4 py-1 text-sm">
                                    View data engagements
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl cursor-pointer px-4 py-1 text-sm">
                                    Embed data
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl cursor-pointer px-4 py-1 text-sm">
                                    View data analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl cursor-pointer px-4 py-1 mb-2 text-sm">
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
                        <DropdownMenuContent className="w-80 text-sm bg-black text-white font-bold hover:bg-black shadow-[0px_0px_8px_rgba(255,255,255,0.5)] border border-transparent">
                            <DropdownMenuGroup className="space-y-5 px-3">
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl hover:text-white cursor-pointer px-4 py-1 text-sm mt-2 ">
                                    Follow @{username}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl hover:text-white cursor-pointer px-4 py-1 text-sm">
                                    Add/remove @{username} from Lists
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl hover:text-white cursor-pointer px-4 py-1 text-sm">
                                    Mute @{username}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl hover:text-white cursor-pointer px-4 py-1 text-sm">
                                    Block @{username}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl hover:text-white cursor-pointer px-4 py-1 text-sm">
                                    View data engagements
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl hover:text-white cursor-pointer px-4 py-1 text-sm">
                                    Embed data
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl hover:text-white cursor-pointer px-4 py-1 text-sm">
                                    Report data
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-white/5 rounded-xl hover:text-white cursor-pointer px-4 py-1 text-sm mb-2 ">
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


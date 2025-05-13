"use client";

import React, { useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { searchUser } from "../server-components/action";
import { Profiles, UserLogin } from "@/types";
import Image from "next/image";
import FollowButton from "./FollowButton";
import Link from "next/link";

const SearchBar = ({
  userLogin,
  userLoginFollowingListIds,
}: {
  userLogin: UserLogin;
  userLoginFollowingListIds: string[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [foundQuery, setFoundQuery] = useState<Profiles[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!searchQuery.trim()) return;
      const findUser = await searchUser(searchQuery.toLowerCase().trim());
      const cleanedFindUser = findUser.filter((user) => user !== null);
      setFoundQuery(cleanedFindUser as Profiles[]);
    } catch (error) {
      console.log("ERROR ON FETCHING SEARCHQUERY: ", error);
    }
  };

  return (
    <div className="mt-2 mr-2">
      <form onSubmit={handleSearch} className="relative w-full h-full ml-1">
        <input
          id="searchBox"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="pl-8 peer border border-white/20 focus:border-blue-400 focus:border-2 focus:outline-none rounded-full text-sm w-full px-4 py-3"
        />
        <label
          htmlFor="searchBox"
          className="absolute top-0 left-3 items-center justify-center h-full sm:h-12 flex text-white/40 peer-focus:text-blue-400"
        >
          <HiMiniMagnifyingGlass className="" />
        </label>
      </form>

      {foundQuery.length > 0 && (
        <div className="mt-6">
          {foundQuery.map((find) => {
            const isMe = userLogin.id === find.id;
            const isUserLoginFollowing = userLoginFollowingListIds.includes(
              find.id
            );

            return (
              <Link href={`/${find.username}`} key={find.id} >
                <div  className="px-1 sm:px-4 py-2 hover:bg-gray-400/8">
                <div className="flex sm:flex-nowrap ">
                  <Image
                    alt={find.profilePicture}
                    src={find.profilePicture}
                    width={200}
                    height={200}
                    className="min-w-10 max-w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex justify-between w-full ml-2">
                    <div className="overflow-hidden">
                      <div className="font-bold"> {find.displayName} </div>
                      <div className="text-gray-500 text-sm mt-[-1px]">
                        {" "}
                        @{find.username}{" "}
                      </div>
                      <div className="text-sm"> {find.bio && find.bio} </div>
                    </div>
                    <div>
                      {!isMe && (
                        <FollowButton
                          userLogin={userLogin}
                          userId={userLogin.id}
                          targetUsername={find.username}
                          targetUserId={find.id}
                          isFollowed={isUserLoginFollowing}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

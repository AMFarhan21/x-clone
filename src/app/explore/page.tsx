import SearchBar from "@/components/client-components/SearchBar";
import { userIsLogin } from "@/components/server-components/action";
import { db } from "@/lib/db";
import { UserLogin } from "@/types";
import React from "react";

const Explorer = async () => {
  const { data, error } = await userIsLogin();
  if (error) return;
  // console.log(data);

  // const getFollower = await db.query.follows.findMany({
  //   where: (follows, { eq }) => eq(follows.following, data.user?.id as string),
  //   with: {
  //     followers: true,
  //   },
  // });

  const userLoginFollowingList = await db.query.follows.findMany({
    where: (follows, { eq }) => eq(follows.profilesId, data.user?.id as string),
  });

  const userLoginFollowingListIds = userLoginFollowingList.map((following) => following.following)

  return (
    <div className=" w-full sticky top-2">
      <SearchBar
        userLogin={data.user as UserLogin || undefined}
        userLoginFollowingListIds={userLoginFollowingListIds as string[]}
      />
    </div>
  );
};

export default Explorer;

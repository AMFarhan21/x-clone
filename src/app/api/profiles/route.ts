import { db } from "@/lib/db";
import {
  bookmark,
  follows,
  likes,
  post,
  profiles,
  reply,
  rePost,
} from "@/lib/db/schema";
import { createClient } from "@/utils/supabase/server";
import { randomUUID } from "crypto";
import { and, desc, eq, exists, or, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  const username = searchParams.get("username");

  const cekProfilesUsername = await db.query.profiles.findFirst({
    where: (profiles, { eq }) => eq(profiles.username, username),
  });
  const targetId = cekProfilesUsername?.id;

  const getoneprofile = await db
    .select({
      profiles,
      id: profiles.id,
      username: profiles.username,
      displayName: profiles.displayName,
      email: profiles.email,
      created_at: profiles.created_at,
      updated_at: profiles.updated_at,
      profilePicture: profiles.profilePicture,
      backgroundPicture: profiles.backgroundPicture,
      bio: profiles.bio,
      location: profiles.location,
      website: profiles.website,
      birthDate: profiles.birthDate,
      category: profiles.category,
      followingsCount:
        sql<number>`count(distinct ${follows.id}) filter (where ${profiles.id} = ${follows.profilesId})`.as(
          "followingsCount"
        ),
      followersCount:
        sql<number>`count(distinct ${follows.id}) filter (where ${profiles.id} = ${follows.following})`.as(
          "followersCount"
        ),
    })
    .from(profiles)
    .leftJoin(
      follows,
      or(
        eq(profiles.id, follows.profilesId),
        eq(profiles.id, follows.following)
      )
    )
    .where(eq(profiles.id, targetId))
    .groupBy(
      profiles.id,
      profiles.username,
      profiles.displayName,
      profiles.email,
      profiles.created_at,
      profiles.updated_at,
      profiles.profilePicture,
      profiles.backgroundPicture,
      profiles.bio,
      profiles.location,
      profiles.website,
      profiles.birthDate,
      profiles.category
    );
  const getOneProfiles = getoneprofile[0];

  const userProfiles = await db
    .select({
      profiles,
      id: profiles.id,
      username: profiles.username,
      displayName: profiles.displayName,
      email: profiles.email,
      created_at: profiles.created_at,
      updated_at: profiles.updated_at,
      profilePicture: profiles.profilePicture,
      backgroundPicture: profiles.backgroundPicture,
      bio: profiles.bio,
      location: profiles.location,
      website: profiles.website,
      birthDate: profiles.birthDate,
      category: profiles.category,
      followingsCount:
        sql<number>`count(distinct ${follows.id}) filter (where ${profiles.id} = ${follows.profilesId})`.as(
          "followingsCount"
        ),
      followersCount:
        sql<number>`count(distinct ${follows.id}) filter (where ${profiles.id} = ${follows.following})`.as(
          "followersCount"
        ),
    })
    .from(profiles)
    .leftJoin(
      follows,
      or(
        eq(follows.profilesId, profiles.id),
        eq(follows.following, profiles.id)
      )
    )
    .where(eq(profiles.id, userId))
    .groupBy(
      profiles.id,
      profiles.username,
      profiles.displayName,
      profiles.email,
      profiles.created_at,
      profiles.updated_at,
      profiles.profilePicture,
      profiles.backgroundPicture,
      profiles.bio,
      profiles.location,
      profiles.website,
      profiles.birthDate,
      profiles.category
    );

  const isFollowed = await db
    .select({
      isFollowed: exists(
        db
          .select()
          .from(follows)
          .where(
            and(eq(follows.profilesId, userId), eq(follows.following, targetId))
          )
      ),
    })
    .from(profiles)
    .leftJoin(follows, eq(follows.profilesId, profiles.id));

  const targetUserId = targetId ? targetId : userId;

  const posts = await db
    .select({
      post,
      id: post.id,
      text: post.text,
      imageUrl: post.imageUrl,
      profilesId: post.profilesId,
      created_at: post.created_at,
      updated_at: post.updated_at,
      username: profiles.username,
      displayName: profiles.displayName,
      backgroundPicture: profiles.backgroundPicture,
      profilePicture: profiles.profilePicture,
      bio: profiles.bio,
      location: profiles.location,
      website: profiles.website,
      profiles_created_at: profiles.created_at,
      likesCount: sql<number>`count(distinct ${likes.id})`.as("likesCount"),
      replyCount: sql<number>`count(distinct ${reply.id})`.as("replyCount"),
      rePostCount: sql<number>`count(distinct ${rePost.id})`.as("rePostCount"),
      isLiked: exists(
        db
          .select()
          .from(likes)
          .where(
            and(eq(likes.postId, post.id), eq(likes.profilesId, targetUserId))
          )
      ).as("isLiked"),
      isRePosted: exists(
        db
          .select()
          .from(rePost)
          .where(
            and(eq(rePost.postId, post.id), eq(rePost.profilesId, targetUserId))
          )
      ).as("isRePosted"),
      isBookmarked: exists(
        db
          .select()
          .from(bookmark)
          .where(
            and(
              eq(bookmark.postId, post.id),
              eq(bookmark.profilesId, targetUserId)
            )
          )
      ).as("isBookmarked"),
    })
    .from(post)
    .leftJoin(likes, eq(post.id, likes.postId))
    .leftJoin(reply, eq(post.id, reply.postId))
    .leftJoin(rePost, eq(post.id, rePost.postId))
    .leftJoin(bookmark, eq(post.id, bookmark.postId))
    .where(
      or(eq(profiles.id, targetUserId), eq(rePost.profilesId, targetUserId))
    )
    .innerJoin(profiles, eq(post.profilesId, profiles.id))
    .groupBy(
      post.id,
      post.imageUrl,
      profiles.username,
      profiles.displayName,
      post.created_at,
      profiles.backgroundPicture,
      profiles.profilePicture,
      profiles.bio,
      profiles.location,
      profiles.website,
      profiles.created_at
    )
    .orderBy(desc(post.created_at))
    .catch((error) => {
      console.log("ERROR FETCHING THE POSTS: ", error);
      return NextResponse.json({ success: false, message: error });
    });

  const replies = await db
    .select({
      reply,
      id: reply.id,
      text: reply.text,
      profilesId: reply.profilesId,
      postId: reply.postId,
      replyId: reply.id,
      imageUrl: reply.imageUrl,
      created_at: reply.created_at,
      updated_at: reply.updated_at,
      username: profiles.username,
      displayName: profiles.displayName,
      profilePicture: profiles.profilePicture,
      backgroundPicture: profiles.backgroundPicture,
      replyLikesCount: sql<number>`count(${likes.replyId})`.as(
        "replyLikesCount"
      ),
      replyRepostCount: sql<number>`count(distinct ${rePost.replyId})`.as(
        "replyRepostCount"
      ),
      isReplyLiked: exists(
        db
          .select()
          .from(likes)
          .where(
            and(eq(likes.replyId, reply.id), eq(likes.profilesId, targetUserId))
          )
      ).as("isReplyLiked"),
      isReplyReposted: exists(
        db
          .select()
          .from(rePost)
          .where(
            and(
              eq(rePost.replyId, reply.id),
              eq(rePost.profilesId, targetUserId)
            )
          )
      ).as("isReplyReposted"),
      isReplyBookmarked: exists(
        db
          .select()
          .from(bookmark)
          .where(
            and(
              eq(bookmark.replyId, reply.id),
              eq(bookmark.profilesId, targetUserId)
            )
          )
      ).as("isReplyBookmarked"),
    })
    .from(reply)
    .leftJoin(likes, eq(likes.replyId, reply.id))
    .leftJoin(rePost, eq(rePost.replyId, reply.id))
    .leftJoin(bookmark, eq(bookmark.replyId, reply.id))
    .where(
      or(
        eq(reply.profilesId, targetUserId),
        eq(rePost.profilesId, targetUserId)
      )
    )
    .innerJoin(profiles, eq(profiles.id, reply.profilesId))
    .groupBy(
      reply.id,
      reply.text,
      reply.profilesId,
      reply.postId,
      reply.created_at,
      reply.updated_at,
      reply.imageUrl,
      rePost.replyId,
      profiles.username,
      profiles.displayName,
      profiles.profilePicture,
      profiles.backgroundPicture
    )
    .orderBy(desc(reply.created_at))
    .catch((error) => {
      console.log("ERROR FETCHING THE REPLY: ", error);
      return NextResponse.json({ success: false, message: error });
    });

  // console.log(getOneProfiles)

  return NextResponse.json({
    userId,
    userProfiles,
    isFollowed,
    posts,
    replies,
    getOneProfiles,
  });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const website = formData.get("website") as string;
  const birthMonth = formData.get("birthMonth") as string;
  const birthDay = formData.get("birthDay") as string;
  const birthYear = formData.get("birthYear") as string;
  const birthDate = `${birthMonth} ${birthDay}, ${birthYear}`;
  const coverImageData = formData.get("coverImage");
  const profileImageData = formData.get("profileImage");

  const coverImage = coverImageData instanceof File ? coverImageData : null;
  const profileImage =
    profileImageData instanceof File ? profileImageData : null;

  const supabase = await createClient();

  const coverImageURL = async () => {
    const coverImageName = `profiles-cover/${randomUUID()}-${coverImage.name}`;
    const { data, error } = await supabase.storage
      .from("x-clone-bucket")
      .upload(coverImageName, coverImage);
    if (error) {
      console.log("ERROR INSERTING COVER IMAGE TO STORAGE: ", error);
      return null;
    }

    return supabase.storage.from("x-clone-bucket").getPublicUrl(data?.path).data
      .publicUrl;
  };

  const profileImageURL = async () => {
    const profileImageName = `profiles-image/${randomUUID()}-${
      profileImage.name
    }`;
    const { data, error } = await supabase.storage
      .from("x-clone-bucket")
      .upload(profileImageName, profileImage);
    if (error) {
      console.log("ERROR INSERTING PROFILE IMAGE TO STORAGE: ", error);
      return null;
    }
    return supabase.storage.from("x-clone-bucket").getPublicUrl(data?.path).data
      .publicUrl;
  };

  const res = await db
    .update(profiles)
    .set({
      displayName: name,
      bio,
      location,
      website,
      birthDate,
      ...(coverImage ? { backgroundPicture: await coverImageURL() } : {}),
      ...(profileImage ? { profilePicture: await profileImageURL() } : {}),
    })
    .where(eq(profiles.id, userId))
    .catch((error) => {
      console.log("ERROR UPDATING PROFILES DETAILS: ", error);
      return NextResponse.json({
        success: false,
        error,
        message: "ERROR UPDATING PROFILES DETAILS",
      });
    });

  console.log("PROFILES UPDATED");
  return NextResponse.json({
    success: true,
    res,
    message: "Profile is updated",
  });
}

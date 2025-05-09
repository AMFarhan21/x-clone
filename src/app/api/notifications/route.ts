import { db } from "@/lib/db"
import { follows, likes, post, profiles, reply, rePost } from "@/lib/db/schema"
import { desc, eq } from "drizzle-orm"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const {searchParams} = new URL(req.url)
    const userId = searchParams.get("userId") || null

    const postLikesNotif = await db
    .select({
      postId: post.id,
      postText: post.text,
      postImageUrl: post.imageUrl,
      likerId: profiles.id,
      likerUsername: profiles.username,
      likerDisplayName: profiles.displayName,
      likerProfilePicture: profiles.profilePicture,
      likesId: likes.id,
      createdAt: likes.created_at
    })
    .from(likes)
    .innerJoin(post, eq(likes.postId, post.id))
    .innerJoin(profiles, eq(likes.profilesId, profiles.id))
    .where(eq(post.profilesId, userId as string))
    .orderBy(desc(likes.created_at))
    .groupBy(
      post.id,
      post.text,
      post.imageUrl,
      profiles.id,
      profiles.username,
      profiles.displayName,
      profiles.profilePicture,
      likes.id,
      likes.created_at

    ).catch((error) => {
      console.log("ERROR ON NOTIFICATION ROUTE -> POST LIKES NOTIF: ", error)
      return NextResponse.json({ success: false, error, message: "ERROR ON LIKES ROUTE -> LIKES NOTIF" })
    })


    const replyLikesNotif = await db
    .select({
      replyId: reply.id, 
      replyText: reply.text,
      replyImageUrl: reply.imageUrl,
      likerId: profiles.id,
      likerUsername: profiles.username,
      likerDisplayName: profiles.displayName,
      likerProfilePicture: profiles.profilePicture,
      likesId: likes.id,
      createdAt: likes.created_at
    })
    .from(likes)
    .innerJoin(reply, eq(likes.replyId, reply.id))
    .innerJoin(profiles, eq(likes.profilesId, profiles.id))
    .where(eq(reply.profilesId, userId as string))
    .orderBy(desc(likes.created_at))
    .groupBy(
      reply.id, 
      reply.text,
      reply.imageUrl,
      profiles.id,
      profiles.username,
      profiles.displayName,
      profiles.profilePicture,
      likes.id,
      likes.created_at
    ).catch((error) => {
      console.log("ERROR ON NOTIFICATION ROUTE -> REPLY LIKES NOTIF: ", error)
      return NextResponse.json({success: false, error, message: "ERROR ON LIKES ROUTE -> REPLY LIKES NOTIF"})
    })


    const repostPostNotif  = await db
    .select({
      postId: post.id,
      postText: post.text,
      postImageUrl: post.imageUrl,
      reposterId: profiles.id,
      reposterUsername: profiles.username,
      reposterDisplayName: profiles.displayName,
      reposterProfilePicture: profiles.profilePicture,
      repostId: rePost.id,
      createdAt: rePost.created_at
    })
    .from(rePost)
    .innerJoin(post, eq(rePost.postId, post.id))
    .innerJoin(profiles, eq(rePost.profilesId, profiles.id))
    .where(eq(post.profilesId, userId as string))
    .orderBy(desc(rePost.created_at))
    .groupBy(
      post.id,
      post.text,
      post.imageUrl,
      profiles.id,
      profiles.username,
      profiles.displayName,
      profiles.profilePicture,
      rePost.id,
      rePost.created_at
    )
    .catch((error) => {
      console.log("ERROR ON NOTIFICATION ROUTE -> POST REPOST NOTIF: ", error)
      return NextResponse.json({success: false, error, message: "ERROR ON NOTIFICATION ROUTE -> POST REPOST NOTIF"})
    })

    const repostReplyNotif = await db
    .select({
      replyId: reply.id,
      replyText: reply.text,
      replyImageUrl: reply.imageUrl,
      reposterId: profiles.id,
      reposterUsername: profiles.username,
      reposterDisplayName: profiles.displayName,
      reposterProfilePicture: profiles.profilePicture,
      repostId: rePost.id,
      createdAt: rePost.created_at
    })
    .from(rePost)
    .innerJoin(reply, eq(rePost.replyId, reply.id))
    .innerJoin(profiles, eq(rePost.profilesId, profiles.id))
    .where(eq(reply.profilesId, userId as string))
    .orderBy(desc(rePost.created_at))
    .groupBy()
    .catch((error) => {
      console.log("ERROR ON NOTIFICATION ROUTE -> REPLY REPOST NOTIF: ", error)
      return NextResponse.json({success: true, error, message: "ERROR ON NOTIFICATION ROUTE -> REPLY REPOST NOTIF"})
    })

    const followsNotif = await db
    .select({
      id: follows.id,
      followersId: follows.profilesId,
      followedId: follows.following,
      createdAt: follows.created_at,
      username: profiles.username,
      displayName: profiles.displayName,
      profilePicture: profiles.profilePicture
    })
    .from(follows)
    .innerJoin(profiles, eq(follows.profilesId, profiles.id))
    .where(eq(follows.following, userId as string))
    .orderBy(desc(follows.created_at))
    .groupBy(
      follows.id,
      follows.profilesId,
      follows.following,
      follows.created_at,
      profiles.username,
      profiles.displayName,
      profiles.profilePicture
    )
    .catch((error) => {
      console.log("ERROR ON NOTIFICATION ROUTE -> FOLLOWS NOTIF: ", error)
      return NextResponse.json({success: true, error, message: "ERROR ON NOTIFICATION ROUTE -> FOLLOWS NOTIF"})
    })
    


    return NextResponse.json({success: true, postLikesNotif, replyLikesNotif, repostPostNotif, repostReplyNotif, followsNotif})
}
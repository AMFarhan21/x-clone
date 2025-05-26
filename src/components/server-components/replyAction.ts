import { db } from "@/lib/db";
import { bookmark, likes, post, profiles, reply, rePost, } from "@/lib/db/schema";
import { and, desc, eq, exists, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { NextResponse } from "next/server";

export async function getRepliesAction(userId: string, dataId: string) {
    const userProfiles = await db.query.profiles.findFirst({
        where: (profiles, { eq }) => eq(profiles.id, userId),
    });

    const idFromPost = await db.query.post.findFirst({
        where: (post, { eq }) => eq(post.id, dataId),
    });

    const idFromReply = await db.query.reply.findFirst({
        where: (reply, { eq }) => eq(reply.id, dataId),
    });

    const nestedReply = alias(reply, "nestedReply")

    if (idFromPost) {
        const resOnePost = await db
            .select({
                post,
                id: post.id,
                profilesId: post.profilesId,
                text: post.text,
                imageUrl: post.imageUrl,
                created_at: post.created_at,
                updated_at: post.updated_at,
                username: profiles.username,
                displayName: profiles.displayName,
                profilePicture: profiles.profilePicture,
                likesCount: sql<number>`count(distinct ${likes.id})`.as("likesCount"),
                replyCount: sql<number>`count(distinct ${reply.id})`.as("replyCount"),
                rePostCount: sql<number>`count(distinct ${rePost.id})`.as(
                    "rePostCount"
                ),
                isLiked: exists(
                    db
                        .select()
                        .from(likes)
                        .where(and(eq(likes.profilesId, userId), eq(likes.postId, post.id)))
                ).as("isLiked"),
                isRePosted: exists(
                    db
                        .select()
                        .from(rePost)
                        .where(
                            and(eq(rePost.postId, post.id), eq(rePost.profilesId, userId))
                        )
                ).as("isRePosted"),
                isBookmarked: exists(
                    db
                        .select()
                        .from(bookmark)
                        .where(
                            and(eq(bookmark.postId, post.id), eq(bookmark.profilesId, userId))
                        )
                ).as("isBookmarked"),
            })
            .from(post)
            .leftJoin(likes, eq(post.id, likes.postId))
            .leftJoin(reply, eq(post.id, reply.postId))
            .leftJoin(rePost, eq(post.id, rePost.postId))
            .where(eq(post.id, dataId))
            .innerJoin(profiles, eq(profiles.id, post.profilesId))
            .groupBy(
                post.id,
                post.profilesId,
                post.text,
                post.imageUrl,
                post.created_at,
                post.updated_at,
                profiles.username,
                profiles.displayName,
                profiles.profilePicture
            );

        const res = await db
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
                replyLikesCount: sql<number>`count(distinct ${likes.replyId})`.as(
                    "replyLikesCount"
                ),
                replyRepostCount: sql<number>`count(distinct ${rePost.replyId})`.as(
                    "replyRepostCount"
                ),
                replyCount: sql<number>`count(distinct ${nestedReply.id})`.as('replyCount'),
                isReplyLiked: exists(
                    db
                        .select()
                        .from(likes)
                        .where(
                            and(eq(likes.replyId, reply.id), eq(likes.profilesId, userId))
                        )
                ).as("isReplyLiked"),
                isReplyReposted: exists(
                    db
                        .select()
                        .from(rePost)
                        .where(
                            and(eq(rePost.replyId, reply.id), eq(rePost.profilesId, userId))
                        )
                ).as("isReplyReposted"),
                isReplyBookmarked: exists(
                    db
                        .select()
                        .from(bookmark)
                        .where(
                            and(
                                eq(bookmark.replyId, reply.id),
                                eq(bookmark.profilesId, userId)
                            )
                        )
                ).as("isReplyBookmarked"),
            })
            .from(reply)
            .where(eq(reply.postId, dataId))
            .leftJoin(likes, eq(likes.replyId, reply.id))
            .leftJoin(rePost, eq(rePost.replyId, reply.id))
            .leftJoin(bookmark, eq(bookmark.replyId, reply.id))
            .leftJoin(nestedReply, eq(nestedReply.replyId, reply.id))
            .innerJoin(profiles, eq(profiles.id, reply.profilesId))
            .groupBy(
                reply.id,
                reply.text,
                reply.profilesId,
                reply.postId,
                reply.created_at,
                reply.updated_at,
                reply.imageUrl,
                profiles.username,
                profiles.displayName,
                profiles.profilePicture
            )
            .orderBy(desc(reply.created_at))
            .catch((error) => {
                console.log("ERROR FETCHING THE REPLY: ", error);
                return NextResponse.json({ success: false, message: error });
            });

        // revalidatePath("/");
        return NextResponse.json({
            success: true,
            message: "SUCCESSFULLY FETCH REPLY FOR THIS POST",
            res,
            resOnePost,
            userProfiles,
        });
    } else if (idFromReply) {
        const resOnePost = await db
            .select({
                reply,
                id: reply.id,
                profilesId: reply.profilesId,
                text: reply.text,
                imageUrl: reply.imageUrl,
                created_at: reply.created_at,
                updated_at: reply.updated_at,
                username: profiles.username,
                displayName: profiles.displayName,
                profilePicture: profiles.profilePicture,
                likesCount: sql<number>`count(distinct ${likes.id})`.as("likesCount"),
                replyCount: sql<number>`count(distinct ${nestedReply.id})`.as("replyCount"),
                rePostCount: sql<number>`count(distinct ${rePost.id})`.as(
                    "rePostCount"
                ),
                isLiked: exists(
                    db
                        .select()
                        .from(likes)
                        .where(and(eq(likes.profilesId, userId), eq(likes.replyId, reply.id)))
                ).as("isLiked"),
                isRePosted: exists(
                    db
                        .select()
                        .from(rePost)
                        .where(
                            and(eq(rePost.replyId, reply.id), eq(rePost.profilesId, userId))
                        )
                ).as("isRePosted"),
                isBookmarked: exists(
                    db
                        .select()
                        .from(bookmark)
                        .where(
                            and(eq(bookmark.replyId, reply.id), eq(bookmark.profilesId, userId))
                        )
                ).as("isBookmarked"),
            })
            .from(reply)
            .leftJoin(likes, eq(reply.id, likes.replyId))
            .leftJoin(rePost, eq(reply.id, rePost.replyId))
            .leftJoin(nestedReply, eq(nestedReply.replyId, reply.id))
            .where(eq(reply.id, dataId))
            .innerJoin(profiles, eq(profiles.id, reply.profilesId))
            .groupBy(
                reply.id,
                reply.profilesId,
                reply.text,
                reply.imageUrl,
                reply.created_at,
                reply.updated_at,
                profiles.username,
                profiles.displayName,
                profiles.profilePicture
            );

        const res = await db
            .select({
                reply,
                id: reply.id,
                text: reply.text,
                profilesId: reply.profilesId,
                replyId: reply.replyId,
                imageUrl: reply.imageUrl,
                created_at: reply.created_at,
                updated_at: reply.updated_at,
                username: profiles.username,
                displayName: profiles.displayName,
                profilePicture: profiles.profilePicture,
                replyLikesCount: sql<number>`count(distinct ${likes.replyId})`.as(
                    "replyLikesCount"
                ),
                replyRepostCount: sql<number>`count(distinct ${rePost.replyId})`.as(
                    "replyRepostCount"
                ),
                replyCOunt: sql<number>`count(distinct ${nestedReply.id})`.as("replyCount"),
                isReplyLiked: exists(
                    db
                        .select()
                        .from(likes)
                        .where(
                            and(eq(likes.replyId, reply.id), eq(likes.profilesId, userId))
                        )
                ).as("isReplyLiked"),
                isReplyReposted: exists(
                    db
                        .select()
                        .from(rePost)
                        .where(
                            and(eq(rePost.replyId, reply.id), eq(rePost.profilesId, userId))
                        )
                ).as("isReplyReposted"),
                isReplyBookmarked: exists(
                    db
                        .select()
                        .from(bookmark)
                        .where(
                            and(
                                eq(bookmark.replyId, reply.id),
                                eq(bookmark.profilesId, userId)
                            )
                        )
                ).as("isReplyBookmarked"),
            })
            .from(reply)
            .where(eq(reply.replyId, dataId))
            .leftJoin(likes, eq(likes.replyId, reply.id))
            .leftJoin(rePost, eq(rePost.replyId, reply.id))
            .leftJoin(bookmark, eq(bookmark.replyId, reply.id))
            .leftJoin(nestedReply, eq(nestedReply.replyId, reply.id))
            .innerJoin(profiles, eq(profiles.id, reply.profilesId))
            .groupBy(
                reply.id,
                reply.text,
                reply.profilesId,
                reply.replyId,
                reply.created_at,
                reply.updated_at,
                reply.imageUrl,
                profiles.username,
                profiles.displayName,
                profiles.profilePicture
            )
            .orderBy(desc(reply.created_at))
            .catch((error) => {
                console.log("ERROR FETCHING THE REPLY: ", error);
                return NextResponse.json({ success: false, message: error });
            });

        // revalidatePath("/");
        return NextResponse.json({
            success: true,
            message: "SUCCESSFULLY FETCH REPLY FOR THIS POST",
            res,
            resOnePost,
            userProfiles,
        });
    }
}

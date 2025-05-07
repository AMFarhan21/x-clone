import { relations } from "drizzle-orm/relations";
import { profiles, post, bookmark, likes, reply, hashtag, postHashtag } from "./schema";

export const profilesRelations = relations(profiles, ({one, many}) => ({
	bookmarks: many(bookmark),
	likes: many(likes),
	replies: many(reply),
	posts: many(post),
}));


export const bookmarkRelations = relations(bookmark, ({one}) => ({
	post: one(post, {
		fields: [bookmark.postid],
		references: [post.id]
	}),
	profile: one(profiles, {
		fields: [bookmark.profilesid],
		references: [profiles.id]
	}),
}));

export const postRelations = relations(post, ({one, many}) => ({
	bookmarks: many(bookmark),
	likes: many(likes),
	replies: many(reply),
	profile: one(profiles, {
		fields: [post.profilesid],
		references: [profiles.id]
	}),
	postHashtags: many(postHashtag),
}));

export const likesRelations = relations(likes, ({one}) => ({
	post: one(post, {
		fields: [likes.postid],
		references: [post.id]
	}),
	profile: one(profiles, {
		fields: [likes.profilesid],
		references: [profiles.id]
	}),
}));

export const replyRelations = relations(reply, ({one, many}) => ({
	post: one(post, {
		fields: [reply.postid],
		references: [post.id]
	}),
	profile: one(profiles, {
		fields: [reply.profilesid],
		references: [profiles.id]
	}),
	reply: one(reply, {
		fields: [reply.replyid],
		references: [reply.id],
		relationName: "reply_replyid_reply_id"
	}),
	replies: many(reply, {
		relationName: "reply_replyid_reply_id"
	}),
}));

export const postHashtagRelations = relations(postHashtag, ({one}) => ({
	hashtag: one(hashtag, {
		fields: [postHashtag.hashtagid],
		references: [hashtag.id]
	}),
	post: one(post, {
		fields: [postHashtag.postid],
		references: [post.id]
	}),
}));

export const hashtagRelations = relations(hashtag, ({many}) => ({
	postHashtags: many(postHashtag),
}));
import { pgTable, foreignKey, unique, pgPolicy, check, uuid, timestamp, text, index, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const users = pgTable("users", {
	id: uuid("id").primaryKey().notNull(),
});

export const profiles = pgTable("profiles", {
	id: uuid().primaryKey().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
	username: text().notNull(),
	fullName: text("full_name"),
	email: text(),
}, (table) => [
	foreignKey({
		columns: [table.id],
		foreignColumns: [users.id],
		name: "profiles_id_fkey"
	}).onDelete("cascade"),
	unique("profiles_username_key").on(table.username),
	unique("profiles_email_key").on(table.email),
	pgPolicy("Public profiles are viewable by everyone.", { as: "permissive", for: "select", to: ["public"], using: sql`true` }),
	pgPolicy("Users can insert their own profile.", { as: "permissive", for: "insert", to: ["public"] }),
	pgPolicy("Users can update own profile.", { as: "permissive", for: "update", to: ["public"] }),
	check("username_length", sql`char_length(username) >= 3`),
]);

export const bookmark = pgTable("bookmark", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	profilesid: uuid().notNull(),
	postid: uuid().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
}, (table) => [
	foreignKey({
		columns: [table.postid],
		foreignColumns: [post.id],
		name: "fk_bookmark_post"
	}).onDelete("cascade"),
	foreignKey({
		columns: [table.profilesid],
		foreignColumns: [profiles.id],
		name: "fk_bookmark_profiles"
	}).onDelete("cascade"),
]);

export const hashtag = pgTable("hashtag", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	name: text().notNull(),
});

export const likes = pgTable("likes", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	profilesid: uuid().notNull(),
	postid: uuid().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
}, (table) => [
	index("idx_likes_profilesid_postid").using("btree", table.profilesid.asc().nullsLast().op("uuid_ops"), table.postid.asc().nullsLast().op("uuid_ops")),
	foreignKey({
		columns: [table.postid],
		foreignColumns: [post.id],
		name: "fk_likes_post"
	}).onDelete("cascade"),
	foreignKey({
		columns: [table.profilesid],
		foreignColumns: [profiles.id],
		name: "fk_likes_profiles"
	}).onDelete("cascade"),
]);

export const reply = pgTable("reply", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	text: text().notNull(),
	profilesid: uuid().notNull(),
	postid: uuid().notNull(),
	replyid: uuid(),
}, (table) => [
	foreignKey({
		columns: [table.postid],
		foreignColumns: [post.id],
		name: "fk_reply_post"
	}).onDelete("cascade"),
	foreignKey({
		columns: [table.profilesid],
		foreignColumns: [profiles.id],
		name: "fk_reply_profiles"
	}).onDelete("cascade"),
	foreignKey({
		columns: [table.replyid],
		foreignColumns: [table.id],
		name: "fk_reply_reply"
	}).onDelete("set null"),
]);

export const post = pgTable("post", {
	id: uuid().primaryKey().notNull(),
	text: text(),
	profilesid: uuid(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`),
}, (table) => [
	index("idx_post_profilesid_postid").using("btree", table.profilesid.asc().nullsLast().op("uuid_ops"), table.id.asc().nullsLast().op("uuid_ops")),
	foreignKey({
		columns: [table.profilesid],
		foreignColumns: [profiles.id],
		name: "fk_post_profiles"
	}).onDelete("cascade"),
]);

export const postHashtag = pgTable("post_hashtag", {
	postid: uuid().notNull(),
	hashtagid: uuid().notNull(),
}, (table) => [
	foreignKey({
		columns: [table.hashtagid],
		foreignColumns: [hashtag.id],
		name: "post_hashtag_hashtagid_fkey"
	}).onDelete("cascade"),
	foreignKey({
		columns: [table.postid],
		foreignColumns: [post.id],
		name: "post_hashtag_postid_fkey"
	}).onDelete("cascade"),
	primaryKey({ columns: [table.postid, table.hashtagid], name: "post_hashtag_pkey" }),
]);

import { pgTable, uuid, text, timestamp, unique, AnyPgColumn, uniqueIndex } from "drizzle-orm/pg-core";


export const profiles = pgTable("profiles", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),//.references(() => authUsers.id, { onDelete: "cascade" }),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    username: text("username").unique(),
    fullName: text("full_name"),
    email: text("email"),
  });
  
  export const post = pgTable("post", {
    id: uuid("id").defaultRandom().primaryKey(),
    text: text("text"),
    profilesId: uuid("profilesId").references(() => profiles.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  });
  
  export const hashtag = pgTable("hashtag", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
  });
  
  export const postHashtag = pgTable("post_hashtag", {
    postId: uuid("postId").references(() => post.id, { onDelete: "cascade" }),
    hashtagId: uuid("hashtagId").references(() => hashtag.id, { onDelete: "cascade" }),
  }, (table) => ({
    pk: unique().on(table.postId, table.hashtagId),
  }));
  
  export const likes = pgTable("likes", {
    id: uuid("id").defaultRandom().primaryKey(),
    profilesId: uuid("profilesId").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    postId: uuid("postId").notNull().references(() => post.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  }, (likes) => [
    uniqueIndex("likes_profilesId_postId_idx").on(likes.profilesId, likes.postId)
  ]
)
  
  export const bookmark = pgTable("bookmark", {
    id: uuid("id").defaultRandom().primaryKey(),
    profilesId: uuid("profilesId").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    postId: uuid("postId").notNull().references(() => post.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  }, (bookmark) => [
    uniqueIndex("bookmark_profilesId_postId_idx").on(bookmark.profilesId, bookmark.postId)
  ]);
  
  export const reply = pgTable("reply", {
    id: uuid("id").defaultRandom().primaryKey(),
    text: text("text").notNull(),
    profilesId: uuid("profilesId").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    postId: uuid("postId").notNull().references(() => post.id, { onDelete: "cascade" }),
    replyId: uuid("replyId").references(():AnyPgColumn => reply.id, { onDelete: "set null" }),
  });
  
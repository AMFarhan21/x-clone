import { relations } from "drizzle-orm";
import { pgTable, uuid, text, timestamp, unique, AnyPgColumn, uniqueIndex } from "drizzle-orm/pg-core";


  export const profiles = pgTable("profiles", {
    id: uuid("id").defaultRandom().primaryKey().notNull(),//.references(() => authUsers.id, { onDelete: "cascade" }),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
    username: text("username").unique(),
    fullName: text("full_name"),
    email: text("email"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  });
  export const profilesRelations = relations(profiles, ({one, many}) => ({
    post: many(post),
    likes: many(likes),
    bookmark: many(bookmark),
    reply: many(reply),
  }))

  
  export const post = pgTable("post", {
    id: uuid("id").defaultRandom().primaryKey(),
    text: text("text"),
    profilesId: uuid("profilesId").references(() => profiles.id, { onDelete: "cascade" }),
    imageUrl: text("imageUrl"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  });
  export const postRelations = relations(post, ({one, many}) => ({
    profiles: one(profiles, {
      fields: [post.profilesId],
      references: [profiles.id]
    }),
    likes: many(likes),
    bookmark: many(bookmark),
    reply: many(reply),
    postHashtag: many(postHashtag),
  }))


  export const rePost = pgTable("rePost", {
    id: uuid("id").defaultRandom().primaryKey(),
    profilesId: uuid("profilesId").references(() => profiles.id, { onDelete: "cascade" }),
    postId: uuid("postId").references(() => post.id, { onDelete: "cascade" }),
  })
  export const rePostRelations = relations(rePost, ({one})=> ({
    profiles: one(profiles, {
      fields: [rePost.profilesId],
      references: [profiles.id]
    }),
    post: one(post, {
      fields: [rePost.postId],
      references: [post.id]
    }),
  })) 
   

  export const hashtag = pgTable("hashtag", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
  });
  export const hashtagRelations = relations(hashtag, ({many}) => ({
    postHashtag: many(postHashtag),
  }))
  

  export const postHashtag = pgTable("post_hashtag", {
    postId: uuid("postId").references(() => post.id, { onDelete: "cascade" }),
    hashtagId: uuid("hashtagId").references(() => hashtag.id, { onDelete: "cascade" }),
  }, (table) => ({
    pk: unique().on(table.postId, table.hashtagId),
  }));

  export const postHashtagRelations = relations(postHashtag, ({one}) => ({
    post: one(post, {
      fields: [postHashtag.postId],
      references: [post.id]
    }),
    hashtag: one(hashtag, {
      fields: [postHashtag.hashtagId],
      references: [hashtag.id]
    }),
    
  }))

  
  export const likes = pgTable("likes", {
    id: uuid("id").defaultRandom().primaryKey(),
    profilesId: uuid("profilesId").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    postId: uuid("postId").references(() => post.id, { onDelete: "cascade" }),
    replyId: uuid("replyId").references(() => reply.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  }, (likes) => [
    uniqueIndex("likes_profilesId_postId_idx").on(likes.profilesId, likes.postId, likes.replyId)
  ]
  )
  export const likesRelations = relations(likes, ({one}) => ({
    profiles: one(profiles, {
      fields: [likes.profilesId],
      references: [profiles.id]
    }),
    post: one(post, {
      fields: [likes.postId],
      references: [post.id]
    }),
    reply: one(reply, {
      fields: [likes.replyId],
      references: [reply.id]
    })
  }))
  

  export const bookmark = pgTable("bookmark", {
    id: uuid("id").defaultRandom().primaryKey(),
    profilesId: uuid("profilesId").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    postId: uuid("postId").notNull().references(() => post.id, { onDelete: "cascade" }),
    replyId: uuid("replyId").notNull().references(() => reply.id, { onDelete: "cascade" }),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
  }, (bookmark) => [
    uniqueIndex("bookmark_profilesId_postId_idx").on(bookmark.profilesId, bookmark.postId)
  ]);
  export const bookmarkRelations = relations(bookmark, ({one}) => ({
    profiles: one(profiles, {
      fields: [bookmark.profilesId],
      references: [profiles.id]
    }),
    post: one(post, {
      fields: [bookmark.postId],
      references: [post.id]
    }),
    reply: one(reply, {
      fields: [bookmark.replyId],
      references: [reply.id]
    })
  }))

  
  export const reply = pgTable("reply", {
    id: uuid("id").defaultRandom().primaryKey(),
    text: text("text").notNull(),
    profilesId: uuid("profilesId").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    postId: uuid("postId").notNull().references(() => post.id, { onDelete: "cascade" }),
    replyId: uuid("replyId").references(():AnyPgColumn => reply.id, { onDelete: "set null" }),
    imageUrl: text("imageUrl"),
    created_at: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  });  
  export const replyRelations = relations(reply, ({one, many}) => ({
    profiles: one(profiles, {
      fields: [reply.profilesId],
      references: [profiles.id]
    }),
    post: one(post, {
      fields: [reply.postId],
      references: [post.id]
    }),
    reply: one(reply, {
      fields: [reply.replyId],
      references: [reply.id]
    }),
    likes: many(likes),
  }))
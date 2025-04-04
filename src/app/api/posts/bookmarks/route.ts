import { db } from "@/lib/db"
import { bookmark, post } from "@/lib/db/schema"
import { error } from "console"
import { randomUUID } from "crypto"
import { and, eq } from "drizzle-orm"
import { NextResponse } from "next/server"



export async function POST(req: Request) {
    const {postId, userId} = await req.json()

    const existing = await db.query.bookmark.findFirst({
        where: (bookmark, {and, eq}) => 
            and(eq(bookmark.postId, postId), eq(bookmark.profilesId, userId))
    })


    if(existing) {
        const res = await db.delete(bookmark).where(and(eq(bookmark.postId, postId), eq(bookmark.profilesId, userId))).catch((error) => {
            console.log("ERROR DELETING BOOKMARK", error)
            return NextResponse.json({success: false, message: "ERROR DELETING BOOKMARK", error})
        })
        console.log("Bookmark deleted", res)
        return NextResponse.json({success: true, message: "Bookmark deleted", res})
    }


    const res = await db.insert(bookmark).values({
        id: randomUUID(),
        profilesId: userId,
        postId,
    }).catch((error) => {
        console.log("ERROR INSERTING BOOKMARK", error)
        return NextResponse.json({success: false, message: "ERROR INSERTING BOOKMARK", error})
    })

    console.log("Bookmarked", res)
    return NextResponse.json({success: true, message: "Bookmarked", res})
}
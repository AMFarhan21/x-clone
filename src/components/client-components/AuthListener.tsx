// 'use client'

// import { createClient } from "@/utils/supabase/client"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"
// import { toast } from "sonner"


// const AuthListener = () => {
//     const router = useRouter()

//     useEffect(() => {
//         const supabase = createClient()
//         const {data: listener} = supabase.auth.onAuthStateChange((event, session) => {
//             console.log("Auth Event", event)
            
//             if(event == "SIGNED_IN") {
//                 // toast.success("You are logged in")
//                 router.refresh()
//             } else if(event === "SIGNED_OUT") {
//                 toast.info("You are logged out")
//                 router.refresh()
//             }

//             console.log("SESSION", session)
//         })

//         return () => {
//             listener.subscription.unsubscribe()
//         }
//     }, [router])

//   return null
// }

// export default AuthListener
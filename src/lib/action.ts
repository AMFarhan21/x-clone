'use server'

import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email") as String
    const username = formData.get("username") as String

    // Check if username exists
    const { data, error } = await supabase.from('profiles').select().eq('username', username.trim());

    if (error) {
        return toast.error("Failed to check username, please try again")
    }

    if (data && data.length > 0) {
        console.log(data)
        return toast.error("Username already existed")
    }

    const {error: signInError} = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
            data: {
                username,
            }
        }

    })

    if(signInError) {
        return {error: signInError.message}
    }

    return { message: "OTP sent! Check your email"}

    
}
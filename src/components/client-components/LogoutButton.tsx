'use client'
import { signOut } from '@/lib/action'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogoutButton = ({username}: {username?: string} ) => {
    const router = useRouter()

    const handleLogout = async() => {
        await signOut()
        router.refresh()
        window.location.href = "/"
    }

    return (
        <form>
            <button formAction={handleLogout}>Log out <span>@{username}</span></button>
        </form>
    )
}

export default LogoutButton
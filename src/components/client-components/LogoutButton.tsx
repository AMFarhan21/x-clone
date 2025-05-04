'use client'
import { signOut } from '@/lib/action'
import { Profiles, UserLogin } from '@/types'
import { useRouter } from 'next/navigation'
import React from 'react'

const LogoutButton = ({userProfiles}: {userProfiles?: Profiles} ) => {
    const router = useRouter()

    const handleLogout = async() => {
        await signOut()
        router.refresh()
        window.location.href = "/"
    }

    return (
        <form>
            <button formAction={handleLogout}>Log out <span>@{userProfiles?.username}</span></button>
        </form>
    )
}

export default LogoutButton
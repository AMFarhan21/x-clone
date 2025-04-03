'use client'
import { createClient } from "@/utils/supabase/client";
import { createContext, useContext, useEffect, useState } from "react";



const UserContext = createContext();


export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const supabase = createClient();
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.log("ERROR GETTING THE USER", error)
            }

            if (data) {
                setUser(data.user)
                console.log(data)

            }
        }

        fetchUser()
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}



export const useUser = () => useContext(UserContext);
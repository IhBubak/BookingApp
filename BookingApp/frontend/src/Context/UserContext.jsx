import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext(null)

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null)
    //to solve the problem of the delay of profile, when refresh with logged user, it will redirect to login instead of account due to delay
    const [ready, setReady] = useState(false)
    useEffect(() => {
        try {
            if (!user) {
                axios.get("/profile").then(({ data }) => {
                    setUser(data)
                    setReady(true)
                }).catch(error => {
                    console.log(error)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}
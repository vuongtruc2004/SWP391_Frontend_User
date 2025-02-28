'use client'
import { storageUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface IUserAvatar {
    avatarSrc: string;
    fullname: string;
    setAvatarSrc: Dispatch<SetStateAction<string>>;
    setFullname: Dispatch<SetStateAction<string>>;
}
const UserAvatarContext = createContext<IUserAvatar | null>(null);

export const UserAvatarWrapper = ({ children }: { children: React.ReactNode }) => {
    const [avatarSrc, setAvatarSrc] = useState("");
    const [fullname, setFullname] = useState("");
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            setAvatarSrc(session?.user?.avatar?.startsWith("http") ? session?.user?.avatar : `${storageUrl}/avatar/${session?.user?.avatar}`);
            setFullname(session.user.fullname);
        }
    }, [session]);

    return (
        <UserAvatarContext.Provider value={{ avatarSrc, setAvatarSrc, fullname, setFullname }}>
            {children}
        </UserAvatarContext.Provider>
    )
}

export const useUserAvatar = () => {
    const context = useContext(UserAvatarContext);
    if (!context) {
        throw new Error("useUserAvatar must be used within a UserAvatarWrapper");
    }
    return context;
};
'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl, storageUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react"

interface IUserAvatar {
    loading: boolean;
    userProgresses: UserProgressResponse[];
    setUserProgresses: Dispatch<SetStateAction<UserProgressResponse[]>>;
    avatarSrc: string;
    fullname: string;
    setAvatarSrc: Dispatch<SetStateAction<string>>;
    setFullname: Dispatch<SetStateAction<string>>;
}
const UserAvatarContext = createContext<IUserAvatar | null>(null);

export const UserAvatarWrapper = ({ children }: { children: React.ReactNode }) => {
    const [avatarSrc, setAvatarSrc] = useState("");
    const [fullname, setFullname] = useState("");
    const [userProgresses, setUserProgresses] = useState<UserProgressResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchData = async () => {
            if (status === "authenticated") {
                const userProgressResponse = await sendRequest<ApiResponse<UserProgressResponse[]>>({
                    url: `${apiUrl}/progress`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                if (userProgressResponse.status === 200) {
                    setUserProgresses(userProgressResponse.data);
                }
            }
            setLoading(false);
        }

        if (status === "authenticated") {
            setAvatarSrc(session?.user?.avatar?.startsWith("http") ? session?.user?.avatar : `${storageUrl}/avatar/${session?.user?.avatar}`);
            setFullname(session.user.fullname);
            fetchData();
        }
    }, [session]);

    return (
        <UserAvatarContext.Provider value={{
            avatarSrc,
            setAvatarSrc,
            fullname,
            setFullname,
            userProgresses,
            setUserProgresses,
            loading
        }}>
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
'use client'
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";

interface IUserExpert {
    followExperts: ExpertDetailsResponse[];
    setFollowExperts: Dispatch<SetStateAction<ExpertDetailsResponse[]>>;
}

const UserExpertContext = createContext<IUserExpert | null>(null);
export const UserExpertWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [followExperts, setFollowExperts] = useState<ExpertDetailsResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (status === 'authenticated') {
                const response = await sendRequest<ApiResponse<ExpertDetailsResponse[]>>({
                    url: `${apiUrl}/users/following-experts`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`
                    }
                });
                if (response.status === 200) {
                    setFollowExperts(response.data);
                }
            }
        }
        fetchData();
    }, [session])

    return (
        <UserExpertContext.Provider value={{ followExperts, setFollowExperts }}>
            {children}
        </UserExpertContext.Provider>
    )
}

export const useUserExpert = () => {
    const context = useContext(UserExpertContext);
    if (!context) {
        throw new Error("Loi");
    }
    return context;
}
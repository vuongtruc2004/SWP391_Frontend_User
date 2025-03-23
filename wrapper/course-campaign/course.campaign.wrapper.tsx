'use client'
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sendRequest } from "@/utils/fetch.api";
import { apiUrl } from "@/utils/url";

interface ICampaign {
    campaigns: CampaignResponse[];
    setCampaigns: Dispatch<SetStateAction<CampaignResponse[]>>;
}
const CampaignContext = createContext<ICampaign | null>(null);

export const CourseCampaignWrapper = ({ children }: { children: React.ReactNode }) => {
    const { data: session, status } = useSession();
    const [campaigns, setCampaigns] = useState<CampaignResponse[]>([]);

    useEffect(() => {
        const getCampaign = async () => {

            if (status === 'authenticated') {
                const response = await sendRequest<ApiResponse<CampaignResponse[]>>({
                    url: `${apiUrl}/campaigns/all`,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                });

                if (response.status === 200) {
                    setCampaigns(response.data)
                }
            }
        }
        getCampaign();
    }, [session]);

    return (
        <CampaignContext.Provider value={{ campaigns, setCampaigns }}>
            {children}
        </CampaignContext.Provider>
    )
}

export const useCampaign = () => {
    const context = useContext(CampaignContext);
    if (!context) {
        throw new Error('Loi');
    }
    return context;
}
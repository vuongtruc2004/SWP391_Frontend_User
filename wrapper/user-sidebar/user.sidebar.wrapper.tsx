'use client'
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface IUserSidebar {
    collapse: boolean;
    setCollapse: Dispatch<SetStateAction<boolean>>;
}

const UserSidebarContext = createContext<IUserSidebar | null>(null);

export const UserSidebarWrapper = ({ children }: { children: React.ReactNode }) => {
    const [collapse, setCollapse] = useState(false);

    return (
        <UserSidebarContext.Provider value={{ collapse, setCollapse }}>
            {children}
        </UserSidebarContext.Provider>
    )
}

export const useUserSidebar = () => {
    const context = useContext(UserSidebarContext);
    if (!context) {
        throw new Error("Loi");
    }
    return context;
}
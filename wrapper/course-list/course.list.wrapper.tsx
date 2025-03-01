'use client'
import { createContext, Dispatch, SetStateAction, useContext, useRef, useState } from "react";

const CourseListContext = createContext<{
    priceFormRef: React.RefObject<HTMLFormElement | null>;
    updateSort: string;
    setUpdateSort: Dispatch<SetStateAction<string>>;
    orderBy: string;
    setOrderby: Dispatch<SetStateAction<string>>;
} | null>(null);

export const CourseListWrapper = ({ children }: { children: React.ReactNode }) => {
    const priceFormRef = useRef<HTMLFormElement>(null);
    const [orderBy, setOrderby] = useState("updatedAt");
    const [updateSort, setUpdateSort] = useState("newest");

    return (
        <CourseListContext.Provider value={{ priceFormRef, orderBy, setOrderby, updateSort, setUpdateSort }}>
            {children}
        </CourseListContext.Provider>
    );
};

export const useCourseList = () => {
    const context = useContext(CourseListContext);
    if (!context) {
        throw new Error("Bạn phải bọc các phần tử bên trong CourseListWrapper!");
    }
    return context;
};

export default CourseListWrapper;

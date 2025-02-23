'use client'
import { createContext, useContext, useRef, useState } from "react";

const CourseListContext = createContext<{
    priceFormRef: React.RefObject<HTMLFormElement | null>;
    orderBy: string;
    setOrderby: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const CourseListWrapper = ({ children }: { children: React.ReactNode }) => {
    const priceFormRef = useRef<HTMLFormElement>(null);
    const [orderBy, setOrderby] = useState("default");

    return (
        <CourseListContext.Provider value={{ priceFormRef, orderBy, setOrderby }}>
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

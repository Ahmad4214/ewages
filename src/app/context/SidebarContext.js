"use client";
import { createContext, useContext, useState, useEffect } from "react";

const SidebarContext = createContext();

const initialState = {
    userProfile: false,
}

export const SidebarProvider = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    useEffect(() => {
        const handleResize = () => {
            setIsSidebarOpen(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </SidebarContext.Provider>

    )
}

export const useStateContext = () => useContext(SidebarContext);
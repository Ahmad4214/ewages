import Navbar from "@/components/core/layout/navbar/Navbar";
import Sidebar from "@/components/core/layout/sidebar/Sidebar";
import { SidebarProvider } from "../context/SidebarContext";


export default function RootLayout({ children }) {
    return (
        <SidebarProvider>
            <div className="flex h-screen font-mulish">
                <Sidebar />
                <div className="flex flex-col flex-1">
                    <Navbar />

                    <div className="w-full h-full bg-grey-100 overflow-y-auto">
                        {children}
                    </div>
                </div>

            </div>
        </SidebarProvider>
    );
}

import Sidebar, { SidebarItem } from "@/components/Sidebar";

import { BarChart3, Newspaper, FileQuestion, LifeBuoy } from "lucide-react";


export default function Page() {
    return (
        <>
            <main className="flex">
                <Sidebar>
                    <SidebarItem icon={<LifeBuoy size={20}></LifeBuoy>} text="My Wheel"></SidebarItem>
                    <SidebarItem icon={<Newspaper size={20}></Newspaper>} text="News"></SidebarItem>
                    <SidebarItem icon={<BarChart3 size={20}></BarChart3>} text="Stock Tracker"></SidebarItem>
                    <SidebarItem icon={<FileQuestion size={20}></FileQuestion>} text="Risk Assessment" active></SidebarItem>
                </Sidebar>

                <div className="w-48"></div>
            </main>
        </>
    )
}
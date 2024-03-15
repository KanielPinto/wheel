import Sidebar, { SidebarItem } from "@/components/Sidebar";
import { BarChart3, FileQuestion, LifeBuoy, Newspaper } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex">
            <Sidebar>
                <SidebarItem href="/dashboards/my-wheel" icon={<LifeBuoy size={20}></LifeBuoy>} text="My Wheel" active></SidebarItem>
                <SidebarItem href="/dashboards/news" icon={<Newspaper size={20}></Newspaper>} text="News"></SidebarItem>
                <SidebarItem href="/dashboards/stocks" icon={<BarChart3 size={20}></BarChart3>} text="Stock Tracker"></SidebarItem>
                <SidebarItem href="/dashboards/risk-assessment" icon={<FileQuestion size={20}></FileQuestion>} text="Risk Assessment"></SidebarItem>
            </Sidebar>

            <div className="w-48">

                {children}
            </div>
        </main>
    )
}
'use client'

import Sidebar, { SidebarItem } from '@/components/Sidebar';
import { BarChart3, FileQuestion, LifeBuoy, Newspaper } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const route = usePathname();

    return (
        <main className="flex">
            <Sidebar>
                <SidebarItem href="/dashboards/my-wheel" icon={<LifeBuoy size={20} />} text="My Wheel" active={route === '/dashboards/my-wheel'} />
                <SidebarItem href="/dashboards/news" icon={<Newspaper size={20} />} text="News" active={route === '/dashboards/news'} />
                <SidebarItem href="/dashboards/stocks" icon={<BarChart3 size={20} />} text="Stock Tracker" active={route === '/dashboards/stocks'} />
                <SidebarItem href="/dashboards/risk-assessment" icon={<FileQuestion size={20} />} text="Risk Assessment" active={route === '/dashboards/risk-assessment'} />
            </Sidebar>

            <div className="px-16 lg:px-0 w-48">
                {children}
            </div>
        </main>
    );
}

'use client'

import Sidebar, { SidebarItem } from '@/components/Sidebar';
import { motion } from 'framer-motion';
import { BarChart3, FileQuestion, LifeBuoy, LucideBadgeIndianRupee, Newspaper } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const route = usePathname();

    return (
        <main className="flex">
            <Sidebar>
                <SidebarItem href="/dashboards/my-wheel" icon={<LifeBuoy size={20} />} text="My Wheel" active={route === '/dashboards/my-wheel'} />
                <SidebarItem href="/dashboards/news" icon={<Newspaper size={20} />} text="News" active={route === '/dashboards/news'} />
                <SidebarItem href="/dashboards/expenses" icon={<LucideBadgeIndianRupee size={20} />} text="Expenses" active={route === '/dashboards/expenses'} />
            </Sidebar>

            <div className="md:px-7 px-5 w-full h-screen overflow-auto">

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: [20, -5, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        ease: [0.4, 0.0, 0.2, 1],
                    }}
                >
                    {children}
                </motion.div>
            </div>

        </main>
    );
}

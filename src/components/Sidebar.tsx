'use client'

import { UserButton, useAuth, useClerk, useUser } from "@clerk/nextjs";
import { EmailAddress } from "@clerk/nextjs/server";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, createContext, useState, ReactNode, useEffect } from "react";
import { Logo } from "./Logo";

interface SidebarContextType {
    expanded: boolean;
    isMobile: boolean;
}

const SidebarContext = createContext<SidebarContextType>({ expanded: true, isMobile: false });

export default function Sidebar({ children }: { children: ReactNode }) {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const { user } = useUser();
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (user) {
            setUserId(user.username);
            setUserEmail(user.primaryEmailAddress?.emailAddress);
        } else {
            setUserId(null);
            setUserEmail(undefined);
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
        };

        handleResize();
        window.addEventListener('resize', handleResize);


        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, [user]); // Ensure session is added to dependency array



    return (
        <SidebarContext.Provider value={{ expanded, isMobile }}>
            {isMobile ? (
                <div className="fixed bottom-1 left-0 right-0 bg-gray-950 border-t shadow-sm z-50">
                    <nav className="flex justify-around my-2">
                        {children}
                        <UserButton></UserButton>
                    </nav>
                </div>
            ) : (
                <aside className="h-screen absolute lg:relative z-50">
                    <nav className="h-full flex flex-col bg-gray-950 border-r shadow-sm">
                        <div className="p-4 pb-2 flex justify-between items-center">
                            <Link href="/" className="flex items-center hover:opacity-90">
                                
                                <div className={`${expanded ? "visible" : "hidden"
                                    }`} ><Logo></Logo></div>
                                

                            </Link>

                            <button
                                onClick={() => setExpanded((curr) => !curr)}
                                className="p-1.5 rounded-lg bg-purple-950 hover:bg-purple-900"
                            >
                                {expanded ? <ChevronFirst /> : <ChevronLast />}
                            </button>
                        </div>

                        <ul className="flex-1 px-3">{children}</ul>

                        <div className="flex w-full justify-center p-3">
                            <UserButton></UserButton>
                            <div
                                className={`
                                flex justify-between items-center
                                overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0 ml-0"}
                            `}
                            >
                                <div className="leading-4">
                                    <h4 className="font-semibold">{userId}</h4>
                                    <span className="text-xs text-gray-600">{userEmail}</span>
                                </div>
                            </div>
                        </div>
                    </nav>
                </aside>
            )}
        </SidebarContext.Provider>
    );
}

interface SidebarItemProps {
    href: string;
    icon: ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
}

export function SidebarItem({ href, icon, text, alert, active }: SidebarItemProps) {
    const { expanded, isMobile } = useContext(SidebarContext);

    return isMobile ? (
        <Link href={href}>
            <div className={`flex flex-col items-center py-2 px-3 text-purple-200 rounded-md transition-colors hover:text-purple-50 h-max ${active
                ? " bg-purple-950 text-purple-50 hover:bg-purple-600"
                : "hover:bg-purple-600 text-purple-200"
                }`}>
                {icon}
            </div>
        </Link>
    ) : (
        <Link href={href}>
            <li
                className={`
                relative flex items-center py-3 px-3 my-2
                font-medium rounded-md cursor-pointer
                transition-colors group h-minfor
                ${active
                        ? " bg-purple-950 text-purple-50 hover:bg-purple-600"
                        : "hover:bg-purple-600 text-purple-200"
                    }
            `}
            >
                {icon}
                <span
                    className={`overflow-hidden absolute opacity-0 transition-all ${expanded ? "relative w-52 ml-3 opacity-100" : "w-0"
                        }`}
                >
                    {text}
                </span>
                {alert && (
                    <div
                        className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                            }`}
                    />
                )}

                {!expanded && (
                    <div
                        className={`
                        absolute left-full rounded-md px-2 py-1 ml-6
                        bg-purple-100 text-purple-950 text-sm
                        w-max
                        invisible opacity-20 -translate-x-3 transition-all
                        group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                    `}
                    >
                        {text}
                    </div>
                )}
            </li>
        </Link>
    );
}
'use client'

import { UserButton, useAuth, useClerk, useUser } from "@clerk/nextjs";
import { EmailAddress } from "@clerk/nextjs/server";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, createContext, useState, ReactNode, useEffect } from "react";

interface SidebarContextType {
    expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType>({ expanded: true });

export default function Sidebar({ children }: { children: ReactNode }) {
    const [expanded, setExpanded] = useState<boolean>(true);

    const { user } = useUser();
    const [userId, setUserId] = useState<string | null>(null);
    const [userEmail, setUserEmail] = useState<string | undefined>(undefined);



    useEffect(() => {
        if (user) {
            setUserId(user.username);
            setUserEmail(user.primaryEmailAddress?.emailAddress);
        } else {
            setUserId(null);
            setUserEmail(undefined);
        }
    }, [user]); // Ensure session is added to dependency array

    return (
        <aside className="h-screen absolute lg:relative">
            <nav className="h-full flex flex-col bg-gray-950 border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <Link href="/" className="flex items-center hover:opacity-90">
                        <img
                            src="/ship-wheel.svg"
                            className={`overflow-hidden fill-white transition-all ${expanded ? "w-10" : "w-0"
                                }`}
                            alt=""
                        />
                        <p className={`px-2 font-semibold text-lg ${expanded ? "visible" : "hidden"
                            }`} >WHEEL</p>
                    </Link>

                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-purple-950 hover:bg-purple-900"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

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
    const { expanded } = useContext(SidebarContext);

    return (
        <Link href={href}>
            <li
                className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group h-min
        ${active
                        ? " bg-purple-950 text-purple-50 hover:bg-purple-600"
                        : "hover:bg-purple-600 text-purple-200"
                    }
    `}
            >
                {icon}
                <span
                    className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
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

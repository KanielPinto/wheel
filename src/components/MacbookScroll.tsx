import React from "react";
import { MacbookScroll } from "./macbook-scroll";
import Link from "next/link";
import { Logo } from "./Logo";

export function MacbookScrollDemo() {
    return (
        <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
            <MacbookScroll
                title={
                    <span>
                        This Macbook is built with Tailwindcss. <br /> No kidding.
                    </span>
                }
                badge={
                    <Link href="https://github.com/KanielPinto/wheel">
                        <Logo></Logo>
                    </Link>
                }
                src={`/linear.webp`}
                showGradient={false}
            />
        </div>
    );
}

import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Logo } from "./Logo";

function Footer() {
    return (
        <div className="border-t border-neutral-100 dark:border-white/[0.1] px-8 py-20 bg-black dark:bg-brand">
            <div className="max-w-7xl mx-auto text-sm text-neutral-500 flex sm:flex-row flex-col justify-between items-start">
                {/* Left Section */}
                <div>
                    <div className="flex items-center gap-2">

                        <Logo></Logo>
                        <p className="font-sans font-bold text-white text-3xl">Wheel</p>
                    </div>
                    <div className="mt-2 text-l">
                        A project by <a target="__blank" className="dark:text-sky-500 text-neutral-600" href="https://github.com/Valeron-T">Valeron Toscano</a> & <a target="__blank" className="dark:text-sky-500 text-neutral-600 font-medium" href="https://github.com/KanielPinto/">Kaniel Pinto</a>
                    </div>

                </div>

                {/* Right Section */}
                <div className="flex flex-col">
                    <div className="flex justify-center space-y-4 flex-col mt-4">
                        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/">Home</a>
                        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/about">About</a>
                        <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="/dashboards/my-wheel">Dashboard</a>
                        <a target="__blank" className="transition-colors hover:text-foreground/80 text-foreground/60" href="https://github.com/KanielPinto/wheel">Github</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;

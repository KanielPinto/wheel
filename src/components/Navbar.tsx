'use client'

import { UserButton, useAuth } from "@clerk/nextjs";
import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { Logo } from "@/components/Logo";
import '@/app/globals.css'

export default function HomeNav() {
    const { isSignedIn, sessionId, userId } = useAuth();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    return (
        <Navbar height={"5rem"} isBordered maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <Link href="/">
                    <NavbarBrand>
                        <Logo></Logo>
                    </NavbarBrand>
                </Link>

            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-11" justify="center">
                <NavbarItem>
                    <Link color="foreground" className="text-xl hover:text-blue-400" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="/about-us" className="text-xl hover:text-purple-400" aria-current="page">
                        About Us
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className="text-xl hover:text-purple-400" href="/dashboards/my-wheel">
                        Dashboard
                    </Link>
                </NavbarItem>
            </NavbarContent>

            {!isSignedIn ?
                (
                    <NavbarContent justify="end">
                        <NavbarItem className="hidden lg:flex">

                            <Link className="text-xl" href="/sign-in">Login</Link>
                        </NavbarItem>
                        <NavbarItem>
                            <Button className="text-xl" as={Link} color="secondary" href="/sign-up" variant="flat">
                                Sign Up
                            </Button>
                        </NavbarItem>
                    </NavbarContent>

                ) : (<>
                    <NavbarContent justify="end">
                        <UserButton appearance={{
                            elements: {
                                userButtonInner: "text-2xl h-10 p-4",
                            },
                        }} afterSignOutUrl="/"></UserButton>

                    </NavbarContent>
                </>

                )}

            <NavbarMenu>
                <NavbarMenuItem>
                    <Link color="foreground" className="text-xl" href="/">
                        Home
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link color="foreground" className="text-xl" href="/about-us">
                        About Us
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                    <Link color="foreground" className="text-xl" href="/dashboards/my-wheel">
                        Dashboards
                    </Link>
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar >
    );
}

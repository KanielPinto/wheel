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

    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "Analytics",
        "System",
        "Deployments",
        "My Settings",
        "Team Settings",
        "Help & Feedback",
        "Log Out",
    ];

    return (
        <Navbar isBordered maxWidth="full" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Logo />
                    <p className="font-bold text-4xl text-inherit">WHEEL</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-11" justify="center">
                <NavbarItem>
                    <Link color="foreground" className="text-xl" href="/">
                        Home
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" className="text-xl" aria-current="page">
                        About Us
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" className="text-xl" href="#">
                        Integrations
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
                            <Button className="text-xl" as={Link} color="primary" href="/sign-up" variant="flat">
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
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar >
    );
}

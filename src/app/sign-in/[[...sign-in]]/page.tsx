import { ClerkLoading, SignIn } from "@clerk/nextjs";
import { Spinner } from "@nextui-org/react";
import Link from "next/link";

export default function Page() {
    return (
        <>
            <div className="h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
                {/* Radial gradient for the container to give a faded look */}
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className="flex h-screen gap-2 w-full justify-center items-center flex-col">
                    <ClerkLoading>
                        <Spinner size="lg" color="secondary" />
                        <div>Clerk is loading...</div>
                    </ClerkLoading>
                    <SignIn></SignIn>
                    <div className="text-left py-2">
                        <p>Forgot Password?
                            <Link href={"/forgot-password"} className="text-blue-400 underline mx-1">
                                Click Here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>


        </>
    );
}
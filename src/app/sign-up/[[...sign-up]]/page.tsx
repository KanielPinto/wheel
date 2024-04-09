import { ClerkLoading, SignUp } from "@clerk/nextjs";
import { Spinner } from "@nextui-org/react";

export default function Page() {
    return (
        <div className="h-full w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
            {/* Radial gradient for the container to give a faded look */}
            <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="flex flex-col gap-2 h-screen w-full justify-center items-center">
                <ClerkLoading>
                    <Spinner size="lg" color="secondary" />
                    <div>Loading...</div>
                </ClerkLoading>
                <SignUp />
            </div>

        </div>
    );
}
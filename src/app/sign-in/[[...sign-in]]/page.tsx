import { ClerkLoading, SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function Page() {
    return (
        <>

            <div className="flex h-screen w-full justify-center items-center flex-col"><ClerkLoading>
                <div>Clerk is loading</div>
            </ClerkLoading>
                <SignIn></SignIn>
                <div className="text-left py-2">
                    <p>Forgot Password? 
                        <Link href={"/forgot-password"} className="text-blue-400 underline">
                            Click Here
                        </Link>
                    </p>
                </div>
            </div>

        </>
    );
}
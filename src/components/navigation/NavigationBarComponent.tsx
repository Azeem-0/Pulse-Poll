'use client';

import { useUserStore } from "@/store/userStore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoggedInComponent from "./LoggedInComponent";
export default function NavigationBar() {
    const { checkUserSession, username, isLoading } = useUserStore((state) => state);

    const router = useRouter();

    useEffect(() => {
        checkUserSession();
        console.log(username);
        if (!isLoading && !username) {
            router.push("/");
        }
    }, [checkUserSession, username, isLoading]);

    return (
        <nav className="bg-gray-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-white text-2xl font-semibold">
                    <Link href="/">PingPoll</Link>
                </div>
                <div className="flex space-x-6">
                    {username ?
                        <LoggedInComponent /> :
                        <>
                            <Link className="text-center text-white hover:text-gray-200 transition" href="/register">
                                Register
                            </Link>
                            <Link className="text-center text-white hover:text-gray-200 transition" href="/login">
                                Login
                            </Link>
                        </>
                    }
                </div>

            </div>
        </nav>
    );
};
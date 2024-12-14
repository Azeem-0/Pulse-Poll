'use client';

import { useUserStore } from "@/store";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoggedInComponent from "./LoggedInComponent";

export default function NavigationBar() {
    const { checkUserSession, username, resetUserSession } = useUserStore((state) => state);


    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    const router = useRouter();


    return (
        <nav className="bg-blue-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-white text-2xl font-semibold">
                    <Link href="/">PollingApp</Link>
                </div>
                <div className="flex space-x-6">
                    <Link className="flex justify-center items-center" href="/">
                        <span className="text-white hover:text-gray-200 transition">Home</span>
                    </Link>
                    <Link className="flex justify-center items-center" href="/polls">
                        <span className="text-white hover:text-gray-200 transition">Polls</span>
                    </Link>
                    {username ?
                        <LoggedInComponent /> :
                        <>
                            <Link className="flex justify-center items-center" href="/register">
                                <span className="text-white hover:text-gray-200 transition">Register</span>
                            </Link>
                            <Link className="flex justify-center items-center" href="/login">
                                <span className="text-white hover:text-gray-200 transition">Login</span>
                            </Link>
                        </>
                    }
                </div>

            </div>
        </nav>
    );
};
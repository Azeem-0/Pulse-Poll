'use client';

import { useUserStore } from "@/store";
import Link from "next/link";
import { useEffect } from "react";

export default function NavigationBar() {
    const checkUserSession = useUserStore((state) => state.checkUserSession);

    useEffect(() => {
        checkUserSession();
    }, [checkUserSession]);

    return (
        <nav className="bg-blue-600 shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-white text-2xl font-semibold">
                    <Link href="/">PollingApp</Link>
                </div>
                <div className="flex space-x-6">
                    <Link href="/">
                        <span className="text-white hover:text-gray-200 transition">Home</span>
                    </Link>
                    <Link href="/polls">
                        <span className="text-white hover:text-gray-200 transition">Polls</span>
                    </Link>
                    <Link href="/register">
                        <span className="text-white hover:text-gray-200 transition">Register</span>
                    </Link>
                    <Link href="/login">
                        <span className="text-white hover:text-gray-200 transition">Login</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
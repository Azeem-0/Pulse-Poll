"use client";

import { useUserStore } from "@/store/userStore";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoggedInComponent() {

    const { resetUserSession } = useUserStore((state) => state);

    const router = useRouter();

    const handleLogOut = async () => {
        try {
            resetUserSession();

            const response = await (await axiosInstance.post("/auth/logout")).data;

            console.log(response);

            router.push("/login");

            console.log("Logged out successfully.");
        } catch (error) {
            console.log("Logout failed:", error);
        }
    }
    return <>
        <Link className="flex justify-center items-center" href="/polls/manage">
            <span className="text-white hover:text-gray-200 transition">Manage polls</span>
        </Link>
        <Link className="flex justify-center items-center" href="/polls/new">
            <span className="text-white hover:text-gray-200 transition">Create poll</span>
        </Link>
        <Link className="flex justify-center items-center" href="/polls/statistics/">
            <span className="text-white hover:text-gray-200 transition">View poll statistics</span>
        </Link>
        <Link href="#" onClick={handleLogOut} className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition" >
            <span className="text-white hover:text-gray-200 transition">Log out</span>
        </Link>
    </>
};
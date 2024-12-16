"use client";

import { useUserStore } from "@/store/userStore";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoggedInComponent() {

    const { resetUserSession, username } = useUserStore((state) => state);

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
        <Link className="flex justify-center items-center" href="/">
            <span className="text-black opacity-90 hover:opacity-100 transition-all hover:-translate-y-[3px]">Home</span>
        </Link>
        <Link className="flex justify-center items-center" href={"/polls/manage"}>
            <span className="text-black opacity-90 hover:opacity-100 transition-all hover:-translate-y-[3px]">Manage polls</span>
        </Link>
        <Link className="flex justify-center items-center" href="/polls/new">
            <span className="text-black opacity-90 hover:opacity-100 transition-all hover:-translate-y-[3px]">Create poll</span>
        </Link>
        <Link href="#" onClick={handleLogOut} className="bg-[#B4FE3A] py-2 px-6 rounded-lg hover:-translate-y-1  hover:text-black focus:outline-none focus:ring-2 focus:ring-black transition" >
            <span className="text-black opacity-90 hover:opacity-100 transition-all hover:-translate-y-[3px]">Log out</span>
        </Link>
    </>
};
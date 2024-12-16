"use client";

import { useUserStore } from "@/store/userStore";
import { buttonStyles } from "@/styles/styles";
import Link from "next/link";

export default function ViewPollComponent({ pollId }: {
    pollId: string,

}) {

    const username = useUserStore((state) => state.username);

    return <>{
        username && <Link
            href={`/polls/${pollId}`
            }
            className="hover:-translate-y-[2px] duration-100 p-[5px] px-[15px] m-[10px] text-center text-sm rounded-xl bg-[#B4FE3A] text-black shadow hover:bg-[#b2ff36] focus:outline-none focus:ring-2 focus:ring-[#d0ff85] transition-all "
        >
            View poll
        </Link >
    }
    </>
};
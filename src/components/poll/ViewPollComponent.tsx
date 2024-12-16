"use client";

import { useUserStore } from "@/store/userStore";
import { buttonStyles } from "@/styles/styles";
import Link from "next/link";

export default function ViewPollComponent({ pollId }: {
    pollId: string
}) {

    const username = useUserStore((state) => state.username);

    return <>{
        username && <Link
            href={`/polls/${pollId}`
            }
            className={buttonStyles}
        >
            View poll.
        </Link >
    }
    </>
};
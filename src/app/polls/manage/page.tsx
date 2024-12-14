"use client";

import PollComponent from "@/components/PollComponent";
import { useUserStore } from "@/store";
import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";

export default function ManagePoll() {


    const username = useUserStore((state) => state.username);

    const [polls, setPolls] = useState<Poll[]>([]);

    const getPolls = async () => {
        const polls: Poll[] = (await axiosInstance.get("/")).data;
        setPolls(polls);
    }

    useEffect(() => {
        getPolls();
    }, []);

    return <div className="flex flex-wrap justify-evenly items-center w-full p-5">
        {polls
            .filter((poll) => poll.username === username)
            .map((poll, index) => (
                <PollComponent key={index} poll={poll} />
            ))}
    </div>
};
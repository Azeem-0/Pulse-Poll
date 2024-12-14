"use client";

import ManagePollComponent from "@/components/poll/ManagePollComponent";
import PollComponent from "@/components/poll/PollComponent";
import VoteComponent from "@/components/poll/VoteComponent";
import { GetAllPolls } from "@/services/pollServices";
import { useUserStore } from "@/store/userStore";
import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";
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

    // const polls: Poll[] = await GetAllPolls();

    return <div className="flex flex-wrap justify-evenly items-center w-full p-5">
        {polls && polls.length > 0 ? (
            polls.filter((poll) => poll.username === username)
                .map((poll, index) => (
                    <div className="bg-gray-200 p-3 rounded-lg flex flex-col justify-between items-center shadow-md" key={index}>
                        <PollComponent
                            key={index}
                            isActive={poll.isActive}
                            title={poll.title}
                            username={poll.username}
                        />
                        <VoteComponent pollId={poll.pollId} isActive={poll.isActive} options={poll.options} pollUsername={poll.username} />
                        <ManagePollComponent pollId={poll.pollId} key={poll.pollId} />
                    </div>
                ))
        ) : (
            <p className="text-gray-600">There are no polls currently.</p>
        )}
    </div>
};
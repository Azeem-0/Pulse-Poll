"use client";
import { VoteToPoll } from "@/services/pollServices";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import { OptionItem, Poll } from "@/types/Poll"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PollStatusComponent from "./PollStatusComponent";
import { handleApiError } from "@/utils/handleApiErrors";

export default function VoteComponent({ isActive, options, pollUsername, pollId }: {
    isActive: boolean,
    options: OptionItem[],
    pollUsername: string,
    pollId: string,
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const [optionsState, setOptionsState] = useState<OptionItem[]>(options);

    const [activeState, setActiveState] = useState<boolean>(isActive);

    const [voteSubmitted, setVoteSubmitted] = useState<boolean>(false);

    const [spinner, setSpinner] = useState<boolean>(false);

    const { username, isLoading, resetUserSession } = useUserStore((state) => state);
    const router = useRouter();
    const { notifySuccess, notifyError, notifyWarning } = useNotificationStore((state) => state);

    useEffect(() => {
        if (!username && !isLoading) {
            router.push("/");
        }
    }, [username, isLoading]);


    useEffect(() => {
        const es = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/socket/create-client`);

        es.onopen = () => {
            console.log("connected succesfully.");
        }

        es.addEventListener("poll_updated", (event) => {
            const poll: Poll = JSON.parse(event.data);

            if (poll.pollId === pollId) {
                setOptionsState(poll.options);
                setActiveState(poll.isActive);
            }

        });

        return () => {
            es.close();
        };

    }, []);

    const handleVote = async () => {
        if (!selectedOption) {
            notifyWarning("Please select an option to vote!");
            return;
        }
        setSpinner(true);

        try {
            await VoteToPoll(username, selectedOption, pollId);

            notifySuccess("Vote submitted successfully!");

            setVoteSubmitted(true);
        } catch (error) {
            handleApiError(error, "Failed to submit your vote :(", notifyError, notifyWarning, resetUserSession);
        } finally {
            setSpinner(false);
        }
    };

    return <div className="w-full flex flex-col space-y-4">
        <PollStatusComponent activeState={activeState} />
        <ul className="list-none pl-6 text-gray-700 w-full flex flex-col gap-2.5">
            {optionsState?.map((option) => (
                <li key={option.optionId} className="w-full">
                    <label className="w-full text-xs flex items-center">
                        <input
                            type="radio"
                            name="pollOption"
                            value={option.optionId}
                            disabled={!activeState}
                            onChange={() => setSelectedOption(option.optionId)}
                            className="mr-2 text-xs"
                        />
                        {option.text} - <span className="ml-1 text-sm font-medium">{option.votes} votes</span>
                    </label>
                </li>
            ))}
        </ul>
        {activeState && (
            <button
                onClick={handleVote}
                disabled={spinner}
                className="w-full py-[5px] text-sm rounded-xl bg-transparent border-black 
                border-[1px] hover:-translate-y-[2px] text-black shadow hover:bg-[#b2ff36] focus:outline-none focus:ring-2 focus:ring-[#d0ff85] transition duration-75"
            >
                {spinner ? "Submitting..." : "Submit Vote"}
            </button>
        )}
        <Link
            href={`/polls/statistics/${pollId}`}
            className="w-full py-[5px]  hover:-translate-y-[2px] text-sm rounded-xl bg-[#B4FE3A] text-black shadow text-center hover:bg-[#b2ff36] focus:outline-none focus:ring-2 focus:ring-[#d0ff85] transition duration-75"
        >
            View Statistics.
        </Link>
    </div>
};
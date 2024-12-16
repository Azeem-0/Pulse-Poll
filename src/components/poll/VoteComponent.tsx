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

    const [voteSubmitted, setVoteSubmitted] = useState(false);

    const { username, isLoading, resetUserSession } = useUserStore((state) => state);
    const router = useRouter();
    const { notifySuccess, notifyError, notifyWarning } = useNotificationStore((state) => state);

    useEffect(() => {
        if (!username && !isLoading) {
            router.push("/");
        }
    }, [username, isLoading]);


    useEffect(() => {
        const es = new EventSource('http://localhost:8080/api/socket/create-client');

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

        try {
            await VoteToPoll(username, selectedOption, pollId);

            notifySuccess("Vote submitted successfully!");

            setVoteSubmitted(true);
        } catch (error) {
            handleApiError(error, "Failed to submit your vote :(", notifyError, notifyWarning, resetUserSession);
        }
    };

    return <div className="flex flex-col space-y-4">
        <PollStatusComponent activeState={activeState} />
        <ul className="list-none pl-6 text-gray-700 w-full flex flex-col gap-2.5">
            {optionsState?.map((option) => (
                <li key={option.optionId} className="w-full">
                    <label className="w-full flex items-center">
                        <input
                            type="radio"
                            name="pollOption"
                            value={option.optionId}
                            disabled={!activeState || voteSubmitted}
                            onChange={() => setSelectedOption(option.optionId)}
                            className="mr-2"
                        />
                        {option.text} - <span className="ml-1 font-medium">{option.votes} votes</span>
                    </label>
                </li>
            ))}
        </ul>
        {activeState && !voteSubmitted && (
            <button
                onClick={handleVote}
                className="mt-4 px-4 py-2 text-center w-full bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            >
                Submit Vote
            </button>
        )}
        <Link
            href={`/polls/statistics/${pollId}`}
            className="mt-4 px-4 py-2 text-center w-full bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
        >
            View Statistics.
        </Link>
    </div>
};
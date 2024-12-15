"use client";
import { VoteToPoll } from "@/services/pollServices";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import { OptionItem, Poll } from "@/types/Poll"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

    const { username, isLoading } = useUserStore((state) => state);
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
            console.error("Error submitting vote:", error);

            notifyError("Failed to submit your vote. Please try again.");
        }
    };

    return <div className="flex flex-col ">
        <ul className="list-disc pl-6 text-gray-700">
            <p className="text-sm text-gray-600 mb-3">
                Status:{" "}
                <span className={`font-medium ${activeState ? "text-green-600" : "text-red-600"}`}>
                    {activeState ? "Active" : "Closed"}
                </span>
            </p>
            {optionsState?.map((option) => (
                <li key={option.optionId}>
                    <label>
                        <input
                            type="radio"
                            name="pollOption"
                            value={option.optionId}
                            disabled={!activeState || voteSubmitted}
                            onChange={() => setSelectedOption(option.optionId)}
                            className="mr-2"
                        />
                        {option.text} - <span className="font-medium">{option.votes} votes</span>
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

        {/* {isActive && pollUsername === username && (
            <div className="flex flex-row gap-5 justify-between items-center">
                <button
                    // onClick={resetPoll}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                >
                    Reset Poll
                </button>
                <button
                    // onClick={closePoll}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                >
                    Close Poll
                </button>
            </div>
        )} */}
    </div>
};
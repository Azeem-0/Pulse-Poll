"use client";
import { VoteToPoll } from "@/services/pollServices";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import { OptionItem } from "@/types/Poll"
import { useState } from "react";

export default function VoteComponent({ isActive, options, pollUsername, pollId }: {
    isActive: boolean,
    options: OptionItem[],
    pollUsername: string,
    pollId: string,
}) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const [voteSubmitted, setVoteSubmitted] = useState(false);

    const username = useUserStore((state) => state.username);
    const { notifySuccess, notifyError, notifyWarning } = useNotificationStore((state) => state);

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

    return <div>
        <ul className="list-disc pl-6 text-gray-700">
            {options?.map((option) => (
                <li key={option.optionId}>
                    <label>
                        <input
                            type="radio"
                            name="pollOption"
                            value={option.optionId}
                            disabled={!isActive || voteSubmitted}
                            onChange={() => setSelectedOption(option.optionId)}
                            className="mr-2"
                        />
                        {option.text} - <span className="font-medium">{option.votes} votes</span>
                    </label>
                </li>
            ))}
        </ul>
        {isActive && !voteSubmitted && (
            <button
                onClick={handleVote}
                className="mt-4 px-4 py-2 text-center w-full bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            >
                Submit Vote
            </button>
        )}

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
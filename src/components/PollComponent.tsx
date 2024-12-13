"use client";

import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance";
import { use, useState } from "react";

export default function PollComponent({ poll }: { poll: Poll }) {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [voteSubmitted, setVoteSubmitted] = useState(false);

    const username = "Sathish"; // should change this to a global state.

    const handleVote = async () => {
        if (!selectedOption) {
            alert("Please select an option to vote!");
            return;
        }

        try {
            const voteOption = {
                username: username,
                optionId: selectedOption,
            }

            console.log(voteOption);
            await axiosInstance.post(`/polls/${poll.pollId}/vote`, voteOption);

            alert("Vote submitted successfully!");
            setVoteSubmitted(true); // Prevent further voting
        } catch (error) {
            console.error("Error submitting vote:", error);
            alert("Failed to submit your vote. Please try again.");
        }
    };

    const resetPoll = async () => {
        try {
            const response = (await axiosInstance.post(`/polls/${poll.pollId}/reset`, { username })).data;
            alert(response);
        } catch (error) {
            console.error("Error resetting the poll : ", error);
            alert("Failed to reset your poll.");
        }
    }

    const closePoll = async () => {
        try {
            const response = (await axiosInstance.post(`/polls/${poll.pollId}/close`, { username })).data;
            alert(response);
        } catch (error) {
            console.error("Error closing the poll : ", error);
            alert("Failed to close your poll.");
        }
    }

    return (
        <div key={poll.pollId} className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{poll.title}</h2>
            <p className="text-sm text-gray-600 mb-1">
                Created by: <span className="font-medium">{poll.username}</span>
            </p>
            <p className="text-sm text-gray-600 mb-3">
                Status:{" "}
                <span className={`font-medium ${poll.isActive ? "text-green-600" : "text-red-600"}`}>
                    {poll.isActive ? "Active" : "Closed"}
                </span>
            </p>
            <ul className="list-disc pl-6 text-gray-700">
                {poll.options.map((option) => (
                    <li key={option.optionId}>
                        <label>
                            <input
                                type="radio"
                                name="pollOption"
                                value={option.optionId}
                                disabled={!poll.isActive || voteSubmitted}
                                onChange={() => setSelectedOption(option.optionId)}
                                className="mr-2"
                            />
                            {option.text} - <span className="font-medium">{option.votes} votes</span>
                        </label>
                    </li>
                ))}
            </ul>
            {poll.isActive && !voteSubmitted && (
                <button
                    onClick={handleVote}
                    className="mt-4 px-4 py-2 text-center w-full bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                >
                    Submit Vote
                </button>
            )}

            {poll.isActive && poll.username === username && (
                <div className="flex flex-row justify-between items-center">
                    <button
                        onClick={resetPoll}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                    >
                        Reset Poll
                    </button>
                    <button
                        onClick={closePoll}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                    >
                        Close Poll
                    </button>
                </div>
            )}
            {voteSubmitted && <p className="mt-4 text-green-600">Thank you for voting!</p>}
        </div>
    );
}

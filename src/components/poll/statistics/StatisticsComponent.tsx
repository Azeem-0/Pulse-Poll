"use client";

import { GetResults } from "@/services/pollServices";
import { useNotificationStore } from "@/store/notificationStore";
import { Poll, PollResults } from "@/types/Poll";
import { generateColors } from "@/utils/generateRandomColors";
import axios from "axios";
import { useEffect, useState } from "react";
import ViewPollComponent from "../ViewPollComponent";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function StatisticsComponent({ poll }: {
    poll: Poll
}) {

    const [pollResults, setPollResults] = useState<PollResults>();

    const { notifySuccess, notifyError } = useNotificationStore((state) => state);

    useEffect(() => {

        if (poll) {
            getPollResults();
        }

        const es = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/socket/create-client`);

        es.onopen = () => {
            console.log("connected succesfully.");
        }

        es.addEventListener("poll_results", (event) => {
            const poll_result = JSON.parse(event.data);
            if (poll_result.pollId === poll.pollId) {
                setPollResults(poll_result);
            }
        });

    }, [poll.pollId]);

    const getPollResults = async () => {
        try {
            const response = await GetResults(poll.pollId);
            setPollResults(response);
            notifySuccess("Fetched results for the given poll.");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const message = error.response.data;
                notifyError(message);
                return;
            }
            notifyError("Failed to fetch poll data");
            console.error("Failed to fetch poll data:", error);
        }
    };

    if (!pollResults) {
        return <p className="w-full h-[80vh] flex justify-center items-center">Loading...</p>;
    }

    const COLORS = pollResults ? generateColors(pollResults.options.length) : [];

    const chartData = pollResults?.options?.map((option) => ({
        name: option.text,
        value: option.votes,
    }));

    return (

        <div className="w-full flex justify-center">
            <div className="w-fit max-w-4xl p-6 m-5 bg-white rounded-xl shadow-lg space-y-6">
                <div className="flex flex-row gap-6 justify-between items-center ">
                    <div className="flex-1 flex flex-col items-start gap-3">
                        <h1 className="mx-[10px] text-2xl font-semibold text-left text-gray-800">{pollResults.title}</h1>
                        <div className="mx-[10px] text-gray-600 flex flex-col gap-2">
                            <p className="text-sm">
                                Total Votes:{" "}
                                <span className="font-medium text-black">{pollResults.totalVotes}</span>
                            </p>
                            <p className="text-sm">
                                Time Elapsed:{" "}
                                <span className="font-medium text-black">{pollResults.timeElapsed}</span>
                            </p>
                        </div>
                        <ViewPollComponent pollId={pollResults.pollId} />
                    </div>

                    <div className="flex-1 bg-gray-50 rounded-xl p-4 shadow-inner flex justify-center items-center">
                        <ResponsiveContainer width="90%" height={200}>
                            <PieChart>
                                <Pie
                                    data={chartData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={50}
                                    fill="#8884d8"
                                    label
                                >
                                    {chartData?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                </div>
                <div className="bg-gray-50 p-6 rounded-xl shadow-inner">
                    <h2 className="text-xl  font-medium font-sans text-gray-800 mb-4">Options Breakdown</h2>
                    <ul className="list-disc ml-6 space-y-3">
                        {pollResults?.options?.map((option, index) => (
                            <li key={index} className="text-gray-700 text-sm">
                                <span className="font-medium text-black">{option.text}</span>:{" "}
                                {option.votes} votes
                                <span className="text-gray-500 ml-2">
                                    ({option.percentage.toFixed(2)}%)
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
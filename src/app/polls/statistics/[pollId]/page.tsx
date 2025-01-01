"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PollResults } from "@/types/Poll";
import { GetResults } from "@/services/pollServices";
import { useNotificationStore } from "@/store/notificationStore";
import axios from "axios";
import { generateColors } from "@/utils/generateRandomColors";
import ViewPollComponent from "@/components/poll/ViewPollComponent";

export default function PollStatistics() {
    const [pollData, setPollData] = useState<PollResults>();
    const params = useParams();
    const pollId = params?.pollId as string | null;

    const { notifySuccess, notifyError } = useNotificationStore((state) => state);

    useEffect(() => {
        if (pollId) {
            fetchPollData();
        }

        const es = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/socket/create-client`);

        es.onopen = () => {
            console.log("connected succesfully.");
        }

        es.addEventListener("poll_results", (event) => {
            const poll = JSON.parse(event.data);
            if (poll.pollId === pollId) {
                setPollData(poll);
            }
        });

    }, [pollId]);

    const fetchPollData = async () => {
        try {
            const response = await GetResults(pollId);
            setPollData(response);
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

    if (!pollData) {
        return <p className="w-full h-[80vh] flex justify-center items-center">Loading...</p>;
    }

    const COLORS = pollData ? generateColors(pollData.options.length) : [];

    const chartData = pollData?.options?.map((option) => ({
        name: option.text,
        value: option.votes,
    }));

    return (

        <div className="w-full flex justify-center">
            <div className="w-fit max-w-4xl p-6 m-5 bg-white rounded-xl shadow-lg space-y-6">
                <div className="flex flex-row gap-6 justify-between items-center ">
                    <div className="flex-1 flex flex-col items-start gap-3">
                        <h1 className="mx-[10px] text-2xl font-semibold text-left text-gray-800">{pollData.title}</h1>
                        <div className="mx-[10px] text-gray-600 flex flex-col gap-2">
                            <p className="text-sm">
                                Total Votes:{" "}
                                <span className="font-medium text-black">{pollData.totalVotes}</span>
                            </p>
                            <p className="text-sm">
                                Time Elapsed:{" "}
                                <span className="font-medium text-black">{pollData.timeElapsed}</span>
                            </p>
                        </div>
                        <ViewPollComponent pollId={pollData.pollId} />
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
                        {pollData?.options?.map((option, index) => (
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

}

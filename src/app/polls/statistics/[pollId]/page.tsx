"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PollResults } from "@/types/Poll";
import { GetResults } from "@/services/pollServices";
import { useNotificationStore } from "@/store/notificationStore";
import axios from "axios";
import { generateColors } from "@/utils/generateRandomColors";

export default function PollStatistics() {
    const [pollData, setPollData] = useState<PollResults>();
    const params = useParams();
    const pollId = params?.pollId as string | null;

    const { notifySuccess, notifyError } = useNotificationStore((state) => state);

    useEffect(() => {
        if (pollId) {
            fetchPollData();
        }

        const es = new EventSource('http://localhost:8080/api/socket/create-client');

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

    const chartData = pollData.options.map((option) => ({
        name: option.text,
        value: option.votes,
    }));

    return (

        <div className="w-full flex justify-center">

            <div className="w-fit max-w-2xl p-6 m-5 bg-white rounded-lg shadow-md space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">{pollData.title}</h1>
                <div className="flex flex-col justify-between items-start text-gray-600">
                    <p className="text-lg">Total Votes: <span className="font-semibold text-gray-800">{pollData.totalVotes}</span></p>
                    <p className="text-lg">Time Elapsed: <span className="font-semibold text-gray-800">{pollData.timeElapsed}</span></p>
                </div>

                <div className="bg-gray-100 rounded-lg p-4">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Options Breakdown</h2>
                    <ul className="list-disc ml-6 space-y-2">
                        {pollData.options.map((option, index) => (
                            <li key={index} className="text-gray-700">
                                <span className="font-medium text-gray-900">{option.text}</span>: {option.votes} votes
                                <span className="text-gray-500"> ({option.percentage.toFixed(2)}%)</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );

}

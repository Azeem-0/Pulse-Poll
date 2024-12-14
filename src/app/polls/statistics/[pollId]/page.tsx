"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { PollResults } from "@/types/Poll";

export default function PollStatistics() {
    const [pollData, setPollData] = useState<PollResults>();
    const router = useRouter();

    const pollId: string = "DyawAHWFxT";

    useEffect(() => {
        if (pollId) {
            fetchPollData();
        }
    }, [pollId]);

    const fetchPollData = async () => {
        try {
            const response = await axiosInstance.get(`/polls/${pollId}/results`);
            setPollData(response.data);
        } catch (error) {
            console.error("Failed to fetch poll data:", error);
        }
    };

    if (!pollData) {
        return <p>Loading...</p>;
    }

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    const chartData = pollData.options.map((option) => ({
        name: option.text,
        value: option.votes,
    }));

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">{pollData.title}</h1>
            <p>Total Votes: {pollData.totalVotes}</p>
            <p>Time Elapsed: {pollData.timeElapsed}</p>

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

            <div>
                <h2 className="text-xl font-semibold">Options Breakdown</h2>
                <ul className="list-disc ml-6">
                    {pollData.options.map((option, index) => (
                        <li key={index}>
                            {option.text}: {option.votes} votes ({option.percentage.toFixed(2)}%)
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

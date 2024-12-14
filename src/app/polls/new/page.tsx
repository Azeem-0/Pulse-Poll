"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreatePoll } from '@/services/pollServices';
import { useNotificationStore } from '@/store/notificationStore';
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'next/navigation';


const findMostFrequentCount = (arr: string[]): number => {
    if (arr.length === 0) return 0;

    const frequencyMap = new Map<string, number>();

    arr.forEach(str => frequencyMap.set(str, (frequencyMap.get(str) || 0) + 1));

    return Math.max(...frequencyMap.values());
};

export default function CreatePolls() {
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState<string[]>(['']);
    const [isLoading, setIsLoading] = useState(false);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const router = useRouter();

    const { username, resetUserSession } = useUserStore((state) => state);

    const { notify, notifySuccess, notifyError, notifyWarning } = useNotificationStore((state) => state);

    useEffect(() => {
        if (!username) {
            router.push("/login");
        }
    }, []);

    const addOption = () => setOptions([...options, '']);

    const removeOption = (index: number) => {
        setOptions(options.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {

        let redundantPoll = findMostFrequentCount(options);

        if (!title || options.some((opt) => !opt.trim())) {
            notifyWarning('Please fill in the title and all options.');
            return;
        }
        else if (options.length < 2 || redundantPoll >= 2) {
            notifyWarning("Please satisfy all option validation conditions.");
            return;
        }

        setIsLoading(true);

        const poll = {
            title,
            options,
            username: username
        };

        try {
            await CreatePoll(poll);
            setTitle('');
            setOptions([''])
            notifySuccess("Successfully created poll.");

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.status === 401) {
                    resetUserSession();
                    console.error("Unauthorized request:", error.response.data);
                    notify("User should log in to create poll");
                    return;
                }
            }
            notifyError("Error : " + error);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-white shadow rounded">
            <h2 className="text-2xl font-bold mb-4">Create a New Poll</h2>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Poll Title:</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    placeholder="Enter poll title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold mb-1">Poll Options:</label>
                {options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <input
                            type="text"
                            className="flex-1 p-2 border rounded"
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                        />
                        <button
                            className="px-3 py-1 bg-red-600 text-white rounded"
                            onClick={() => removeOption(index)}
                            disabled={options.length <= 1}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    className="px-4 py-2 bg-blue-600 text-white rounded shadow mt-2"
                    onClick={addOption}
                >
                    Add Option
                </button>
            </div>

            <button
                className="w-full py-2 bg-green-600 text-white rounded shadow"
                onClick={handleSubmit}
                disabled={isLoading}
            >
                {isLoading ? 'Creating...' : 'Create Poll'}
            </button>
        </div>
    );
}

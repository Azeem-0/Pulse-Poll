"use client";

import { usePoll } from '@/hooks/usePoll';
import { cardStyles, containerStyles } from '@/styles/styles';

export default function CreatePolls() {
    const { title, setTitle, options, handleOptionChange, removeOption, addOption, createNewPoll, isLoading } = usePoll();

    return (
        <div className={containerStyles}>
            <div className={`${cardStyles} `} >
                <h2 className="text-2xl font-bold mb-4">Create a New Poll</h2>

                <div className="mb-4 w-full">
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
                    onClick={createNewPoll}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Poll'}
                </button>
            </div>
        </div >
    );
}

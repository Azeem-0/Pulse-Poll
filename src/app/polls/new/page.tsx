"use client";

import { usePoll } from '@/hooks/usePoll';

export default function CreatePolls() {
    const { title, setTitle, options, handleOptionChange, removeOption, addOption, createNewPoll, isLoading } = usePoll();

    return (
        <div className="w-full h-full flex flex-row transition-all duration-75 bg-inherit gap-10 justify-center items-center p-6">
            <div className="w-fit rounded-xl bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] p-8 m-5 flex flex-col items-center justify-center gap-5 " >
                <h2 className="font-sans text-2xl font-semibold text-gray-800 mb-4">Create a New Poll</h2>
                <div className="mb-4 w-full">
                    <label className="block font-roboto font-medium text-sm tracking-wider text-gray-700 mb-1">Poll Title:</label>
                    <input
                        type="text"
                        className="w-full rounded-xl py-2 pl-3 text-sm pr-10 border focus:outline-none focus:ring-2 focus:ring-[#D7E96D]"
                        placeholder="Enter poll title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-roboto font-medium text-sm tracking-wider text-gray-700 mb-1">Poll Options:</label>
                    {options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                className="w-full rounded-xl py-2 pl-3 text-sm pr-10 border focus:outline-none focus:ring-2 focus:ring-[#D7E96D]"
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                            />
                            <button
                                className="px-3 py-1 cursor-pointer bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-all duration-75"
                                onClick={() => removeOption(index)}
                                disabled={options.length <= 1}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-all duration-75 mt-2"
                        onClick={addOption}
                    >
                        Add Option
                    </button>
                </div>

                <button
                    className="w-full py-2 bg-[#B4FE3A] text-black rounded-lg shadow hover:-translate-y-[3px] transition-all duration-75"
                    onClick={createNewPoll}
                    disabled={isLoading}
                >
                    {isLoading ? 'Creating...' : 'Create Poll'}
                </button>
            </div>
        </div >
    );
}

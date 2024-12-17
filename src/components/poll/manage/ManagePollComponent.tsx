
"use client";

import { ClosePoll, ResetPoll } from "@/services/pollServices";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import { Poll } from "@/types/Poll";

export default function ManagePollComponent({ pollId }: {
    pollId: string
}) {

    const username = useUserStore((state) => state.username);

    const { notifyError, notifySuccess } = useNotificationStore((state) => state);

    const resetPoll = async () => {
        try {
            await ResetPoll(pollId, username);
            notifySuccess("Poll reset successfull.")
        } catch (error) {
            console.error("Error resetting the poll : ", error);
            notifyError("Error resetting the poll");
        }
    }

    const closePoll = async () => {
        try {
            await ClosePoll(pollId, username);
            notifySuccess("Closed poll successfully.")
        } catch (error) {
            console.error("Error closing the poll : ", error);
            notifyError("Failed to close poll.");
        }
    }

    return (
        <div className="flex flex-col gap-5 justify-between w-full items-center">
            <button
                onClick={resetPoll}
                className="w-full py-[5px] text-sm rounded-xl bg-transparent border-black 
    border-[1px] hover:-translate-y-[2px] text-black shadow hover:bg-[#b2ff36] 
    focus:outline-none focus:ring-2 focus:ring-[#d0ff85] transition duration-75"
            >
                Reset Poll
            </button>
            <button
                onClick={closePoll}
                className="w-full py-[5px] text-sm rounded-xl bg-[#B4FE3A] text-black shadow text-center 
    hover:bg-[#b2ff36] hover:-translate-y-[2px] focus:outline-none focus:ring-2 focus:ring-[#d0ff85] 
    transition duration-75"
            >
                Close Poll
            </button>
        </div>

    );

};

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
        <div className="flex flex-row gap-5 justify-between w-full items-center">
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
    );

};
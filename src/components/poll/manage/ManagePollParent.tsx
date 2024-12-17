"use client";
import { useUserStore } from "@/store/userStore";
import { Poll } from "@/types/Poll";
import PollComponent from "../PollDetailsComponent";
import ManagePollComponent from "./ManagePollComponent";
import { cardStyles, containerStyles } from "@/styles/styles";


export default function ManagePollParent({ polls }: {
    polls: Poll[]
}) {

    const username = useUserStore((state) => state.username);

    return (
        <div className="flex mt-20 mx-8 flex-wrap items-center justify-evenly px-5 gap-x-10 gap-y-10">
            {polls && polls.length > 0 ? (
                polls
                    .filter((poll) => poll.username === username)
                    .map((poll, index) => (
                        <div
                            className="hover:scale-105 hover:rotate-2 transition-all duration-75 bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] flex flex-col gap-[10px] w-[15rem] h-[16rem] justify-center items-start rounded-xl px-2"
                            key={poll.pollId}
                        >
                            <div className="flex flex-col px-[10px] gap-[10px]">
                                <h2 className="font-sans text-xl font-semibold text-gray-800 flex">{poll.title.substring(0, 26)} {poll.title.length > 26 ? "..." : ""}</h2>
                                <p className="font-roboto text-xs text-gray-600">
                                    Created by: <span className="font-roboto text-black font-medium">{poll.username}</span>
                                </p>
                                <p className="text-xs text-gray-600">Created on: <span className="text-black font-medium">{new Date(poll.createdAt).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                })}</span></p>
                            </div>
                            <ManagePollComponent pollId={poll.pollId} />
                        </div>
                    ))
            ) : (
                <p className="text-gray-600">There are no polls currently.</p>
            )}
        </div>
    );
};
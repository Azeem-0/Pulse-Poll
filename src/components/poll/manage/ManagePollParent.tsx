"use client";
import { useUserStore } from "@/store/userStore";
import { Poll } from "@/types/Poll";
import PollComponent from "../PollComponent";
import ManagePollComponent from "./ManagePollComponent";
import { cardStyles, containerStyles } from "@/styles/styles";


export default function ManagePollParent({ polls }: {
    polls: Poll[]
}) {

    const username = useUserStore((state) => state.username);

    return (
        <div className={containerStyles}>
            {polls && polls.length > 0 ? (
                polls
                    .filter((poll) => poll.username === username)
                    .map((poll, index) => (
                        <div
                            className={cardStyles}
                            key={poll.pollId}
                        >
                            <PollComponent title={poll.title} username={poll.username} />
                            <ManagePollComponent pollId={poll.pollId} />
                        </div>
                    ))
            ) : (
                <p className="text-gray-600">There are no polls currently.</p>
            )}
        </div>
    );
};
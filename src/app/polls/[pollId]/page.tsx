

import PollComponent from "@/components/poll/PollComponent";
import VoteComponent from "@/components/poll/VoteComponent";
import { GetPollById } from "@/services/pollServices";
import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance"


export default async function SinglePoll({ params }: {
    params: Promise<{
        pollId: string,

    }>
}) {
    const { pollId } = await params;

    const poll: Poll = await GetPollById(pollId);

    return <div className="w-fit bg-gray-200 p-3 m-5 rounded-lg flex flex-col items-center justify-center gap-5 shadow-md">
        {poll ?
            <>
                <PollComponent isActive={poll.isActive} title={poll.title} username={poll.username} key={poll.pollId} />
                <VoteComponent pollId={poll.pollId} isActive={poll.isActive} options={poll.options} pollUsername={poll.username} />
            </> : <p>There is no poll with given id.</p>
        }
    </div>
};
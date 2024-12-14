

import PollComponent from "@/components/poll/PollComponent";
import VoteComponent from "@/components/poll/VoteComponent";
import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance"


export default async function SinglePoll({ params }: {
    params: Promise<{
        pollId: string,

    }>
}) {
    const { pollId } = await params;

    const poll: Poll = (await axiosInstance.get(`/polls/${pollId}`)).data;

    return <div className="w-fit bg-gray-200 p-3 m-5 rounded-lg flex flex-col items-center justify-center gap-5 shadow-md">
        <PollComponent isActive={poll.isActive} title={poll.title} username={poll.username} key={poll.pollId} />
        <VoteComponent pollId={poll.pollId} isActive={poll.isActive} options={poll.options} pollUsername={poll.username} />
    </div>
};
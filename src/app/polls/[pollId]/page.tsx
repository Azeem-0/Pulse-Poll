import PollComponent from "@/components/poll/PollComponent";
import VoteComponent from "@/components/poll/VoteComponent";
import { GetPollById } from "@/services/pollServices";
import { cardStyles, containerStyles } from "@/styles/styles";
import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance"


export default async function SinglePoll({ params }: {
    params: Promise<{
        pollId: string,

    }>
}) {
    const { pollId } = await params;

    const poll: Poll = await GetPollById(pollId);

    return <div className={containerStyles} >
        {poll ?
            <div className={cardStyles}>
                <PollComponent title={poll.title} username={poll.username} key={poll.pollId} />
                <VoteComponent pollId={poll.pollId} isActive={poll.isActive} options={poll.options} pollUsername={poll.username} />
            </div> : <p>There is no poll with given id.</p>
        }
    </div>
};
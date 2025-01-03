import VoteComponent from "@/components/poll/VoteComponent";
import { GetAllPolls, GetPollById } from "@/services/pollServices";
import { containerStyles } from "@/styles/styles";
import { Poll } from "@/types/Poll";

export const revalidate = 10;

export async function generateStaticParams() {
    const polls: Poll[] = await GetAllPolls();

    return polls.map((poll) => {
        const pollId = poll.pollId;
        return {
            pollId
        }
    })
}

export default async function SinglePoll({ params }: {
    params: Promise<{
        pollId: string,

    }>
}) {
    const { pollId } = await params;

    const poll = await GetPollById(pollId);

    return <div className={containerStyles} >
        {poll ?
            <div className="hover:scale-105 hover:rotate-1 transition-all duration-75 bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] flex flex-col gap-[10px] w-fit px-[2rem] py-[4rem] justify-center items-start rounded-xl ">
                <div className="flex w-[20rem] flex-col px-[10px] gap-[10px]">
                    <h2 className="font-sans text-xl font-semibold text-gray-800 flex">{poll.title}</h2>
                    <p className="font-roboto text-xs text-gray-600">
                        Created by: <span className="font-roboto text-black font-medium">{poll.username}</span>
                    </p>
                    <p className="text-xs text-gray-600">Created on: <span className="text-black font-medium">{new Date(poll.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                    })}</span></p>
                </div>
                <VoteComponent pollId={poll.pollId} isActive={poll.isActive} options={poll.options} pollUsername={poll.username} />
            </div> : <p>There is no poll with given id.</p>
        }
    </div>
};
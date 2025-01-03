import { GetPollById } from "@/services/pollServices";
import StatisticsComponent from "@/components/poll/statistics/StatisticsComponent";

export default async function PollStatistics({ params }: {
    params: Promise<{
        pollId: string,

    }>
}) {
    const { pollId } = await params;

    const poll = await GetPollById(pollId);

    return <>
        {
            poll ? < StatisticsComponent poll={poll} /> : <p>There is no poll with given id.</p>
        }
    </>
}
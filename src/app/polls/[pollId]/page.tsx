import PollComponent from "@/components/PollComponent";
import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance"


export default async function SinglePoll({ params }: {
    params: Promise<{
        pollId: string,
    }>
}) {

    const { pollId } = await params;
    const poll: Poll = (await axiosInstance.get(`/polls/${pollId}`)).data;

    return <PollComponent poll={poll} />
};


import PollComponent from "@/components/PollComponent";
import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance"
import { useSelector } from "react-redux";


export default async function SinglePoll({ params }: {
    params: Promise<{
        pollId: string,

    }>
}) {


    const { pollId } = await params;

    const poll = (await axiosInstance.get(`/polls/${pollId}`)).data;

    return <div className="w-full flex justify-center items-center p-5">
        <PollComponent poll={poll} />
    </div>
};
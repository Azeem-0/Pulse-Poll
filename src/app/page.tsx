
import PollStatusComponent from "@/components/poll/PollStatusComponent";
import ViewPollComponent from "@/components/poll/ViewPollComponent";
import { GetAllPolls } from "@/services/pollServices";
import { containerStyles } from "@/styles/styles";
import { Poll } from "@/types/Poll";
import Link from "next/link";

export default async function Dashboard() {

  const polls: Poll[] = await GetAllPolls();

  return (
    <div className={containerStyles}>
      <div className="flex flex-wrap gap-10 flex-col items-center justify-around">
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-sans text-3xl font-semibold text-gray-800">Welcome to PulsePoll</h1>
          <p className="text-xs font-roboto w-[25rem] text-center">Browse through the latest polls, cast your vote, and stay updated with real-time results. Join the conversation today</p>
        </div>
        <div className="flex mt-10 flex-wrap items-center justify-evenly px-5 gap-x-10 gap-y-10">
          {Array.isArray(polls) && polls.length > 0 ? (
            polls?.sort((p1, p2) => new Date(p2.createdAt).getTime() - new Date(p1.createdAt).getTime())?.map((poll, index) => (
              <div className=" hover:scale-105 hover:rotate-2 transition-all duration-75 bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] flex flex-col gap-[10px] w-[13rem] h-[16rem] justify-center items-start rounded-xl px-2" key={poll.pollId}>
                <PollStatusComponent activeState={poll.isActive} />
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
                <ViewPollComponent pollId={poll.pollId} />
              </div>
            ))
          ) : (
            <p className="text-gray-600">There are no polls currently.</p>
          )}
        </div>
      </div>
    </div>
  );

}

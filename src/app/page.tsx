
import PollComponent from "@/components/poll/PollComponent";
import { GetAllPolls } from "@/services/pollServices";
import { Poll } from "@/types/Poll";
import Link from "next/link";


export default async function Dashboard() {

  // dont forget to modularize everything in a way where all the client components are placed at the bottom of the dom, and even if possible try to change client code into separate components for efficiency.

  const polls: Poll[] = await GetAllPolls();

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center items-center bg-white p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Well, here we go.
      </h1>
      <div className="space-y-6">
        {polls && polls.length > 0 ? (
          polls.map((poll, index) => (
            <div className="w-fit bg-gray-200 p-3 m-5 rounded-lg flex flex-col items-center justify-center gap-5 shadow-md" key={index}>
              <PollComponent
                key={index}
                isActive={poll.isActive}
                title={poll.title}
                username={poll.username}
              />
              <Link
                href={`/polls/${poll.pollId}`}
                className="mt-4 px-4 py-2 text-center w-full bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
              >
                View poll.
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">There are no polls currently.</p>
        )}
      </div>
    </div>
  );

}

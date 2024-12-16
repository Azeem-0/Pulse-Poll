
import PollComponent from "@/components/poll/PollComponent";
import PollStatusComponent from "@/components/poll/PollStatusComponent";
import ViewPollComponent from "@/components/poll/ViewPollComponent";
import { GetAllPolls } from "@/services/pollServices";
import { buttonStyles, cardStyles, containerStyles, headingStyles } from "@/styles/styles";
import { Poll } from "@/types/Poll";
import Link from "next/link";

export default async function Dashboard() {

  const polls: Poll[] = await GetAllPolls();

  return (
    <div className={containerStyles}>
      <div className="flex flex-wrap items-center justify-around">
        {polls && polls.length > 0 ? (
          polls.map((poll, index) => (
            <div className={cardStyles} key={poll.pollId}>
              <PollComponent
                key={index}
                title={poll.title}
                username={poll.username}
              />
              <PollStatusComponent activeState={poll.isActive} />
              <ViewPollComponent pollId={poll.pollId} />
            </div>
          ))
        ) : (
          <p className="text-gray-600">There are no polls currently.</p>
        )}
      </div>
    </div>
  );

}

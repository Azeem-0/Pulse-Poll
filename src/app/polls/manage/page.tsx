
import ManagePollParent from "@/components/poll/manage/ManagePollParent";
import { GetAllPolls } from "@/services/pollServices";
import { Poll } from "@/types/Poll";

export default async function ManagePoll() {

    const polls: Poll[] = await GetAllPolls();


    return <ManagePollParent polls={polls} />
};
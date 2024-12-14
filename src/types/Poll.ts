export interface Poll {
    pollId: string;
    username: string;
    title: string;
    options: OptionItem[];
    isActive: boolean;
    voters: VoteHistory[];
    createdAt: string;
    updatedAt: string;
}

export interface OptionItem {
    optionId: string;
    text: string;
    votes: number;
}

export interface VoteHistory {
    username: string;
    optionId: string;
}

export interface PollResults {
    pollId: string;
    title: string;
    options: ResultsOptionItem[];
    totalVotes: number,
    timeElapsed: string,
}

export interface ResultsOptionItem {
    optionId: string,
    text: string,
    votes: number,
    percentage: number,
}
import axiosInstance from "@/utils/axiosInstance"

export const GetAllPolls = async () => {
    try {
        const response = await (await axiosInstance.get("/")).data;

        return response;
    } catch (error) {
        console.error("Error retreiving polls", error);
        return [];
    }
}

export const GetPollById = async (pollId: string) => {
    try {
        const response = await (await axiosInstance.get(`/polls/${pollId}`)).data;

        return response;
    } catch (error) {
        console.error("Error retreiving poll", error);
        return null;
    }
}


export const CreatePoll = async (poll: {
    title: string,
    options: string[],
    username: string | null,
}) => {
    try {
        const response = await axiosInstance.post("/polls/", poll);
        return response;
    } catch (error) {
        throw error;
    }
}

export const ResetPoll = async (pollId: string, username: string | null) => {
    try {
        const response = (await axiosInstance.post(`/polls/${pollId}/reset`, { username })).data;
        return response;
    } catch (error) {
        throw error;
    }
}

export const ClosePoll = async (pollId: string, username: string | null) => {
    try {
        const response = (await axiosInstance.post(`/polls/${pollId}/close`, { username })).data;
        return response;
    } catch (error) {
        throw error;
    }
}

export const VoteToPoll = async (username: string | null, selectedOption: string, pollId: string) => {
    try {
        const voteOption = {
            username: username,
            optionId: selectedOption,
        }

        const response = await (await axiosInstance.post(`/polls/${pollId}/vote`, voteOption)).data;

        return response;

    } catch (error) {
        throw error;
    }
}

export const GetResults = async (pollId: string | null) => {
    try {
        const response = await (await axiosInstance.get(`/polls/${pollId}/results`)).data;
        return response;
    } catch (error) {
        throw error;
    }
}
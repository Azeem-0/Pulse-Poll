"use client";

import { CreatePoll } from "@/services/pollServices";
import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import { handleApiError } from "@/utils/handleApiErrors";
import { findMostFrequentCount } from "@/utils/mostFrequentCharacter";
import { useState } from "react";

export const usePoll = () => {
    const [title, setTitle] = useState('');
    const [options, setOptions] = useState<string[]>(['']);
    const [isLoading, setIsLoading] = useState(false);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };


    const { username, resetUserSession } = useUserStore((state) => state);

    const { notifySuccess, notifyWarning, notifyError } = useNotificationStore((state) => state);

    const addOption = () => {
        if (options.some((option) => option.trim() === '')) {
            notifyWarning('Please fill in the previous option before adding a new one.');
            return;
        }
        setOptions([...options, '']);
    };

    const removeOption = (index: number) => {
        setOptions(options?.filter((_, i) => i !== index));
    };

    const createNewPoll = async () => {

        let redundantPoll = findMostFrequentCount(options);

        if (!title || options.some((opt) => !opt.trim())) {
            notifyWarning('Please fill in the title and all options.');
            return;
        }
        else if (options.length < 2) {
            notifyWarning("Poll should have more than one option.");
            return;
        }
        else if (redundantPoll >= 2) {
            notifyWarning("Duplicate options are not allowed.");
            return;
        }

        setIsLoading(true);

        const poll = {
            title,
            options,
            username: username
        };

        try {
            await CreatePoll(poll);
            setTitle('');
            setOptions([''])
            notifySuccess("Successfully created poll.");

        } catch (error) {
            handleApiError(error, "Error creating poll.", notifyError, notifyWarning, resetUserSession);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        title,
        setTitle,
        options,
        setOptions,
        createNewPoll,
        addOption,
        removeOption,
        handleOptionChange,
        isLoading
    }
}
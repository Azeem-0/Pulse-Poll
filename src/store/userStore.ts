import axiosInstance from '@/utils/axiosInstance';
import { create } from 'zustand';

type UserState = {
    username: string | null;
    isLoading: boolean,
    setUserSession: (username: string) => void;
    checkUserSession: () => void;
    resetUserSession: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    username: null,
    isLoading: true,
    setUserSession: (username) => {
        if (typeof window !== "undefined") {
            localStorage.setItem("username", username);
        }
        set({ username, isLoading: false });
    },
    resetUserSession: () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("username");
        }
        set({ username: null, isLoading: false });
    },
    checkUserSession: () => {
        if (typeof window !== "undefined") {
            const username = localStorage.getItem("username");
            set({ username: username || null, isLoading: false });
        }
    },
}))

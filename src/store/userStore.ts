import axiosInstance from '@/utils/axiosInstance';
import { create } from 'zustand';

type UserState = {
    username: string | null;
    setUsername: (username: string) => void;
    checkUserSession: () => void;
    resetUserSession: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    username: null,
    setUsername: (username) => {
        localStorage.setItem("username", username);
        set({ username });
    },
    resetUserSession: () => {
        localStorage.removeItem("username");
        set({ username: null });
    },
    checkUserSession: async () => {
        const username = localStorage.getItem("username");
        if (username) {
            set({ username });
        }
        else {
            set({ username: null });
        }
    }
}));

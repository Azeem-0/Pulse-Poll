import { create } from 'zustand';

type UserState = {
    username: string | null;
    setUsername: (username: string) => void;
    checkUserSession: () => void;
};

export const useUserStore = create<UserState>((set) => ({
    username: null,
    setUsername: (username) => {
        console.log(username);
        set({ username });
    },
    checkUserSession: () => {
        const username = localStorage.getItem("username");
        if (username) {
            set({ username });
        }
        else {
            set({ username: null });
        }
    }
}));

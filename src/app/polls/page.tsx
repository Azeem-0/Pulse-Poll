"use client";

import { useNotificationStore } from "@/store/notificationStore";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";


export default function Polls() {

    const username = useUserStore((state) => state.username);

    useEffect(() => {
        console.log("does this username change?", username);
    }, [username]);

    return (
        <div>
            {username ? (
                <p>Welcome, {username}!</p>
            ) : (
                <p>Please log in to see your username.</p>
            )}
        </div>
    );
}

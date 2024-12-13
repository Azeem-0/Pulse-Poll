"use client";

import { useUserStore } from "@/store";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";


export default function Polls() {

    const username = useUserStore((state) => state.username);

    console.log(username); // Check if username is being updated

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

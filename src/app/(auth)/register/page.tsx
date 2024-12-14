"use client";

import { Registration } from "@/services/authService";
import { useNotificationStore } from "@/store/notificationStore";
import { startRegistration } from "@simplewebauthn/browser";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
    const [username, setUsername] = useState('');

    const router = useRouter();

    const { notifyError, notifySuccess } = useNotificationStore((state) => state);

    const handleRegister = async () => {
        try {
            const registrationFinishResponse = await Registration(username);

            if (registrationFinishResponse.status === 200) {
                notifySuccess("Successfully registered.")
                router.push("/login");
            }
        }
        catch (err) {
            notifyError("Error : " + err);
            console.log(err);
        }
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-fit max-w-md p-6 bg-gray-200 shadow rounded mt-10">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Register</h1>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                    className="w-full py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                    onClick={handleRegister}
                >
                    Register
                </button>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <span>Already registered? </span>
                    <Link
                        className="text-blue-600 hover:underline"
                        href="/login"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );

}

"use client";

import { startRegistration } from "@simplewebauthn/browser";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function Register() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const registrationStartResponse = await axios.post(
                `http://localhost:8080/api/auth/register/start/${username}`,
            );

            const credentials = await registrationStartResponse.data.publicKey;

            console.log(credentials);

            let attResponse = await startRegistration({ optionsJSON: credentials });

            console.log(attResponse);

            const registrationFinishResponse = await axios.post(
                `http://localhost:8080/api/auth/register/finish/${username}`,
                JSON.stringify(attResponse),
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (registrationFinishResponse.status === 200) {
                console.log("Successfully registered");
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="flex flex-col gap-6 w-fit justify-between items-center bg-purple-500 p-8 m-auto rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white">Register</h1>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                onClick={handleRegister}
            >
                Register
            </button>
            <p className="text-white text-sm">{message}</p>
        </div>
    );

}

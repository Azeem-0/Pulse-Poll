"use client";

import { startAuthentication, startRegistration } from "@simplewebauthn/browser";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Login() {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const authenticationStartResponse = await axios.post(
                `http://localhost:8080/api/auth/login/start/${username}`,
            );

            const requestOptions = authenticationStartResponse.data.publicKey;

            console.log(requestOptions);

            const attResp = await startAuthentication({ optionsJSON: requestOptions });

            const authenticationFinishResponse = await axios.post(
                `http://localhost:8080/api/auth/login/finish/${username}`,
                attResp,
                {
                    withCredentials: true
                },
            );

            setMessage('Login successful!');
            console.log(authenticationFinishResponse);

            router.push('/');


        } catch (error: any) {
            if (error.name === 'NotAllowedError') {
                setMessage('Authentication cancelled');
            } else if (error.response) {
                setMessage(error.response.data.message || 'Login failed');
            } else {
                setMessage('Login failed');
                console.error(error);
            }
        }
    }

    const checkJwt = async () => {
        const response = await axios.get("http://localhost:8080/api/r/route/protected", {
            withCredentials: true
        },);
        console.log(response);
    }

    return (
        <div className="flex flex-col gap-6 w-fit justify-between items-center bg-purple-500 p-8 m-auto rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold text-white">Login</h1>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <button
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                onClick={handleLogin}
            >
                Login
            </button>
            <p className="text-white text-sm">{message}</p>
            <button
                className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
                onClick={checkJwt}
            >
                Check protected route access
            </button>
        </div>
    );

}

"use client";

import Link from "next/link";
import { useLogin } from "@/hooks/useAuth";

export default function Login() {

    const { username, setUsername, handleLogin, isLoading } = useLogin();

    return (
        <div className="w-full flex justify-center items-center">
            <div className="w-fit max-w-md p-6 bg-gray-200 shadow rounded mt-10">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Login</h1>
                <input
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    aria-label="Login"
                />
                {isLoading ? <p className="w-full text-center">Loading...</p> : <button
                    className="w-full py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                    onClick={handleLogin}
                >
                    Login
                </button>}
                <div className="mt-4 text-center text-sm text-gray-600">
                    <span>Not registered yet? </span>
                    <Link
                        className="text-blue-600 hover:underline"
                        href="/register"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>

    );


}

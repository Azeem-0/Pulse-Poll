"use client";

const Loading = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-4">
                <svg
                    className="animate-spin h-12 w-12 text-black-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                </svg>
                <p className="font-roboto text-xs text-gray-600 w-[25rem] text-center">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
};

export default Loading;
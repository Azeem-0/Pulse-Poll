"use client";

const ErrorPage = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center gap-4">
                <h1 className="font-sans text-4xl font-bold text-red-500">Something Went Wrong</h1>
                <p className="text-xs font-roboto w-[25rem] text-center text-gray-600">
                    An unexpected error occurred. Please try again later or contact support if the issue persists.
                </p>
                <a href="/" className="inline-block font-roboto text-sm rounded bg-[#B4FE3A] text-black shadow hover:bg-[#b2ff36] px-4 py-2 ">
                    Go Home
                </a>
            </div>
        </div>
    );
};

export default ErrorPage;

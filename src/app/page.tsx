import PollComponent from "@/components/PollComponent";
import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";


export default async function Dashboard() {

  const polls: [Poll] = await (await axiosInstance.get("/")).data;

  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        This is our polling website.
      </h1>
      <div className="space-x-4">
        <Link href="/register" className="px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700">
          Click here to register.
        </Link>
        <Link href="/login" className="px-6 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700">
          Click here to login.
        </Link>
      </div>
      <div className="space-y-6">
        {polls.map((poll, index) => (
          <PollComponent key={index} poll={poll} />
        ))}
      </div>

    </div>
  );

}

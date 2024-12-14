
import PollComponent from "@/components/PollComponent";
import { Poll } from "@/types/Poll";
import axiosInstance from "@/utils/axiosInstance";
import Link from "next/link";


export default async function Dashboard() {

  // dont forget to modularize everything in a way where all the client components are placed at the bottom of the dom, and even if possible try to change client code into separate components for efficiency.

  const polls: [Poll] = await (await axiosInstance.get("/")).data;

  // useEffect(() => {

  //   axiosInstance.get('/')
  //     .then((response) => {
  //       dispatch(setPolls(response.data));
  //     }).catch((err) => {
  //       alert("Failed to get polls data");
  //     });

  //   const es = new EventSource('http://localhost:8080/api/socket/create-client');

  //   es.onopen = () => {
  //     console.log("connected succesfully.");
  //   }

  //   es.addEventListener("poll_created", (event) => {
  //     const poll = JSON.parse(event.data);
  //     dispatch(addPolls(poll));

  //   });

  //   es.addEventListener("poll_updated", (event) => {
  //     const poll = JSON.parse(event.data);
  //     dispatch(updatePoll(poll));
  //   });

  //   return () => {
  //     es.close();
  //   };
  // }, [dispatch]);


  return (
    <div className="w-full h-full flex flex-col gap-10 justify-center items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        This is our polling website.
      </h1>
      <div className="space-y-6">
        {polls.map((poll, index) => (
          <PollComponent key={index} poll={poll} />
        ))}
      </div>
    </div>
  );

}

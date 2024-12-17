export default function PollStatusComponent({ activeState }: {
    activeState: boolean
}) {
    return <p className="text-xs px-[10px] text-gray-600 ">
        Status:{" "}
        <span className={`font-medium ${activeState ? "text-green-600" : "text-red-600"} `}>
            {activeState ? "Active" : "Closed"}
        </span>
    </p>
};
export default function PollComponent({ title, username, from }: {

    title: string,
    username: string,
    from: string,
}) {
    return (
        <div className="flex flex-col px-[10px] gap-[10px]">
            {from === "home" ? <h2 className="font-sans text-xl font-semibold text-gray-800 flex">{title.substring(0, 26)} {title.length > 26 ? "..." : ""}</h2> : <h2 className="font-sans text-xl font-semibold text-gray-800 flex">{title}</h2>}
            <p className="font-roboto text-xs text-gray-600">
                Created by: <span className="font-roboto text-black font-medium">{username}</span>
            </p>
        </div>
    );
}

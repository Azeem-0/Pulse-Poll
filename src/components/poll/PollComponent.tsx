export default function PollComponent({ title, username }: {

    title: string,
    username: string,
}) {
    return (
        <div className="p-4 w-full bg-white shadow-md rounded-lg border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
            <p className="text-sm text-gray-600 mb-1">
                Created by: <span className="font-medium">{username}</span>
            </p>
        </div>
    );
}

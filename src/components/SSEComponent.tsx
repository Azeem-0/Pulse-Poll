'use client';

import { useState, useEffect } from 'react';

export default function SSEComponent() {
    const [messages, setMessages] = useState<string[]>([]);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Create EventSource connection to the Rust backend
        const eventSource = new EventSource('http://localhost:8080/api/check/streaming');

        // Handle connection opened
        eventSource.onopen = () => {
            console.log('Connection opened');
            setIsConnected(true);
        };

        // Handle incoming messages
        eventSource.onmessage = (event) => {
            const newMessage = event.data;
            setMessages(prevMessages => [...prevMessages, newMessage]);
        };

        // Handle errors
        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            setIsConnected(false);
            eventSource.close();
        };

        // Cleanup on component unmount
        return () => {
            eventSource.close();
        };
    }, []);

    // Function to send a message to the backend
    const sendMessage = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/check/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify('Hello from Next.js!')
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">SSE Connection Demo</h1>

            <div className="mb-4">
                <p>Connection Status:
                    <span className={`ml-2 ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                        {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                </p>
            </div>

            <div className="mb-4">
                <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Send Message
                </button>
            </div>

            <div className="border p-4 rounded">
                <h2 className="font-semibold mb-2">Received Messages:</h2>
                {messages.length === 0 ? (
                    <p className="text-gray-500">No messages yet</p>
                ) : (
                    <ul className="space-y-2">
                        {messages.map((msg, index) => (
                            <li key={index} className="bg-gray-100 p-2 rounded">
                                {msg}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
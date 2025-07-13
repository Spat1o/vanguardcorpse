
import React from 'react';
import type { ChatMessage } from '../types';

interface ChatBoxProps {
    messages: ChatMessage[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
    // Show only the last 7 messages for the pop-up display
    const recentMessages = messages.slice(-7);

    return (
        <div className="fixed bottom-4 left-4 z-30 w-full max-w-xl font-minecraft text-xl pointer-events-none">
            <div className="flex flex-col-reverse">
                {recentMessages.reverse().map((msg) => (
                     <div 
                        key={msg.id} 
                        className="bg-black/50 p-2 pl-3 pr-4 rounded-md mt-2 max-w-max animate-fade-in-up"
                     >
                        {msg.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChatBox;

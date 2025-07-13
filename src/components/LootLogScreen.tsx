
import React, { useEffect, useRef } from 'react';
import type { ChatMessage } from '../types';

interface LootLogScreenProps {
    messages: ChatMessage[];
    onClose: () => void;
}

const LootLogScreen: React.FC<LootLogScreenProps> = ({ messages, onClose }) => {
    const endOfLogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scroll to bottom whenever new messages are added
        endOfLogRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        // Also scroll to bottom immediately on open
        endOfLogRef.current?.scrollIntoView();
    }, []);

    return (
        <div className="fixed inset-0 bg-black/90 z-40 flex justify-center p-4 sm:p-8 md:p-12 font-minecraft">
            <div className="w-full max-w-4xl h-full flex flex-col">
                <div className="text-center mb-6">
                    <h1 className="text-5xl text-cyan-300">Vanguard Corpse Loot Log</h1>
                    <p className="text-gray-400 text-xl mt-2">Press 'T' or 'Esc' to close</p>
                </div>
                <div className="flex-grow overflow-y-auto pr-4 -mr-4">
                    {messages.length === 0 ? (
                         <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400 text-3xl">No corpses opened yet.</p>
                        </div>
                    ) : (
                        messages.map(msg => (
                            <div key={msg.id}>
                                {msg.content}
                            </div>
                        ))
                    )}
                    <div ref={endOfLogRef} />
                </div>
            </div>
        </div>
    );
};
export default LootLogScreen;
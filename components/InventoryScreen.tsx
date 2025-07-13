
import React from 'react';
import type { InventoryItem } from '../types';
import { CloseIcon } from './Icons';
import { RARITY_COLORS } from '../constants';

interface InventoryScreenProps {
    inventory: Record<string, InventoryItem>;
    onClose: () => void;
}

const InventoryScreen: React.FC<InventoryScreenProps> = ({ inventory, onClose }) => {
    const items = Object.values(inventory).sort((a, b) => (b.value * b.quantity) - (a.value * a.quantity));
    const totalValue = items.reduce((sum, item) => sum + (item.value * item.quantity), 0);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 font-minecraft">
            <div className="w-full max-w-4xl h-[80vh] bg-gray-800 border-4 border-gray-600 rounded-lg p-4 shadow-lg flex flex-col bg-cover bg-center" style={{ backgroundImage: "url('/images/inventory_background.jpg')" }}>
                <div className="flex justify-between items-center mb-4 pb-2 border-b-2 border-gray-600">
                    <div>
                        <h2 className="text-4xl text-white">Inventory</h2>
                        <p className="text-yellow-400 text-2xl">Total Value: {totalValue.toLocaleString()} coins</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <CloseIcon className="w-8 h-8" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto pr-2">
                    {items.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400 text-3xl">Your inventory is empty. Open some Vanguard Corpses!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {items.map(item => (
                                <div key={item.id} className="bg-gray-900/70 p-3 rounded-md border border-gray-700 flex flex-col">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-gray-700 mr-3 flex items-center justify-center rounded shrink-0">
                                            <img src={item.icon} alt={item.name} className="w-full h-full object-contain p-1" />
                                        </div>
                                        <h3 className={`text-2xl ${RARITY_COLORS[item.rarity]}`}>{item.name}</h3>
                                    </div>
                                    <div className="text-xl text-gray-300 space-y-1 mt-auto pl-1">
                                        <p>Obtained: <span className="text-white font-bold">{item.quantity.toLocaleString()}</span></p>
                                        {item.value > 0 && (
                                           <p>Total Value: <span className="text-yellow-500 font-bold">{(item.quantity * item.value).toLocaleString()}</span></p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InventoryScreen;

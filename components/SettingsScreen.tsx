
import React from 'react';
import type { DyeMultiplier } from '../types';
import { CloseIcon } from './Icons';

interface SettingsScreenProps {
    giftsFromDeparted: boolean;
    setGiftsFromDeparted: (value: boolean) => void;
    dyeMultiplier: DyeMultiplier;
    setDyeMultiplier: (value: DyeMultiplier) => void;
    onClose: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
    giftsFromDeparted, 
    setGiftsFromDeparted,
    dyeMultiplier,
    setDyeMultiplier,
    onClose 
}) => {
    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 font-minecraft">
            <div className="w-full max-w-2xl bg-gray-800 border-4 border-gray-600 rounded-lg p-6 shadow-lg flex flex-col max-h-[90vh]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl text-white">Settings</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <CloseIcon className="w-8 h-8" />
                    </button>
                </div>
                
                <div className="flex-grow overflow-y-auto space-y-6 pr-2">
                    {/* Gifts from the Departed Setting */}
                    <div className="bg-gray-900/50 p-4 rounded-md">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={giftsFromDeparted}
                                onChange={(e) => setGiftsFromDeparted(e.target.checked)}
                                className="h-6 w-6 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500 bg-gray-700"
                            />
                            <span className="ml-4 text-3xl text-white">Gifts from the Departed</span>
                        </label>
                        <p className="text-gray-400 mt-2 ml-10 text-lg">20% chance to gain an additional drop from the corpse.</p>
                    </div>

                    {/* Frostbitten Dye Multiplier Setting */}
                     <div className="bg-gray-900/50 p-4 rounded-md">
                        <h3 className="text-3xl text-white mb-3">Frostbitten Dye Multiplier</h3>
                        <div className="space-y-2">
                            {[1, 2, 3].map(val => (
                                <label key={val} className="flex items-center cursor-pointer">
                                    <input
                                        type="radio"
                                        name="dye-multiplier"
                                        value={val}
                                        checked={dyeMultiplier === val}
                                        onChange={() => setDyeMultiplier(val as DyeMultiplier)}
                                        className="h-5 w-5 border-gray-300 text-cyan-600 focus:ring-cyan-500 bg-gray-700"
                                    />
                                    <span className="ml-4 text-2xl text-gray-300">{val}x Multiplier ({val * 0.01}% chance per roll)</span>
                                </label>
                            ))}
                        </div>
                         <p className="text-gray-400 mt-3 text-lg">Boosted chance during certain SkyBlock years.</p>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button onClick={onClose} className="px-8 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-2xl rounded shadow-md transition-transform transform hover:scale-105">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsScreen;
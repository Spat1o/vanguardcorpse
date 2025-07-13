
import React from 'react';
import { InventoryIcon, ResetIcon, SettingsIcon } from './Icons';

interface MainScreenProps {
    onOpenCorpse: () => void;
    onOpenInventory: () => void;
    onOpenSettings: () => void;
    onReset: () => void;
    skeletonKeys: number;
    corpsesOpened: number;
    totalProfit: number;
    totalGlacitePowder: number;
}

const MainScreen: React.FC<MainScreenProps> = ({ 
    onOpenCorpse, 
    onOpenInventory, 
    onOpenSettings, 
    onReset, 
    skeletonKeys, 
    corpsesOpened, 
    totalProfit,
    totalGlacitePowder
}) => {
    
    const keyColor = skeletonKeys > 0 ? 'text-green-400' : skeletonKeys < 0 ? 'text-red-400' : 'text-white';
    const profitColor = totalProfit > 0 ? 'text-green-400' : totalProfit < 0 ? 'text-red-400' : 'text-white';


    return (
        <div className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 font-minecraft bg-gray-900 bg-cover bg-center" style={{ backgroundImage: "url('/images/dwarven_mines_background.png')" }}>
            <div className="absolute top-4 right-4 flex space-x-4">
                 <button onClick={onOpenInventory} className="p-3 bg-gray-700/80 hover:bg-gray-600/80 rounded-full text-white transition-colors">
                    <InventoryIcon className="w-8 h-8" />
                </button>
                <button onClick={onOpenSettings} className="p-3 bg-gray-700/80 hover:bg-gray-600/80 rounded-full text-white transition-colors">
                    <SettingsIcon className="w-8 h-8" />
                </button>
            </div>

            {/* Main Content */}
            <div className="text-center flex flex-col items-center">
                <h1 className="text-6xl md:text-7xl text-cyan-300 mb-8">Vanguard Corpse Simulator</h1>
                <div className="bg-black/50 p-2 rounded-xl shadow-2xl border-2 border-gray-700">
                    <button 
                        onClick={onOpenCorpse} 
                        className="w-80 h-80 md:w-96 md:h-96 bg-gray-800 rounded-lg border-4 border-cyan-500 shadow-lg flex items-center justify-center text-gray-400 transition-transform transform hover:scale-105 hover:border-cyan-300 focus:outline-none p-4"
                    >
                        <img src="/images/vanguard_corpse.png" alt="Click to open a Vanguard Corpse" className="w-full h-full object-contain" />
                    </button>
                </div>
            </div>

             {/* Statistics Panel */}
            <div className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 bg-black/60 border-2 border-gray-700 rounded-lg p-6 space-y-3 shadow-xl w-64 md:w-72">
                <h2 className="text-3xl text-cyan-300 border-b border-gray-600 pb-2 mb-4">Statistics</h2>
                <div className="text-xl space-y-3">
                    <div>
                        <span className="text-gray-400">Corpses Opened: </span>
                        <span className="text-white font-bold">{corpsesOpened.toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="text-gray-400">Skeleton Keys: </span>
                        <span className={`${keyColor} font-bold`}>{skeletonKeys.toLocaleString()}</span>
                    </div>
                     <div>
                        <span className="text-gray-400">Total Profit: </span>
                        <span className={`${profitColor} font-bold`}>{totalProfit.toLocaleString()}</span>
                    </div>
                    <div>
                        <span className="text-gray-400">Glacite Powder: </span>
                        <span className="text-cyan-400 font-bold">{totalGlacitePowder.toLocaleString()}</span>
                    </div>
                </div>
            </div>


             <button 
                onClick={onReset} 
                title="Reset Progress"
                className="absolute bottom-4 right-4 p-3 bg-red-800/80 hover:bg-red-700/80 rounded-full text-white transition-colors shadow-lg">
                <ResetIcon className="w-8 h-8" />
            </button>
             <footer className="absolute bottom-4 text-gray-500 text-lg">
                Press 'T' to view loot log. Data from Hypixel Skyblock Wiki. Not affiliated with Hypixel Inc.
            </footer>
        </div>
    );
};

export default MainScreen;

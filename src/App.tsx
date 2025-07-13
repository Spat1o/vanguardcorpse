
import React, { useState, useEffect, useCallback } from 'react';
import { type LootItem, type InventoryItem, type ChatMessage, type DyeMultiplier } from './types';
import { DEFAULT_LOOT_TABLE, RARITY_COLORS, TOTAL_WEIGHT, DYE_BASE_CHANCE, FROSTBITTEN_DYE_ITEM, SKELETON_KEY_COST } from './constants';

import MainScreen from './components/MainScreen';
import LootLogScreen from './components/LootLogScreen';
import InventoryScreen from './components/InventoryScreen';
import SettingsScreen from './components/SettingsScreen';
import ChatBox from './components/ChatBox';
import ConfirmResetModal from './components/ConfirmResetModal';

const LOCAL_STORAGE_KEY = 'vanguardCorpseSimulatorState';

function getWeightedRandomItem(): LootItem {
    let random = Math.random() * TOTAL_WEIGHT;
    for (const item of DEFAULT_LOOT_TABLE) {
        random -= item.weight;
        if (random <= 0) {
            return item;
        }
    }
    // Fallback in case of floating point inaccuracies
    return DEFAULT_LOOT_TABLE[DEFAULT_LOOT_TABLE.length - 1];
}

const App: React.FC = () => {
    // --- State Initialization ---
    const [inventory, setInventory] = useState<Record<string, InventoryItem>>({});
    const [skeletonKeys, setSkeletonKeys] = useState<number>(0);
    const [corpsesOpened, setCorpsesOpened] = useState<number>(0);
    const [totalProfit, setTotalProfit] = useState<number>(0);
    const [totalGlacitePowder, setTotalGlacitePowder] = useState<number>(0);
    
    // Message States (not persisted)
    const [logMessages, setLogMessages] = useState<ChatMessage[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    
    // Settings State
    const [giftsFromDeparted, setGiftsFromDeparted] = useState<boolean>(false);
    const [dyeMultiplier, setDyeMultiplier] = useState<DyeMultiplier>(1);

    // UI State
    const [isInventoryOpen, setIsInventoryOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isLootLogOpen, setIsLootLogOpen] = useState(false);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    
    // --- Load state from localStorage on initial render ---
    useEffect(() => {
        try {
            const savedStateJSON = window.localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedStateJSON) {
                const savedState = JSON.parse(savedStateJSON);
                setInventory(savedState.inventory || {});
                setSkeletonKeys(savedState.skeletonKeys || 0);
                setCorpsesOpened(savedState.corpsesOpened || 0);
                setTotalProfit(savedState.totalProfit || 0);
                setTotalGlacitePowder(savedState.totalGlacitePowder || 0);
                setGiftsFromDeparted(savedState.giftsFromDeparted || false);
                setDyeMultiplier(savedState.dyeMultiplier || 1);
            }
        } catch (error) {
            console.error("Failed to load state from localStorage:", error);
        }
    }, []);

    // --- Save state to localStorage on change ---
    useEffect(() => {
        const stateToSave = {
            inventory,
            skeletonKeys,
            corpsesOpened,
            totalProfit,
            totalGlacitePowder,
            giftsFromDeparted,
            dyeMultiplier,
        };
        try {
            window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
        } catch (error) {
            console.error("Failed to save state to localStorage:", error);
        }
    }, [inventory, skeletonKeys, corpsesOpened, totalProfit, totalGlacitePowder, giftsFromDeparted, dyeMultiplier]);


    const addMessage = useCallback((content: React.ReactNode, type: 'log' | 'chat') => {
        const message = { id: Date.now().toString() + Math.random(), content };
        if (type === 'log') {
            setLogMessages(prev => [...prev, message]);
        } else {
             setChatMessages(prev => {
                const newMessages = [...prev, message];
                // Keep chat history manageable
                if (newMessages.length > 50) {
                    return newMessages.slice(newMessages.length - 25);
                }
                return newMessages;
            });
        }
    }, []);

    const handleOpenCorpse = useCallback(() => {
        const corpseNumber = corpsesOpened + 1;
        setCorpsesOpened(corpseNumber);
        setSkeletonKeys(prev => prev - 1);

        let corpseProfit = -SKELETON_KEY_COST;
        const gainedItemsOnCorpse = new Map<string, { item: LootItem, quantity: number }>();

        let didGiftsTrigger = false;
        let rolls = Math.floor(Math.random() * 4) + 5; // 5-8 rolls
        if (giftsFromDeparted && Math.random() < 0.2) {
            rolls++;
            didGiftsTrigger = true;
        }

        for (let i = 0; i < rolls; i++) {
            let droppedItem: LootItem;
            if (Math.random() < DYE_BASE_CHANCE * dyeMultiplier) {
                droppedItem = FROSTBITTEN_DYE_ITEM;
            } else {
                droppedItem = getWeightedRandomItem();
            }

            const existing = gainedItemsOnCorpse.get(droppedItem.id);
            if (existing) {
                existing.quantity += droppedItem.baseQuantity;
            } else {
                gainedItemsOnCorpse.set(droppedItem.id, { item: droppedItem, quantity: droppedItem.baseQuantity });
            }
        }
        
        // Update skeleton keys, inventory, and generate chat messages
        let foundKeys = 0;
        gainedItemsOnCorpse.forEach(({ item, quantity }) => {
            corpseProfit += item.value * quantity;

            const rarityColor = RARITY_COLORS[item.rarity] || 'text-white';
            const chatMsgContent = (
                <p>
                    <span className={rarityColor}>+{quantity.toLocaleString()} [{item.name}]</span>
                </p>
            );
            addMessage(chatMsgContent, 'chat');
            
            if (item.id === 'skeleton_key') {
                foundKeys += quantity;
            }
        });
        
        if (foundKeys > 0) {
            setSkeletonKeys(prev => prev + foundKeys);
        }
        setTotalProfit(prev => prev + corpseProfit);
        
        setInventory(prevInventory => {
            const updatedInventory = { ...prevInventory };
            gainedItemsOnCorpse.forEach(({ item, quantity }) => {
                const existingItem = updatedInventory[item.id];
                if (existingItem) {
                    updatedInventory[item.id] = { ...existingItem, quantity: existingItem.quantity + quantity };
                } else {
                    const { weight, ...invItemData } = item;
                    updatedInventory[item.id] = { ...invItemData, quantity };
                }
            });
            return updatedInventory;
        });

        // Generate formatted detailed log message
        const glacitePowder = Math.floor(Math.random() * (50000 - 25000 + 1)) + 25000;
        setTotalGlacitePowder(prev => prev + glacitePowder);
        const hotmExp = 5000;
        const profitColor = corpseProfit > 0 ? 'text-green-400' : corpseProfit < 0 ? 'text-red-400' : 'text-white';

        const newLootMessage = (
            <div className="font-minecraft text-xl mb-6 leading-relaxed">
                <p className="text-green-400">___________________________________________</p>
                <p className="text-3xl my-2 text-center">
                    <span className="text-white">VANGUARD CORPSE #{corpseNumber} </span>
                    <span className="text-cyan-400">LOOT!</span>
                </p>
                <p className="text-green-400 mt-2 mb-1">REWARDS</p>
                <div className="pl-6">
                    {Array.from(gainedItemsOnCorpse.values()).map(({ item, quantity }) => {
                        const isSuperRare = item.id === 'frostbitten_dye' || item.id === 'shattered_locket';
                        const colorClass = isSuperRare ? 'text-red-500' : 'text-white';
                        return (
                            <p key={item.id} className={colorClass}>
                                +{quantity.toLocaleString()} [{item.name}]
                            </p>
                        );
                    })}
                </div>
                <p className="text-purple-400 mt-2">+{hotmExp.toLocaleString()} HOTM Exp</p>
                <p className="text-cyan-400">Glacite Powder +{glacitePowder.toLocaleString()}</p>
                 {didGiftsTrigger && <p className="text-yellow-300 italic mt-1">Bonus drop from Gifts from the Departed!</p>}
                <p className="mt-2 text-yellow-400">
                    Profit: <span className={profitColor}>{corpseProfit.toLocaleString()}</span>
                </p>
                <p className="text-green-400">___________________________________________</p>
            </div>
        );
        addMessage(newLootMessage, 'log');

    }, [addMessage, dyeMultiplier, giftsFromDeparted, corpsesOpened]);

    const handleReset = useCallback(() => {
        setIsResetModalOpen(true);
    }, []);

    const confirmAndReset = useCallback(() => {
        // Clear state
        setInventory({});
        setSkeletonKeys(0);
        setCorpsesOpened(0);
        setTotalProfit(0);
        setTotalGlacitePowder(0);
        setLogMessages([]);
        setChatMessages([]);
        setGiftsFromDeparted(false);
        setDyeMultiplier(1);
        
        // Clear localStorage
        try {
            window.localStorage.removeItem(LOCAL_STORAGE_KEY);
        } catch (error) {
            console.error("Failed to clear state from localStorage:", error);
        }

        // Close all modals
        setIsInventoryOpen(false);
        setIsSettingsOpen(false);
        setIsLootLogOpen(false);
        setIsResetModalOpen(false);
    }, []);


    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        
        if (key === 'escape') {
            setIsSettingsOpen(false);
            setIsInventoryOpen(false);
            setIsLootLogOpen(false);
            setIsResetModalOpen(false);
        }
        
        if (isSettingsOpen || isInventoryOpen || isResetModalOpen) return;

        if (key === 't') {
            event.preventDefault();
            setIsLootLogOpen(prev => !prev);
        }
    }, [isInventoryOpen, isSettingsOpen, isResetModalOpen]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <>
            <MainScreen
                onOpenCorpse={handleOpenCorpse}
                onOpenInventory={() => setIsInventoryOpen(true)}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onReset={handleReset}
                skeletonKeys={skeletonKeys}
                corpsesOpened={corpsesOpened}
                totalProfit={totalProfit}
                totalGlacitePowder={totalGlacitePowder}
            />
            <ChatBox messages={chatMessages} />
            {isLootLogOpen && <LootLogScreen messages={logMessages} />}
            {isInventoryOpen && <InventoryScreen inventory={inventory} onClose={() => setIsInventoryOpen(false)} />}
            {isSettingsOpen && (
                <SettingsScreen 
                    giftsFromDeparted={giftsFromDeparted}
                    setGiftsFromDeparted={setGiftsFromDeparted}
                    dyeMultiplier={dyeMultiplier}
                    setDyeMultiplier={setDyeMultiplier}
                    onClose={() => setIsSettingsOpen(false)} 
                />
            )}
            {isResetModalOpen && (
                <ConfirmResetModal 
                    onConfirm={confirmAndReset} 
                    onCancel={() => setIsResetModalOpen(false)} 
                />
            )}
        </>
    );
};

export default App;

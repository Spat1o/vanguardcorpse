
import type { ReactNode } from 'react';

export enum LootRarity {
    COMMON = 'COMMON',
    UNCOMMON = 'UNCOMMON',
    RARE = 'RARE',
    EPIC = 'EPIC',
    LEGENDARY = 'LEGENDARY',
}

export type DyeMultiplier = 1 | 2 | 3;

export interface LootItem {
    id: string;
    name: string;
    weight: number;
    baseQuantity: number;
    rarity: LootRarity;
    icon: string; // Placeholder for icon path
    value: number; // Average market value per base quantity unit
}

export interface InventoryItem extends Omit<LootItem, 'weight'> {
    quantity: number;
}

export interface ChatMessage {
    id: string;
    content: ReactNode;
}
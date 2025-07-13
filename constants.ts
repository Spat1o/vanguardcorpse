
import type { LootItem } from './types';
import { LootRarity } from './types';

export const RARITY_COLORS: Record<LootRarity, string> = {
    [LootRarity.COMMON]: 'text-white',
    [LootRarity.UNCOMMON]: 'text-green-400',
    [LootRarity.RARE]: 'text-blue-400',
    [LootRarity.EPIC]: 'text-purple-400',
    [LootRarity.LEGENDARY]: 'text-yellow-400',
};

export const SKELETON_KEY_COST = 23000000;

export const DYE_BASE_CHANCE = 0.0001; // 0.01%

export const FROSTBITTEN_DYE_ITEM: LootItem = { 
    id: 'frostbitten_dye', name: 'Frostbitten Dye', rarity: LootRarity.LEGENDARY, baseQuantity: 1, weight: 0, icon: '/images/frostbitten_dye.png', value: 370000000 
};

export const DEFAULT_LOOT_TABLE: LootItem[] = [
    { id: 'shattered_locket', name: 'Shattered Locket', weight: 3, baseQuantity: 1, rarity: LootRarity.LEGENDARY, icon: '/images/shattered_pendant.png', value: 807500000 },
    { id: 'skeleton_key', name: 'Skeleton Key', weight: 6, baseQuantity: 1, rarity: LootRarity.EPIC, icon: '/images/tripwire_hook.png', value: 23000000 },
    { id: 'umber_key_4', name: 'Umber Key', weight: 10, baseQuantity: 4, rarity: LootRarity.RARE, icon: '/images/enchanted_dead_bush.gif', value: 2000000 },
    { id: 'tungsten_key_4', name: 'Tungsten Key', weight: 10, baseQuantity: 4, rarity: LootRarity.RARE, icon: '/images/enchanted_lever.gif', value: 1850000 },
    { id: 'mithril_plate', name: 'Mithril Plate', weight: 30, baseQuantity: 1, rarity: LootRarity.RARE, icon: '/images/mithril_plate.png', value: 5500000 },
    { id: 'fine_onyx_160', name: 'Fine Onyx Gemstone', weight: 40, baseQuantity: 160, rarity: LootRarity.UNCOMMON, icon: '/images/fine_onyx_gem.png', value: 20000 },
    { id: 'fine_peridot_160', name: 'Fine Peridot Gemstone', weight: 40, baseQuantity: 160, rarity: LootRarity.UNCOMMON, icon: '/images/fine_peridot_gem.png', value: 30000 },
    { id: 'fine_citrine_160', name: 'Fine Citrine Gemstone', weight: 40, baseQuantity: 160, rarity: LootRarity.UNCOMMON, icon: '/images/fine_citrine_gem.png', value: 20000 },
    { id: 'fine_aquamarine_160', name: 'Fine Aquamarine Gemstone', weight: 40, baseQuantity: 160, rarity: LootRarity.UNCOMMON, icon: '/images/fine_aquamarine_gem.png', value: 20000 },
    { id: 'glacite_amalgamation_4', name: 'Glacite Amalgamation', weight: 40, baseQuantity: 4, rarity: LootRarity.UNCOMMON, icon: '/images/glacite_amalgamation.png', value: 1100000 },
    { id: 'umber_key_2', name: 'Umber Key', weight: 50, baseQuantity: 2, rarity: LootRarity.UNCOMMON, icon: '/images/enchanted_dead_bush.gif', value: 2000000 },
    { id: 'tungsten_key_2', name: 'Tungsten Key', weight: 50, baseQuantity: 2, rarity: LootRarity.UNCOMMON, icon: '/images/enchanted_lever.gif', value: 1850000 },
    { id: 'dwarven_os', name: 'Dwarven O\'s Metallic Minis', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/dwarven_os_metallic_minis.png', value: 4750000 },
    { id: 'umber_plate', name: 'Umber Plate', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/umber_plate.png', value: 8000000 },
    { id: 'tungsten_plate', name: 'Tungsten Plate', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/tungsten_plate.png', value: 8000000 },
    { id: 'opal_crystal', name: 'Opal Crystal', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/opal_crystal.png', value: 0 },
    { id: 'onyx_crystal', name: 'Onyx Crystal', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/onyx_crystal.png', value: 0 },
    { id: 'aquamarine_crystal', name: 'Aquamarine Crystal', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/aquamarine_crystal.png', value: 0 },
    { id: 'peridot_crystal', name: 'Peridot Crystal', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/peridot_crystal.png', value: 0 },
    { id: 'citrine_crystal', name: 'Citrine Crystal', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/citrine_crystal.png', value: 0 },
    { id: 'ruby_crystal', name: 'Ruby Crystal', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/ruby_crystal.png', value: 0 },
    { id: 'jasper_crystal', name: 'Jasper Crystal', weight: 50, baseQuantity: 1, rarity: LootRarity.UNCOMMON, icon: '/images/jasper_crystal.png', value: 0 },
    { id: 'refined_mithril_2', name: 'Refined Mithril', weight: 60, baseQuantity: 2, rarity: LootRarity.UNCOMMON, icon: '/images/refined_mithril.png', value: 0 },
    { id: 'refined_titanium_2', name: 'Refined Titanium', weight: 60, baseQuantity: 2, rarity: LootRarity.UNCOMMON, icon: '/images/refined_titanium.png', value: 0 },
    { id: 'blue_goblin_egg_4', name: 'Blue Goblin Egg', weight: 70, baseQuantity: 4, rarity: LootRarity.COMMON, icon: '/images/squid_spawn_egg.png', value: 1100000 },
    { id: 'flawless_onyx', name: 'Flawless Onyx Gemstone', weight: 80, baseQuantity: 1, rarity: LootRarity.COMMON, icon: '/images/flawless_onyx_gem.png', value: 1500000 },
    { id: 'flawless_peridot', name: 'Flawless Peridot Gemstone', weight: 80, baseQuantity: 1, rarity: LootRarity.COMMON, icon: '/images/flawless_peridot_gem.png', value: 2500000 },
    { id: 'flawless_citrine', name: 'Flawless Citrine Gemstone', weight: 80, baseQuantity: 1, rarity: LootRarity.COMMON, icon: '/images/flawless_citrine_gem.png', value: 1600000 },
    { id: 'flawless_aquamarine', name: 'Flawless Aquamarine Gemstone', weight: 80, baseQuantity: 1, rarity: LootRarity.COMMON, icon: '/images/flawless_aquamarine_gem.png', value: 1700000 },
    { id: 'refined_umber_2', name: 'Refined Umber', weight: 80, baseQuantity: 2, rarity: LootRarity.COMMON, icon: '/images/refined_umber.png', value: 1600000 },
    { id: 'refined_tungsten_2', name: 'Refined Tungsten', weight: 80, baseQuantity: 2, rarity: LootRarity.COMMON, icon: '/images/refined_tungsten.png', value: 1700000 },
    { id: 'glacite_amalgamation_2', name: 'Glacite Amalgamation', weight: 80, baseQuantity: 2, rarity: LootRarity.COMMON, icon: '/images/glacite_amalgamation.png', value: 1100000 },
    { id: 'umber_key_1', name: 'Umber Key', weight: 100, baseQuantity: 1, rarity: LootRarity.COMMON, icon: '/images/enchanted_dead_bush.gif', value: 2000000 },
    { id: 'tungsten_key_1', name: 'Tungsten Key', weight: 100, baseQuantity: 1, rarity: LootRarity.COMMON, icon: '/images/enchanted_lever.gif', value: 1850000 },
    { id: 'blue_goblin_egg_2', name: 'Blue Goblin Egg', weight: 140, baseQuantity: 2, rarity: LootRarity.COMMON, icon: '/images/squid_spawn_egg.png', value: 1100000 },
    { id: 'suspicious_scrap_4', name: 'Suspicious Scrap', weight: 150, baseQuantity: 4, rarity: LootRarity.COMMON, icon: '/images/suspicious_scrap.png', value: 200000 },
    { id: 'ice_cold_1', name: 'Ice Cold I', weight: 150, baseQuantity: 1, rarity: LootRarity.COMMON, icon: '/images/enchanted_book.png', value: 5750000 },
    { id: 'bejeweled_handle_4', name: 'Bejeweled Handle', weight: 150, baseQuantity: 4, rarity: LootRarity.COMMON, icon: '/images/enchanted_stick.gif', value: 300000 },
];

export const TOTAL_WEIGHT = DEFAULT_LOOT_TABLE.reduce((sum, item) => sum + item.weight, 0); // Should be 2399

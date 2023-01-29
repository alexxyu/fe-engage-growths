type Unit = {
	base_class: string;
	base_level: number;
	base_stats: number[];
	growth_rates: number[];
	max_stat_modifiers: number[];
};

type Class = {
	base_stats: number[];
	growth_rates: number[];
	max_stats: number[];
	is_base_class: boolean;
};

export const units: Record<string, Unit> = {
	Alear: {
		base_level: 1,
		base_class: 'Dragon Child',
		base_stats: [22, 6, 0, 5, 7, 5, 3, 5, 4],
		growth_rates: [60, 35, 20, 45, 50, 40, 25, 25, 5],
		max_stat_modifiers: [0, 1, 0, 1, 1, 0, 0, 0, 0]
	},
	Vander: {
		base_level: 1,
		base_class: 'Paladin',
		base_stats: [40, 11, 5, 10, 8, 10, 8, 6, 8],
		growth_rates: [60, 25, 10, 25, 35, 35, 20, 10, 5],
		max_stat_modifiers: [0, 1, -1, 1, -2, 3, -2, 0, 0]
	},
	Clanne: {
		base_level: 1,
		base_class: 'Mage',
		base_stats: [19, 1, 8, 11, 9, 4, 7, 4, 4],
		growth_rates: [40, 35, 10, 40, 50, 30, 25, 20, 5],
		max_stat_modifiers: [0, 1, -1, 2, 2, -2, -1, 0, 0]
	},
	Framme: {
		base_level: 1,
		base_class: 'Martial Monk',
		base_stats: [18, 3, 5, 8, 7, 4, 8, 5, 3],
		growth_rates: [55, 30, 25, 35, 55, 25, 30, 25, 0],
		max_stat_modifiers: [0, 0, 1, -1, 2, -1, -1, 1, 0]
	},
	Alfred: {
		base_level: 5,
		base_class: 'Noble',
		base_stats: [27, 9, 2, 10, 6, 8, 5, 8, 6],
		growth_rates: [65, 40, 5, 35, 40, 40, 20, 40, 10],
		max_stat_modifiers: [0, 2, -1, 1, 0, 2, -2, -1, 0]
	},
	Etie: {
		base_level: 4,
		base_class: 'Archer',
		base_stats: [21, 10, 0, 11, 6, 3, 2, 8, 4],
		growth_rates: [45, 40, 0, 25, 35, 25, 30, 25, 5],
		max_stat_modifiers: [0, 2, -2, 2, 0, 0, -1, -1, 0]
	},
	Boucheron: {
		base_level: 4,
		base_class: 'Axe Fighter',
		base_stats: [29, 10, 0, 8, 7, 6, 3, 5, 9],
		growth_rates: [85, 20, 0, 50, 45, 35, 20, 15, 20],
		max_stat_modifiers: [0, 1, 0, 2, 2, -2, 0, -2, 0]
	},
	Céline: {
		base_level: 5,
		base_class: 'Noble',
		base_stats: [22, 7, 9, 9, 10, 5, 7, 11, 4],
		growth_rates: [50, 35, 25, 30, 45, 30, 40, 50, 5],
		max_stat_modifiers: [0, -2, 2, -2, 1, -3, 1, 3, 0]
	},
	Chloé: {
		base_level: 6,
		base_class: 'Lance Flier',
		base_stats: [26, 8, 4, 13, 13, 5, 9, 10, 5],
		growth_rates: [75, 25, 35, 40, 55, 30, 25, 25, 5],
		max_stat_modifiers: [0, -2, 1, 0, 3, -1, 0, 0, 0]
	},
	Louis: {
		base_level: 6,
		base_class: 'Lance Armor',
		base_stats: [30, 13, 0, 11, 3, 16, 1, 4, 8],
		growth_rates: [75, 40, 0, 25, 25, 50, 20, 25, 15],
		max_stat_modifiers: [0, 1, 0, -1, -2, 3, -2, 1, 0]
	},
	Yunaka: {
		base_level: 6,
		base_class: 'Thief',
		base_stats: [25, 8, 5, 14, 12, 9, 7, 8, 5],
		growth_rates: [50, 35, 25, 40, 45, 15, 45, 25, 5],
		max_stat_modifiers: [0, -1, 0, 1, 2, -2, 2, -1, 0]
	},
	Alcryst: {
		base_level: 10,
		base_class: 'Lord',
		base_stats: [28, 11, 2, 17, 12, 8, 5, 8, 6],
		growth_rates: [65, 30, 10, 40, 45, 30, 20, 15, 10],
		max_stat_modifiers: [0, 1, -1, 3, 0, 1, -2, -1, 0]
	},
	Citrinne: {
		base_level: 10,
		base_class: 'Mage',
		base_stats: [24, 2, 15, 13, 10, 3, 12, 10, 4],
		growth_rates: [45, 10, 40, 25, 30, 20, 40, 25, 5],
		max_stat_modifiers: [0, -1, 3, 0, -1, -2, 2, 0, 0]
	},
	Lapis: {
		base_level: 10,
		base_class: 'Sword Fighter',
		base_stats: [26, 11, 2, 12, 14, 7, 6, 7, 5],
		growth_rates: [55, 25, 20, 35, 55, 35, 30, 25, 5],
		max_stat_modifiers: [0, -2, -2, 2, 3, 0, 0, 0, 0]
	},
	Diamant: {
		base_level: 11,
		base_class: 'Lord',
		base_stats: [32, 13, 3, 13, 13, 10, 6, 10, 9],
		growth_rates: [75, 30, 15, 20, 40, 40, 25, 20, 15],
		max_stat_modifiers: [0, 2, -1, -1, 0, 2, -1, 0, 0]
	},
	Amber: {
		base_level: 11,
		base_class: 'Lance Cavalier',
		base_stats: [31, 15, 2, 13, 11, 9, 3, 9, 8],
		growth_rates: [65, 45, 0, 25, 30, 35, 5, 35, 15],
		max_stat_modifiers: [0, 2, -1, -1, -1, 1, -1, 1, 0]
	},
	Jade: {
		base_level: 12,
		base_class: 'Axe Armor',
		base_stats: [33, 14, 4, 14, 5, 18, 6, 5, 8],
		growth_rates: [55, 35, 25, 35, 30, 40, 30, 20, 10],
		max_stat_modifiers: [0, 1, -1, 0, 0, 2, 0, -1, 0]
	},
	Ivy: {
		base_level: 17,
		base_class: 'Wing Tamer',
		base_stats: [32, 7, 17, 15, 13, 12, 15, 4, 7],
		growth_rates: [55, 25, 30, 25, 40, 30, 35, 15, 10],
		max_stat_modifiers: [0, 0, 2, -2, 0, 2, 2, -3, 0]
	},
	Kagetsu: {
		base_level: 1,
		base_class: 'Swordmaster',
		base_stats: [35, 17, 5, 22, 22, 14, 10, 17, 9],
		growth_rates: [60, 30, 15, 50, 50, 40, 25, 40, 10],
		max_stat_modifiers: [0, -1, -1, 2, 2, 0, -2, 1, 0]
	},
	Zelkov: {
		base_level: 17,
		base_class: 'Thief',
		base_stats: [35, 15, 3, 19, 19, 14, 5, 7, 9],
		growth_rates: [65, 35, 15, 40, 35, 35, 15, 25, 10],
		max_stat_modifiers: [0, 0, -1, 2, 0, 0, -1, 1, 0]
	},
	Fogado: {
		base_level: 17,
		base_class: 'Sentinel',
		base_stats: [33, 12, 7, 17, 18, 10, 11, 8, 8],
		growth_rates: [60, 30, 25, 30, 55, 30, 35, 25, 10],
		max_stat_modifiers: [0, -1, -1, 0, 3, -1, 1, 0, 0]
	},
	Pandreo: {
		base_level: 1,
		base_class: 'High Priest',
		base_stats: [34, 7, 16, 18, 17, 8, 22, 14, 8],
		growth_rates: [60, 5, 30, 45, 45, 15, 55, 30, 15],
		max_stat_modifiers: [0, -3, 2, 0, -1, -2, 3, 2, 0]
	},
	Bunet: {
		base_level: 1,
		base_class: 'Great Knight',
		base_stats: [41, 15, 5, 15, 9, 20, 8, 13, 11],
		growth_rates: [65, 30, 10, 40, 35, 45, 25, 40, 10],
		max_stat_modifiers: [0, 1, -3, 1, 0, 2, -1, 1, 0]
	},
	Timerra: {
		base_level: 18,
		base_class: 'Sentinel',
		base_stats: [35, 14, 6, 17, 18, 16, 8, 10, 5],
		growth_rates: [55, 25, 25, 45, 45, 30, 30, 30, 10],
		max_stat_modifiers: [0, -1, -1, 3, 0, 2, -3, 1, 0]
	},
	Panette: {
		base_level: 1,
		base_class: 'Berserker',
		base_stats: [46, 25, 3, 19, 13, 11, 7, 11, 11],
		growth_rates: [75, 45, 10, 40, 25, 30, 15, 20, 15],
		max_stat_modifiers: [0, 3, -1, 0, 0, 0, -1, 0, 0]
	},
	Merrin: {
		base_level: 1,
		base_class: 'Wolf Knight',
		base_stats: [36, 15, 10, 21, 21, 12, 12, 14, 9],
		growth_rates: [55, 25, 25, 40, 50, 30, 30, 25, 10],
		max_stat_modifiers: [0, -1, -1, 1, 2, -1, 0, 1, 0]
	},
	Hortensia: {
		base_level: 19,
		base_class: 'Wing Tamer',
		base_stats: [27, 5, 12, 21, 19, 6, 23, 17, 5],
		growth_rates: [40, 20, 20, 35, 50, 25, 55, 50, 0],
		max_stat_modifiers: [0, -2, 0, 0, 1, -3, 3, 2, 0]
	},
	Seadall: {
		base_level: 15,
		base_class: 'Dancer',
		base_stats: [33, 12, 4, 15, 16, 10, 10, 11, 8],
		growth_rates: [55, 25, 15, 25, 50, 25, 25, 35, 10],
		max_stat_modifiers: [0, 0, -2, -1, 2, 0, 0, 2, 0]
	},
	Rosado: {
		base_level: 3,
		base_class: 'Wyvern Knight',
		base_stats: [44, 16, 7, 19, 21, 15, 11, 8, 8],
		growth_rates: [75, 45, 25, 40, 45, 30, 30, 20, 5],
		max_stat_modifiers: [0, 3, -2, 1, 0, 1, -2, 0, 0]
	},
	Goldmary: {
		base_level: 3,
		base_class: 'Hero',
		base_stats: [40, 17, 2, 18, 20, 20, 12, 13, 9],
		growth_rates: [65, 30, 5, 25, 25, 55, 25, 25, 5],
		max_stat_modifiers: [0, 1, -3, 0, 0, 2, -1, 2, 0]
	},
	Lindon: {
		base_level: 5,
		base_class: 'Sage',
		base_stats: [38, 8, 19, 21, 19, 12, 21, 8, 10],
		growth_rates: [65, 25, 25, 25, 40, 25, 40, 15, 10],
		max_stat_modifiers: [0, 0, 2, -1, 0, -2, 2, 0, 0]
	},
	Saphir: {
		base_level: 7,
		base_class: 'Warrior',
		base_stats: [51, 24, 2, 23, 19, 19, 9, 15, 15],
		growth_rates: [80, 35, 0, 25, 30, 30, 5, 20, 10],
		max_stat_modifiers: [0, 2, -2, 0, 1, 1, -2, 0, 0]
	},
	Veyle: {
		base_level: 35,
		base_class: 'Fell Child',
		base_stats: [35, 20, 26, 24, 23, 17, 29, 18, 7],
		growth_rates: [40, 25, 45, 35, 30, 25, 35, 20, 0],
		max_stat_modifiers: [0, 0, 3, 0, -1, 0, 3, -2, 0]
	},
	Mauvier: {
		base_level: 12,
		base_class: 'Royal Knight',
		base_stats: [51, 21, 23, 25, 22, 26, 24, 16, 12],
		growth_rates: [70, 35, 40, 40, 35, 50, 45, 15, 15],
		max_stat_modifiers: [0, 1, 2, 1, -2, 1, 1, -2, 0]
	},
	Anna: {
		base_level: 5,
		base_class: 'Axe Fighter',
		base_stats: [29, 10, 2, 9, 7, 4, 5, 3, 7],
		growth_rates: [55, 15, 50, 50, 50, 20, 35, 45, 5],
		max_stat_modifiers: [0, 0, 1, 1, 1, -2, -1, 1, 0]
	},
	Jean: {
		base_level: 1,
		base_class: 'Martial Monk',
		base_stats: [19, 4, 5, 10, 7, 4, 8, 3, 3],
		growth_rates: [50, 20, 20, 35, 40, 25, 20, 25, 5],
		max_stat_modifiers: [0, 0, 2, -1, -1, 0, 0, 1, 0]
	}
};

export const classes: Record<string, Class> = {
	'Sword Fighter': {
		base_stats: [20, 5, 0, 7, 8, 3, 2, 2, 5],
		growth_rates: [10, 10, 0, 15, 20, 0, 15, 10, 0],
		max_stats: [67, 40, 20, 37, 41, 27, 22, 33, 12],
		is_base_class: true
	},
	Swordmaster: {
		base_stats: [21, 6, 1, 9, 11, 4, 3, 4, 6],
		growth_rates: [10, 10, 0, 15, 20, 0, 15, 15, 0],
		max_stats: [67, 40, 25, 44, 49, 27, 26, 37, 12],
		is_base_class: false
	},
	Hero: {
		base_stats: [23, 8, 0, 8, 9, 5, 2, 3, 7],
		growth_rates: [15, 15, 0, 10, 15, 0, 10, 15, 0],
		max_stats: [75, 45, 20, 37, 41, 34, 22, 33, 16],
		is_base_class: false
	},
	'Lance Fighter': {
		base_stats: [23, 7, 2, 8, 6, 4, 2, 2, 5],
		growth_rates: [10, 10, 5, 20, 5, 10, 5, 0, 0],
		max_stats: [69, 43, 29, 47, 36, 28, 25, 25, 12],
		is_base_class: true
	},
	Halberdier: {
		base_stats: [24, 9, 1, 9, 7, 6, 2, 3, 6],
		growth_rates: [10, 15, 5, 20, 10, 15, 5, 5, 0],
		max_stats: [76, 46, 29, 47, 36, 35, 25, 25, 15],
		is_base_class: false
	},
	'Royal Knight': {
		base_stats: [23, 7, 5, 9, 8, 5, 4, 5, 6],
		growth_rates: [5, 10, 15, 15, 15, 5, 20, 10, 0],
		max_stats: [69, 43, 39, 47, 40, 28, 36, 32, 12],
		is_base_class: false
	},
	'Axe Fighter': {
		base_stats: [26, 9, 0, 5, 5, 3, 1, 1, 7],
		growth_rates: [25, 20, 0, 5, 10, 5, 0, 0, 5],
		max_stats: [94, 46, 17, 23, 29, 20, 11, 23, 20],
		is_base_class: true
	},
	Berserker: {
		base_stats: [29, 13, 0, 6, 6, 3, 2, 2, 9],
		growth_rates: [30, 30, 0, 5, 10, 5, 0, 0, 10],
		max_stats: [96, 49, 17, 23, 29, 20, 11, 23, 24],
		is_base_class: false
	},
	Warrior: {
		base_stats: [27, 12, 1, 7, 7, 4, 3, 2, 8],
		growth_rates: [25, 20, 0, 10, 15, 10, 5, 0, 5],
		max_stats: [94, 46, 20, 30, 33, 27, 18, 23, 20],
		is_base_class: false
	},
	Archer: {
		base_stats: [19, 6, 0, 9, 5, 2, 1, 2, 4],
		growth_rates: [10, 15, 0, 25, 10, 5, 0, 5, 0],
		max_stats: [68, 38, 20, 45, 32, 23, 24, 28, 14],
		is_base_class: true
	},
	Sniper: {
		base_stats: [22, 8, 1, 11, 6, 3, 1, 3, 5],
		growth_rates: [15, 15, 0, 30, 10, 10, 0, 10, 0],
		max_stats: [68, 45, 20, 52, 32, 29, 24, 28, 14],
		is_base_class: false
	},
	'Bow Knight': {
		base_stats: [22, 7, 2, 10, 8, 3, 3, 3, 5],
		growth_rates: [10, 10, 0, 20, 20, 0, 15, 15, 0],
		max_stats: [68, 38, 23, 45, 37, 23, 29, 30, 14],
		is_base_class: false
	},
	'Sword Armor': {
		base_stats: [25, 8, 0, 6, 1, 12, 0, 2, 7],
		growth_rates: [20, 15, 0, 10, 0, 30, 0, 0, 5],
		max_stats: [75, 42, 16, 39, 17, 51, 16, 25, 20],
		is_base_class: true
	},
	'Lance Armor': {
		base_stats: [25, 8, 0, 6, 1, 12, 0, 2, 7],
		growth_rates: [20, 15, 0, 10, 0, 30, 0, 0, 5],
		max_stats: [75, 42, 16, 39, 17, 51, 16, 25, 20],
		is_base_class: true
	},
	'Axe Armor': {
		base_stats: [25, 8, 0, 6, 1, 12, 0, 2, 7],
		growth_rates: [20, 15, 0, 10, 0, 30, 0, 0, 5],
		max_stats: [75, 42, 16, 39, 17, 51, 16, 25, 20],
		is_base_class: true
	},
	General: {
		base_stats: [28, 11, 1, 7, 2, 14, 1, 3, 10],
		growth_rates: [25, 20, 0, 10, 0, 30, 0, 0, 10],
		max_stats: [86, 47, 16, 39, 17, 55, 16, 25, 25],
		is_base_class: false
	},
	'Great Knight': {
		base_stats: [26, 9, 2, 8, 5, 13, 2, 3, 8],
		growth_rates: [20, 15, 0, 15, 0, 25, 10, 5, 5],
		max_stats: [75, 42, 19, 43, 25, 51, 22, 30, 20],
		is_base_class: false
	},
	'Sword Cavalier': {
		base_stats: [23, 6, 1, 8, 7, 4, 2, 2, 6],
		growth_rates: [10, 10, 0, 10, 10, 10, 10, 10, 0],
		max_stats: [69, 40, 21, 41, 37, 27, 29, 30, 12],
		is_base_class: true
	},
	'Lance Cavalier': {
		base_stats: [23, 6, 1, 8, 7, 4, 2, 2, 6],
		growth_rates: [10, 10, 0, 10, 10, 10, 10, 10, 0],
		max_stats: [69, 40, 21, 41, 37, 27, 29, 30, 12],
		is_base_class: true
	},
	'Axe Cavalier': {
		base_stats: [23, 6, 1, 8, 7, 4, 2, 2, 6],
		growth_rates: [10, 10, 0, 10, 10, 10, 10, 10, 0],
		max_stats: [69, 40, 21, 41, 37, 27, 29, 30, 12],
		is_base_class: true
	},
	Paladin: {
		base_stats: [25, 8, 2, 10, 8, 6, 3, 3, 7],
		growth_rates: [15, 15, 0, 10, 15, 15, 15, 10, 0],
		max_stats: [77, 45, 21, 45, 37, 35, 29, 30, 16],
		is_base_class: false
	},
	'Wolf Knight': {
		base_stats: [23, 6, 3, 9, 10, 4, 4, 4, 6],
		growth_rates: [10, 5, 0, 15, 20, 5, 20, 20, 0],
		max_stats: [69, 40, 26, 41, 45, 27, 33, 34, 12],
		is_base_class: false
	},
	Mage: {
		base_stats: [18, 1, 7, 6, 6, 1, 7, 2, 4],
		growth_rates: [0, 0, 25, 5, 0, 0, 25, 5, 0],
		max_stats: [43, 26, 40, 28, 30, 20, 40, 24, 11],
		is_base_class: true
	},
	Sage: {
		base_stats: [20, 1, 9, 8, 7, 3, 9, 3, 5],
		growth_rates: [0, 0, 30, 5, 0, 0, 30, 15, 0],
		max_stats: [43, 26, 48, 34, 30, 20, 44, 30, 11],
		is_base_class: false
	},
	'Mage Knight': {
		base_stats: [21, 5, 7, 8, 9, 3, 8, 2, 6],
		growth_rates: [5, 5, 25, 0, 5, 10, 25, 5, 0],
		max_stats: [47, 35, 40, 28, 32, 26, 40, 24, 12],
		is_base_class: false
	},
	'Martial Monk': {
		base_stats: [18, 3, 5, 6, 5, 3, 8, 3, 3],
		growth_rates: [0, 10, 25, 0, 0, 10, 20, 10, 0],
		max_stats: [55, 28, 41, 26, 28, 20, 39, 29, 13],
		is_base_class: true
	},
	'Martial Master': {
		base_stats: [22, 6, 5, 6, 5, 4, 7, 4, 6],
		growth_rates: [5, 10, 20, 0, 0, 15, 25, 10, 0],
		max_stats: [66, 38, 41, 26, 28, 27, 39, 29, 15],
		is_base_class: false
	},
	'High Priest': {
		base_stats: [20, 3, 8, 8, 6, 3, 10, 5, 4],
		growth_rates: [0, 0, 25, 0, 5, 0, 30, 30, 0],
		max_stats: [55, 28, 45, 31, 32, 20, 48, 38, 13],
		is_base_class: false
	},
	'Sword Flier': {
		base_stats: [21, 5, 2, 7, 9, 3, 7, 3, 4],
		growth_rates: [5, 10, 5, 10, 10, 0, 10, 10, 0],
		max_stats: [68, 40, 31, 43, 38, 27, 22, 25, 14],
		is_base_class: true
	},
	'Lance Flier': {
		base_stats: [21, 5, 2, 7, 9, 3, 7, 3, 4],
		growth_rates: [5, 10, 5, 10, 10, 0, 10, 10, 0],
		max_stats: [68, 40, 31, 43, 38, 27, 22, 25, 14],
		is_base_class: true
	},
	'Axe Flier': {
		base_stats: [21, 5, 2, 7, 9, 3, 7, 3, 4],
		growth_rates: [5, 10, 5, 10, 10, 0, 10, 10, 0],
		max_stats: [68, 40, 31, 43, 38, 27, 22, 25, 14],
		is_base_class: true
	},
	'Griffin Knight': {
		base_stats: [22, 7, 3, 10, 11, 4, 9, 5, 5],
		growth_rates: [0, 10, 15, 15, 20, 0, 15, 15, 0],
		max_stats: [68, 40, 37, 48, 49, 27, 35, 35, 14],
		is_base_class: false
	},
	'Wyvern Knight': {
		base_stats: [25, 9, 1, 8, 9, 6, 5, 3, 6],
		growth_rates: [20, 20, 0, 10, 5, 20, 5, 5, 5],
		max_stats: [83, 46, 31, 43, 38, 35, 22, 25, 18],
		is_base_class: false
	},
	Thief: {
		base_stats: [22, 5, 0, 10, 10, 6, 2, 2, 4],
		growth_rates: [5, 10, 0, 20, 15, 15, 5, 15, 0],
		max_stats: [60, 43, 22, 51, 42, 33, 23, 30, 13],
		is_base_class: false
	}
};

export const exclusive_classes: Record<string, Record<string, Class>> = {
	Alear: {
		'Dragon Child': {
			base_stats: [22, 6, 0, 2, 7, 5, 3, 2, 4],
			growth_rates: [10, 10, 0, 10, 15, 10, 10, 5, 5],
			max_stats: [68, 41, 25, 36, 43, 35, 25, 35, 13],
			is_base_class: true
		},
		'Divine Dragon': {
			base_stats: [24, 8, 1, 4, 8, 6, 5, 3, 7],
			growth_rates: [10, 10, 0, 10, 15, 15, 15, 10, 5],
			max_stats: [68, 41, 25, 36, 43, 35, 25, 35, 13],
			is_base_class: false
		}
	},
	Veyle: {
		'Fell Child': {
			base_stats: [20, 3, 7, 4, 5, 2, 7, 3, 4],
			growth_rates: [10, 10, 25, 10, 5, 10, 25, 0, 0],
			max_stats: [48, 35, 48, 36, 33, 25, 41, 30, 11],
			is_base_class: false
		}
	},
	Alfred: {
		Noble: {
			base_stats: [24, 7, 2, 6, 5, 6, 4, 4, 6],
			growth_rates: [0, 5, 10, 5, 5, 5, 10, 20, 0],
			max_stats: [71, 45, 20, 33, 35, 37, 21, 45, 16],
			is_base_class: true
		},
		Avenir: {
			base_stats: [25, 8, 4, 7, 6, 8, 6, 6, 7],
			growth_rates: [15, 15, 0, 5, 10, 25, 5, 20, 5],
			max_stats: [71, 45, 20, 33, 35, 37, 21, 45, 16],
			is_base_class: false
		}
	},
	Celine: {
		Noble: {
			base_stats: [20, 5, 8, 5, 8, 3, 5, 4, 4],
			growth_rates: [0, 5, 10, 5, 5, 5, 10, 20, 0],
			max_stats: [56, 38, 37, 29, 41, 27, 35, 50, 11],
			is_base_class: true
		},
		Vidame: {
			base_stats: [21, 6, 9, 6, 9, 4, 6, 5, 5],
			growth_rates: [5, 10, 15, 5, 5, 5, 15, 20, 0],
			max_stats: [56, 38, 37, 29, 41, 27, 35, 50, 11],
			is_base_class: false
		}
	},
	Diamant: {
		Lord: {
			base_stats: [23, 8, 1, 7, 8, 5, 3, 3, 7],
			growth_rates: [10, 10, 0, 25, 10, 10, 0, 5, 0],
			max_stats: [77, 43, 23, 23, 38, 38, 20, 25, 20],
			is_base_class: true
		},
		Successeur: {
			base_stats: [25, 10, 2, 8, 9, 6, 3, 4, 8],
			growth_rates: [15, 20, 0, 10, 15, 15, 0, 10, 5],
			max_stats: [77, 43, 23, 23, 38, 38, 20, 25, 20],
			is_base_class: false
		}
	},
	Alcryst: {
		Lord: {
			base_stats: [21, 7, 1, 10, 7, 4, 3, 2, 5],
			growth_rates: [10, 10, 0, 25, 10, 10, 0, 5, 0],
			max_stats: [68, 41, 20, 41, 40, 29, 19, 30, 15],
			is_base_class: true
		},
		'Tireur d\u2019\u00e9lite': {
			base_stats: [22, 8, 1, 12, 8, 6, 4, 4, 6],
			growth_rates: [10, 10, 0, 30, 10, 15, 5, 5, 0],
			max_stats: [68, 41, 20, 41, 40, 29, 19, 30, 15],
			is_base_class: false
		}
	},
	Ivy: {
		'Wing Tamer': {
			base_stats: [20, 1, 8, 4, 4, 6, 8, 1, 5],
			growth_rates: [0, 0, 15, 10, 10, 0, 25, 10, 0],
			max_stats: [60, 31, 40, 25, 34, 31, 40, 20, 15],
			is_base_class: true
		},
		Lindwurm: {
			base_stats: [22, 2, 10, 5, 5, 8, 9, 1, 6],
			growth_rates: [5, 0, 25, 5, 0, 15, 25, 0, 0],
			max_stats: [60, 31, 40, 25, 34, 31, 40, 20, 15],
			is_base_class: false
		}
	},
	Hortensia: {
		'Wing Tamer': {
			base_stats: [18, 0, 5, 9, 8, 1, 11, 6, 4],
			growth_rates: [0, 0, 15, 10, 10, 0, 25, 10, 0],
			max_stats: [47, 26, 39, 36, 45, 19, 51, 53, 11],
			is_base_class: true
		},
		'Sleipnir Rider': {
			base_stats: [18, 1, 7, 10, 10, 2, 13, 8, 5],
			growth_rates: [0, 0, 20, 15, 15, 0, 30, 15, 0],
			max_stats: [47, 26, 39, 36, 45, 19, 51, 53, 11],
			is_base_class: false
		}
	},
	Timerra: {
		Sentinel: {
			base_stats: [24, 8, 1, 5, 7, 8, 1, 3, 4],
			growth_rates: [10, 5, 0, 15, 15, 5, 15, 0, 0],
			max_stats: [63, 35, 27, 47, 41, 33, 26, 37, 12],
			is_base_class: true
		},
		Picket: {
			base_stats: [25, 9, 2, 6, 9, 10, 3, 4, 5],
			growth_rates: [10, 15, 0, 10, 10, 20, 5, 5, 5],
			max_stats: [63, 35, 27, 47, 41, 33, 26, 37, 12],
			is_base_class: false
		}
	},
	Fogado: {
		Sentinel: {
			base_stats: [21, 5, 1, 9, 7, 4, 3, 2, 6],
			growth_rates: [10, 5, 0, 15, 15, 5, 15, 0, 0],
			max_stats: [67, 35, 28, 33, 49, 28, 31, 33, 16],
			is_base_class: true
		},
		Cupido: {
			base_stats: [23, 6, 3, 10, 8, 5, 5, 3, 7],
			growth_rates: [10, 5, 5, 20, 20, 5, 20, 0, 0],
			max_stats: [67, 35, 28, 33, 49, 28, 31, 33, 16],
			is_base_class: false
		}
	},
	Seadall: {
		Dancer: {
			base_stats: [21, 5, 1, 8, 8, 2, 5, 5, 5],
			growth_rates: [5, 10, 0, 5, 15, 10, 20, 20, 0],
			max_stats: [64, 36, 31, 29, 43, 24, 26, 39, 15],
			is_base_class: false
		}
	}
};

export const get_overall_growths = (unit_growths: number[], class_growths: number[]) =>
	unit_growths.map((g, i) => g + class_growths[i]);

export const get_class_growths = (unit_: string, class_: string) => {
	const mod = unit_ === 'Jean' ? 2 : 1;
	return (
		classes?.[class_]?.growth_rates.map((x) => x * mod) ??
		exclusive_classes[unit_][class_].growth_rates.map((x) => x * mod)
	);
};

export const get_class = (unit_: string, class_: string) => {
	return classes?.[class_] ?? exclusive_classes[unit_][class_];
};

export const get_available_class_names = (unit_: string) => {
	return [
		...Object.keys(exclusive_classes?.[unit_] ?? {}).filter(
			(name) => exclusive_classes?.[unit_]?.[name]
		),
		...Object.keys(classes)
	];
};

export const get_max_level_of_class = (class_: string) => {
	return class_ === 'Dancer' || class_ == 'Thief' ? 40 : 20;
};

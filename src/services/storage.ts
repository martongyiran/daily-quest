/* eslint-disable @typescript-eslint/no-explicit-any */
const storagePrefix = 'dq';

const get = (storage: Storage, key: string): any => {
	const item = storage.getItem(`${storagePrefix}-${key}`);

	try {
		return JSON.parse(item || '');
	} catch {
		return item;
	}
};

const find = (
	storage: Storage,
	key: string,
	callback: (value?: any) => any
): any => {
	const item = get(storage, key);
	return callback(item);
};

const set = (storage: Storage, key: string, value: unknown): void => {
	storage.setItem(`${storagePrefix}-${key}`, JSON.stringify(value));
};

const transact = (
	storage: Storage,
	key: string,
	callback: (value: any) => any
): void => {
	const item = get(storage, key);
	set(storage, key, callback(item));
};

const update = (
	storage: Storage,
	key: string,
	value: Array<any> | Record<string, any>
): void => {
	transact(storage, key, (stored: any) => {
		if (Array.isArray(value)) {
			return stored?.concat(value);
		}

		return { ...stored, ...value };
	});
};

const remove = (storage: Storage, key: string | string[]): void => {
	if (Array.isArray(key)) {
		key.forEach((currentKey: string) => {
			storage.removeItem(`${storagePrefix}-${currentKey}`);
		});
	} else {
		storage.removeItem(`${storagePrefix}-${key}`);
	}
};

interface DQStorage {
	get: (key: string) => any;
	find: (key: string, callback: (value?: any) => any) => any;
	set: (key: string, value: unknown) => void;
	transact: (key: string, callback: (value: any) => any) => void;
	update: (key: string, value: Array<any> | Record<string, any>) => void;
	remove: (key: string | string[]) => void;
	getStats: () => Stat[];
	getQuests: () => Quest[];
	addQuest: (newQuest: Quest) => void;
	getCurrentLevel: () => number;
}

export const DQLocalStorage: DQStorage = {
	get: (...props) => get(localStorage, ...props),
	find: (...props) => find(localStorage, ...props),
	set: (...props) => set(localStorage, ...props),
	transact: (...props) => transact(localStorage, ...props),
	update: (...props) => update(localStorage, ...props),
	remove: (...props) => remove(localStorage, ...props),
	getStats: () => getStats(),
	getQuests: () => getQuests(),
	addQuest: (...props) => addQuest(...props),
	getCurrentLevel: () => getCurrentLevel(),
};

export interface Quest {
	name: string;
	lastComp: Date | null;
	completed: boolean;
	exp: number;
	completedCount: number;
	stat: string;
	description: string;
}

export interface Stat {
	type: string;
	level: number;
	allExp: number;
	currentExp: number;
	forNextLevel: number;
}

function calculateLevelAndNextExp(exp: number): {
	level: number;
	currentExp: number;
	nextExp: number;
} {
	let level = 0;
	let currentExpThreshold = 100;

	while (exp >= currentExpThreshold) {
		exp -= currentExpThreshold;
		level++;
		currentExpThreshold = Math.floor(currentExpThreshold * 1.5);
	}

	return {
		level,
		currentExp: exp,
		nextExp: currentExpThreshold - exp,
	};
}

const groupByStat = (quests: Quest[]) => {
	const grouped = quests.reduce<Record<string, Quest[]>>((grouped, quest) => {
		if (!grouped[quest.stat]) {
			grouped[quest.stat] = [];
		}
		grouped[quest.stat].push(quest);
		return grouped;
	}, {});

	return Object.values(grouped);
};

const getStats = (): Stat[] => {
	const quests: Quest[] = get(localStorage, 'quests');

	if (!quests) {
		set(localStorage, 'quests', []);
	}

	const result: Stat[] = [];

	const currentQuests = get(localStorage, 'quests') as Quest[];
	const grouppedQuests = groupByStat(currentQuests);

	grouppedQuests.forEach((element) => {
		let sumExp = 0;
		const statType = element[0].stat;
		element.forEach((item) => {
			sumExp += item.completedCount * item.exp;
		});

		const { level, currentExp, nextExp } = calculateLevelAndNextExp(sumExp);

		const stat: Stat = {
			type: statType,
			level: level,
			allExp: sumExp,
			currentExp: currentExp,
			forNextLevel: nextExp,
		};

		result.push(stat);
	});

	return result;
};

const addQuest = (newQuest: Quest): void => {
	const quests: Quest[] = get(localStorage, 'quests');

	if (!quests) {
		set(localStorage, 'quests', []);
	}

	const currentQuests = get(localStorage, 'quests') as Quest[];

	currentQuests.push(newQuest);

	set(localStorage, 'quests', currentQuests);
};

const getQuests = (): Quest[] => {
	const quests: Quest[] = get(localStorage, 'quests');

	if (!quests) {
		set(localStorage, 'quests', []);
	}

	const currentQuests = get(localStorage, 'quests') as Quest[];

	const result: Quest[] = currentQuests.map((item) => ({
		...item,
		completed:
			item.lastComp !== null &&
			new Date(item.lastComp!).getDate() === new Date().getDate(),
	}));

	return result;
};

const getCurrentLevel = (): number => {
	const stats = getStats();
	const sum = stats.reduce((sum, num) => sum + num.level, 0);

	return sum;
};

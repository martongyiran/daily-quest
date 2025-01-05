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
	getCurrentLevel: () => getCurrentLevel(),
};

export interface Quest {
	name: string;
	lastComp: Date | null;
	completed: boolean;
	exp: number;
	completedCount: number;
	stat: 'str' | 'int';
	description: string;
}

export interface Stat {
	type: 'str' | 'int';
	level: number;
	allExp: number;
	currentExp: number;
	forNextLevel: number;
}

const currentMonth = new Date().getMonth() + 1;

const baseQuests: Quest[] = [
	{
		name: 'Daily training',
		lastComp: null,
		completed: false,
		exp: 40,
		completedCount: 0,
		stat: 'str',
		description: `Csinálj \n${currentMonth * 8} fekvőtámaszt, \n${
			currentMonth * 8
		} felülést, \n${currentMonth * 8} gugolást, ${
			currentMonth * 100
		} taposást!`,
	},
	{
		name: 'Daily learning',
		lastComp: null,
		completed: false,
		exp: 40,
		completedCount: 0,
		stat: 'int',
		description: `Olvass el egy fejezetet, vagy nézz meg egy udemy sectiont!`,
	},
];

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

const getStats = (): Stat[] => {
	const quests: Quest[] = get(localStorage, 'quests');

	if (!quests) {
		set(localStorage, 'quests', baseQuests);
	}

	const [strQuest, intQuest] = get(localStorage, 'quests') as Quest[];

	const strExp = strQuest.completedCount * strQuest.exp;

	const {
		level: strLevel,
		currentExp: strCurrentExp,
		nextExp: strNextExp,
	} = calculateLevelAndNextExp(strExp);

	const strength: Stat = {
		type: 'str',
		level: strLevel,
		allExp: strExp,
		currentExp: strCurrentExp,
		forNextLevel: strNextExp,
	};

	const intExp = intQuest.completedCount * intQuest.exp;

	const {
		level: intLevel,
		currentExp: intCurrentExp,
		nextExp: intNextExp,
	} = calculateLevelAndNextExp(intExp);

	const intellect: Stat = {
		type: 'int',
		level: intLevel,
		allExp: intExp,
		currentExp: intCurrentExp,
		forNextLevel: intNextExp,
	};

	const result: Stat[] = [strength, intellect];

	return result;
};

const getQuests = (): Quest[] => {
	const quests: Quest[] = get(localStorage, 'quests');

	if (!quests) {
		set(localStorage, 'quests', baseQuests);
	}

	const currentQuests = get(localStorage, 'quests') as Quest[];

	const result: Quest[] = [];

	const strQuest = currentQuests.find((x) => x.stat === 'str')!;
	const intQuest = currentQuests.find((x) => x.stat === 'int')!;

	result.push({
		...strQuest,
		completed:
			strQuest.lastComp !== null &&
			new Date(strQuest.lastComp!).getDate() === new Date().getDate(),
	});

	result.push({
		...intQuest,
		completed:
			intQuest.lastComp !== null &&
			new Date(intQuest.lastComp!).getDate() === new Date().getDate(),
	});

	return result;
};

const getCurrentLevel = (): number => {
	const stats = getStats();
	const sum = stats.reduce((sum, num) => sum + num.level, 0);

	return sum;
};

import { useEffect, useState } from 'react';
import { Box, Grid2 } from '@mui/material';
import './App.css';
import { DQLocalStorage, Quest, Stat } from './services/storage';
import ProfileCard from './components/ProfileCard';
import StatCard from './components/StatCard';
import QuestCard from './components/QuestCard';

function App() {
	const [tabValue, setTabValue] = useState(0);

	const [level, setLevel] = useState<number>(0);
	const [stats, setStats] = useState<Stat[]>([]);
	const [quests, setQuests] = useState<Quest[]>([]);

	const loadData = () => {
		const cLvl = DQLocalStorage.getCurrentLevel();
		setLevel(cLvl);

		const stts = DQLocalStorage.getStats();
		setStats(stts);

		const qsts = DQLocalStorage.getQuests();
		setQuests(qsts);

		console.log(stts);
	};

	const completeQuest = (quest: Quest) => {
		let quests = DQLocalStorage.getQuests();
		quests = quests.filter((x) => x.name !== quest.name);

		const currentQuest: Quest = {
			...quest,
			lastComp: new Date(),
			completedCount: ++quest.completedCount,
		};

		quests.push(currentQuest);

		DQLocalStorage.set('quests', quests);
		loadData();
	};

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<Box sx={{ height: '18vh' }}>
				<ProfileCard level={level} />
			</Box>
			<Box sx={{ height: '70vh' }}>
				{tabValue === 0
					? stats.map((stat) => {
							return (
								<StatCard
									stat={stat}
									key={stat.type}
								/>
							);
					  })
					: quests.map((quest) => {
							return (
								<QuestCard
									quest={quest}
									onComplete={completeQuest}
									key={quest.name}
								/>
							);
					  })}
			</Box>
			<Grid2
				direction='row'
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					height: '12vh',
					borderTop: '1px solid #353535',
				}}
				container
			>
				<Grid2
					size={6}
					sx={{
						color: tabValue === 1 ? '#5e5e5e' : '#fff',
					}}
				>
					<span
						onClick={() => setTabValue(0)}
						style={{ padding: '4px 32px' }}
					>
						Stats
					</span>
				</Grid2>
				<Grid2
					size={6}
					sx={{
						color: tabValue === 0 ? '#5e5e5e' : '#fff',
					}}
				>
					<span
						onClick={() => setTabValue(1)}
						style={{ padding: '4px 32px' }}
					>
						Quests
					</span>
				</Grid2>
			</Grid2>
		</>
	);
}

export default App;

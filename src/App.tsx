import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import './App.css';
import { DQLocalStorage, Quest, Stat } from './services/storage';
import ProfileCard from './components/ProfileCard';
import StatCard from './components/StatCard';
import QuestCard from './components/QuestCard';
import NewQuestDialog from './components/NewQuestDialog';
import DeleteQuestDialog from './components/DeleteQuestDialog';

function App() {
	const [tabValue, setTabValue] = useState(0);

	const [level, setLevel] = useState<number>(0);
	const [stats, setStats] = useState<Stat[]>([]);
	const [quests, setQuests] = useState<Quest[]>([]);

	const [newQuestDialogOpen, setNewQuestDialogOpen] = useState<boolean>(false);
	const [deleteQuestDialogOpen, setDeleteQuestDialogOpen] =
		useState<boolean>(false);

	const loadData = () => {
		const cLvl = DQLocalStorage.getCurrentLevel();
		setLevel(cLvl);

		const stts = DQLocalStorage.getStats();
		setStats(stts);

		const qsts = DQLocalStorage.getQuests();
		setQuests(qsts);
	};

	const closeDialog = () => {
		setNewQuestDialogOpen(false);
		setDeleteQuestDialogOpen(false);
		loadData();
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
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				height: '100vh',
			}}
		>
			<Box
				sx={{
					height: '18vh',
					flexShrink: 0,
					marginBottom: '24px',
					paddingBottom: '16px',
					backgroundColor: '#242424',
				}}
			>
				<ProfileCard
					level={level}
					openNewQuestDialog={() => setNewQuestDialogOpen(true)}
					openDeleteQuestDialog={() => setDeleteQuestDialogOpen(true)}
				/>
			</Box>

			<Box
				sx={{
					flex: 1,
					overflowY: 'auto',
					padding: '16px 0',
				}}
			>
				{tabValue === 0
					? stats.map((stat) => (
							<StatCard
								stat={stat}
								key={stat.type}
							/>
					  ))
					: quests.map((quest) => (
							<QuestCard
								quest={quest}
								onComplete={completeQuest}
								key={quest.name}
							/>
					  ))}
			</Box>

			<Box
				sx={{
					position: 'sticky',
					bottom: 0,
					display: 'flex',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					height: '12vh',
					borderTop: '1px solid #242424',
					backgroundColor: '#333333',
					zIndex: 2,
				}}
			>
				<span
					onClick={() => setTabValue(0)}
					style={{
						color: tabValue === 1 ? '#5e5e5e' : '#fff',
						padding: '4px 32px',
						cursor: 'none',
						userSelect: 'none',
					}}
				>
					Stats
				</span>
				<span
					onClick={() => setTabValue(1)}
					style={{
						color: tabValue === 0 ? '#5e5e5e' : '#fff',
						padding: '4px 32px',
						cursor: 'none',
						userSelect: 'none',
					}}
				>
					Quests
				</span>
			</Box>

			{newQuestDialogOpen && (
				<NewQuestDialog
					open={newQuestDialogOpen}
					close={() => closeDialog()}
				/>
			)}

			{deleteQuestDialogOpen && (
				<DeleteQuestDialog
					open={deleteQuestDialogOpen}
					close={() => closeDialog()}
					quests={quests}
					refresh={() => loadData()}
				/>
			)}
		</Box>
	);
}

export default App;

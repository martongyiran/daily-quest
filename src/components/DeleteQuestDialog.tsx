import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material';
import { DQLocalStorage, Quest } from '../services/storage';
import { useState } from 'react';

interface DeleteQuestDialogProps {
	quests: Quest[];
	open: boolean;
	close: () => void;
	refresh: () => void;
}
const DeleteQuestDialog = ({
	quests,
	open,
	close,
	refresh,
}: DeleteQuestDialogProps) => {
	const [localQuests, setLocalQuests] = useState<Quest[]>(quests);

	const deleteQuest = (quest: Quest) => {
		const db_quests = localQuests.filter((x) => x.name !== quest.name);
		DQLocalStorage.set('quests', db_quests);
		setLocalQuests(db_quests);
		refresh();
	};

	return (
		<Dialog
			open={open}
			onClose={close}
		>
			<DialogTitle>Delete Quests</DialogTitle>
			<DialogContent
				sx={{
					flex: 1,
					overflowY: 'auto',
					padding: '16px 16px',
					maxHeight: '50vh',
					minWidth: '40vh',
				}}
			>
				{localQuests.map((quest) => {
					return (
						<span
							style={{ display: 'flex' }}
							key={quest.name}
						>
							<p>{quest.name}</p>
							<p
								style={{
									color: '#9c9c9c',
									marginLeft: 'auto',
								}}
								onClick={() => deleteQuest(quest)}
							>
								Delete
							</p>
						</span>
					);
				})}
			</DialogContent>
			<DialogActions>
				<Button onClick={close}>Close</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteQuestDialog;

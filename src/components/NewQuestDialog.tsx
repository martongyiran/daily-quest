import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
} from '@mui/material';
import { useState } from 'react';
import { DQLocalStorage, Quest } from '../services/storage';

interface NewQuestDialogProps {
	open: boolean;
	close: () => void;
}
const NewQuestDialog = ({ open, close }: NewQuestDialogProps) => {
	const [name, setName] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [stat, setStat] = useState<string>();
	const [exp, setExp] = useState<number>();

	const [error, setError] = useState<string>();

	const save = () => {
		if (!name || !description || !stat || !exp) {
			setError('All fields are required!');
			return;
		}

		const newQuest: Quest = {
			name: name,
			description: description,
			stat: stat,
			exp: exp,
			lastComp: null,
			completed: false,
			completedCount: 0,
		};

		DQLocalStorage.addQuest(newQuest);
		close();
	};

	return (
		<Dialog
			open={open}
			onClose={close}
		>
			<DialogTitle>Create Quest</DialogTitle>
			<DialogContent>
				<DialogContentText></DialogContentText>
				<TextField
					autoFocus
					required
					margin='dense'
					id='name'
					label='Quest name'
					type='text'
					fullWidth
					onChange={(e) => setName(e.target.value)}
					variant='outlined'
					error={!name && !!error}
				/>
				<TextField
					autoFocus
					required
					multiline
					margin='dense'
					id='description'
					label='Description'
					type='text'
					fullWidth
					onChange={(e) => setDescription(e.target.value)}
					variant='outlined'
					error={!description && !!error}
				/>
				<TextField
					autoFocus
					required
					margin='dense'
					id='stat'
					label='Stat type'
					type='text'
					fullWidth
					onChange={(e) => setStat(e.target.value)}
					variant='outlined'
					error={!stat && !!error}
				/>
				<TextField
					autoFocus
					required
					margin='dense'
					id='exp'
					label='Exp / completition'
					type='number'
					fullWidth
					onChange={(e) => setExp(Number(e.target.value))}
					variant='outlined'
					error={!exp && !!error}
				/>
				<p style={{ color: 'red' }}>{error !== undefined && error}</p>
			</DialogContent>
			<DialogActions>
				<Button onClick={close}>Cancel</Button>
				<Button onClick={save}>Save</Button>
			</DialogActions>
		</Dialog>
	);
};

export default NewQuestDialog;

import { Button, Card, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';

interface ProfileCardProps {
	level: number;
	openNewQuestDialog: () => void;
	openDeleteQuestDialog: () => void;
}
const ProfileCard = ({
	level,
	openNewQuestDialog,
	openDeleteQuestDialog,
}: ProfileCardProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const addNewQuest = () => {
		handleClose();
		openNewQuestDialog();
	};

	const deleteQuest = () => {
		handleClose();
		openDeleteQuestDialog();
	};

	return (
		<div
			style={{
				padding: '4px 8px',
			}}
		>
			<Card raised>
				<div
					style={{
						marginTop: '8px',
						marginRight: '8px',
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<Button
						id='basic-button'
						aria-controls={open ? 'basic-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
						onClick={handleClick}
						variant='outlined'
					>
						Settings
					</Button>
					<Menu
						id='basic-menu'
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						MenuListProps={{
							'aria-labelledby': 'basic-button',
						}}
					>
						<MenuItem
							onClick={addNewQuest}
							style={{ color: '#9c9c9c' }}
						>
							Add New Quest
						</MenuItem>
						<MenuItem
							onClick={deleteQuest}
							style={{ color: '#9c9c9c' }}
						>
							Delete Quest
						</MenuItem>
					</Menu>
				</div>

				<p style={{ color: '#fff' }}>Player</p>
				<p style={{ color: '#fff' }}>Total lvl. {level}</p>
			</Card>
		</div>
	);
};

export default ProfileCard;

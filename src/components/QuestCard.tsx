import { Button, Card, Grid2, Typography } from '@mui/material';
import { Quest } from '../services/storage';

interface QuestCardProps {
	quest: Quest;
	onComplete: (quest: Quest) => void;
}
const QuestCard = ({ quest, onComplete }: QuestCardProps) => {
	return (
		<div style={{ padding: '4px 8px' }}>
			<Card style={{ padding: '8px' }}>
				<Grid2
					container
					direction='row'
					sx={{
						justifyContent: 'space-between',
						alignItems: 'flex-start',
					}}
					spacing={1}
				>
					<Grid2
						size={6}
						textAlign='start'
						style={{ color: '#fff' }}
					>
						{`${quest.name} (lvl. ${quest.completedCount})`}
					</Grid2>
					<Grid2
						size={6}
						textAlign='end'
					>
						<span
							style={{
								border: '1px solid #9c9c9c',
								borderRadius: '8px',
								padding: '2px 4px',
								margin: '2px',
								color: '#9c9c9c',
								width: '100%',
							}}
						>
							{quest.exp} exp
						</span>
					</Grid2>

					<Grid2
						size={12}
						textAlign='start'
					>
						<Typography
							style={{ color: '#9c9c9c', fontSize: '14px', margin: '8px 0' }}
						>
							{quest.description}
						</Typography>
					</Grid2>

					<Grid2 size={12}>
						<Button
							style={{ border: '1px solid', width: '50%' }}
							disabled={quest.completed}
							onClick={() => onComplete(quest)}
						>
							{quest.completed ? 'Done' : 'Complete'}
						</Button>
					</Grid2>
				</Grid2>
			</Card>
		</div>
	);
};

export default QuestCard;

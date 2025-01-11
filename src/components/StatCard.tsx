import { Card, Grid2 } from '@mui/material';
import { Stat } from '../services/storage';
import LinearProgressWithLabel from './LinearProgressWithLabel';

interface StatCardProps {
	stat: Stat;
}
const StatCard = ({ stat }: StatCardProps) => {
	const maxExp = stat.currentExp + stat.forNextLevel;
	const percentValue = (stat.currentExp / maxExp) * 100;

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
						{stat.type}
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
							lvl. {stat.level}
						</span>
					</Grid2>

					<Grid2 size={12}>
						<LinearProgressWithLabel value={percentValue} />
					</Grid2>

					<Grid2
						size={12}
						textAlign='start'
					>
						<span style={{ color: '#9c9c9c', fontSize: '12px' }}>
							Exp: {stat.currentExp} / {maxExp} (All: {stat.allExp})
						</span>
					</Grid2>
				</Grid2>
			</Card>
		</div>
	);
};

export default StatCard;

import { Card } from '@mui/material';

interface ProfileCardProps {
	level: number;
	openDialog: () => void;
}
const ProfileCard = ({ level, openDialog }: ProfileCardProps) => {
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
						display: 'flex',
						justifyContent: 'flex-end',
					}}
				>
					<span
						style={{
							border: '1px solid #9c9c9c',
							borderRadius: '8px',
							padding: '4px 4px',
							margin: '2px',
							marginRight: '16px',
							color: '#9c9c9c',
							width: '30%',
						}}
						onClick={openDialog}
					>
						+ Quest
					</span>
				</div>

				<p style={{ color: '#fff' }}>Player</p>
				<p style={{ color: '#fff' }}>Total lvl. {level}</p>
			</Card>
		</div>
	);
};

export default ProfileCard;

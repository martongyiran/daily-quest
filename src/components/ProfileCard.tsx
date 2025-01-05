import { Card } from '@mui/material';

interface ProfileCardProps {
	level: number;
}
const ProfileCard = ({ level }: ProfileCardProps) => {
	return (
		<div style={{ padding: '4px 8px' }}>
			<Card raised>
				<h1 style={{ color: '#fff' }}>Player</h1>
				<p style={{ color: '#fff' }}>Total lvl. {level}</p>
			</Card>
		</div>
	);
};

export default ProfileCard;

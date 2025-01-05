import {
	Box,
	LinearProgress,
	linearProgressClasses,
	LinearProgressProps,
	styled,
	Typography,
} from '@mui/material';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
	height: 10,
	borderRadius: 5,
	[`&.${linearProgressClasses.colorPrimary}`]: {
		backgroundColor: '#242424',
		...theme.applyStyles('dark', {
			backgroundColor: '#242424',
		}),
	},
	[`& .${linearProgressClasses.bar}`]: {
		borderRadius: 5,
		backgroundColor: '#9c9c9c',
		...theme.applyStyles('dark', {
			backgroundColor: '#9c9c9c',
		}),
	},
}));

function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number }
) {
	return (
		<Box sx={{ display: 'flex', alignItems: 'center' }}>
			<Box sx={{ width: '100%', mr: 1 }}>
				<BorderLinearProgress
					variant='determinate'
					{...props}
				/>
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography
					variant='body2'
					sx={{ color: '#9c9c9c' }}
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

export default LinearProgressWithLabel;

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#9c9c9c',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#242424',
		},
		background: {
			default: '#242424',
			paper: '#333333',
		},
	},
	typography: {
		fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
	},
});

export default theme;

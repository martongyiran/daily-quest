import { Route, Routes } from 'react-router';
import Home from '../pages/Home';

const Router = () => {
	return (
		<Routes>
			<Route
				index
				element={<Home />}
			/>
		</Routes>
	);
};

export default Router;

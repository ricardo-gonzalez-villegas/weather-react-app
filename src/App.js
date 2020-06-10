import React from 'react';
import './App.css';
import WeatherApp from './WeatherApp';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
	root: {
		width: '100vw',
		height: '100vh',
		backgroundImage:
			'linear-gradient( 0.2deg,  rgba(51,204,255,1) 4.8%, rgba(51,102,255,1) 85.5% )',
	},
});

function App() {
	const classes = styles();
	return (
		<div className={classes.root}>
			<WeatherApp className={classes.weather} />
		</div>
	);
}

export default App;

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Clouds from './svg/clouds.svg';
import High from './svg/high.svg';
import Humidity from './svg/humidity.svg';
import Low from './svg/low.svg';
import Mist from './svg/mist.svg';
import Rain from './svg/rain.svg';
import Shower from './svg/shower.svg';
import Snow from './svg/snow.svg';
import Sunny from './svg/sunny.svg';
import ThunderStorm from './svg/thunderstorm.svg';
import Wind from './svg/wind.svg';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = makeStyles({
	root: {
		display: 'flex',
		width: '100%',
		alignItems: 'center',
		flexDirection: 'column',
	},
	location: {
		margin: '20px 0px 10px 0px',
		color: 'white',
		textTransform: 'capitalize',
	},
	description: {
		color: 'white',
		textTransform: 'capitalize',
	},
	weather: {
		width: '150px',
		height: '150px',
	},
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		textAlign: 'center',
	},
	temp: {
		margin: '20px 0px',
		color: 'white',
	},
	icon: {
		width: '50px',
		height: '50px',
	},
	bottom: {
		marginTop: '30px',
		display: 'flex',
		width: '80%',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	mini: {
		display: 'flex',
		alignItems: 'center',
		color: 'white',
	},
	radio: {
		marginTop: '20px',
	},
});

const getIcon = weather => {
	switch (weather) {
		case 'Clear':
			return Sunny;

		case 'Clouds':
			return Clouds;

		case 'Rain':
			return Shower;

		case 'Drizzle':
			return Rain;

		case 'Thunderstorm':
			return ThunderStorm;

		case 'Snow':
			return Snow;

		case 'Mist' || 'Fog':
			return Mist;

		default:
			return;
	}
};

export default function Display({ data, location }) {
	const classes = styles();

	const [temperature, setTemperature] = useState('C');

	const {
		weather,
		description,
		humidity,
		tempC,
		tempMaxC,
		tempMinC,
		tempF,
		tempMaxF,
		tempMinF,
		windSpeed,
	} = data;

	const isCelsius = temperature === 'C';

	const symbol = isCelsius ? <span>&#x2103;</span> : <span>&#x2109;</span>;

	return (
		<div className={classes.root}>
			<Typography className={classes.location} variant='h3'>
				{location}
			</Typography>
			<div className={classes.container}>
				<img
					className={classes.weather}
					src={getIcon(weather)}
					alt={description}
				/>
				<Typography className={classes.description} variant='h4'>
					{description}
				</Typography>
			</div>
			<Typography className={classes.temp} variant='h3'>
				{isCelsius ? tempC : tempF} {symbol}
			</Typography>
			<div className={classes.radio}>
				<FormControl fullWidth component='fieldset'>
					<RadioGroup
						style={{ color: 'white' }}
						onChange={e => setTemperature(e.target.value)}
						row
						aria-label='temperature'
						name='temperature'
						defaultValue='C'
					>
						<FormControlLabel
							value='C'
							control={<Radio style={{ color: 'white' }} />}
							label='&#x2103;'
						/>
						<FormControlLabel
							value='F'
							control={<Radio style={{ color: 'white' }} />}
							label='&#x2109;'
						/>
					</RadioGroup>
				</FormControl>
			</div>
			<div className={classes.bottom}>
				<div className={classes.mini}>
					<img className={classes.icon} src={High} alt='High' />
					<Typography variant='h5'>
						{isCelsius ? tempMaxC : tempMaxF} {symbol}
					</Typography>
				</div>
				<div className={classes.mini}>
					<img className={classes.icon} src={Low} alt='Low' />
					<Typography variant='h5'>
						{isCelsius ? tempMinC : tempMinF} {symbol}
					</Typography>
				</div>
				<div className={classes.mini}>
					<img
						className={classes.icon}
						src={Humidity}
						alt='Humidity'
					/>
					<Typography variant='h5'>{humidity} %</Typography>
				</div>
				<div className={classes.mini}>
					<img className={classes.icon} src={Wind} alt='Wind' />
					<Typography variant='h5'>{windSpeed} km/h</Typography>
				</div>
			</div>
		</div>
	);
}

/* <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/"     title="Flaticon">www.flaticon.com</a></div> */

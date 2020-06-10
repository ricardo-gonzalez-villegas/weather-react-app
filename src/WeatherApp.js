import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Form from './Form';
import { Typography } from '@material-ui/core';
import useInputState from './hooks/useInputState';
import Gif from './Gif';
import Display from './Display';

const styles = makeStyles({
	root: {
		width: '100%',
		height: '100%',
	},
	weather: {
		width: '50%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		position: 'relative',
		float: 'left',
	},
	gif: {
		width: '50%',
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
		position: 'relative',
		float: 'right',
	},
	title: {
		margin: '10px 0px',
		color: 'white',
	},
	icon: {},
	temperature: {},
	buttons: {},
});
export default function WeatherApp() {
	const classes = styles();

	const [value, handleChange, reset] = useInputState();
	const [data, setData] = useState();
	const [link, setLink] = useState();
	const [location, setLocation] = useState();
	const [error, setError] = useState(false);

	const getWeather = async location => {
		try {
			setLocation(location);
			let response = await fetch(
				`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a6729dd8c63f1b1a8a5b086e16117da3`
			);
			let data = await response.json();

			let weather = data.weather[0].main;
			getGif(weather);

			let description = data.weather[0].description;
			let humidity = data.main.humidity;
			// temps are in kelvin by default
			let tempC = getCelsius(data.main.temp);
			let tempMaxC = getCelsius(data.main.temp_max);
			let tempMinC = getCelsius(data.main.temp_min);
			let tempF = getFahrenheit(data.main.temp);
			let tempMaxF = getFahrenheit(data.main.temp_max);
			let tempMinF = getFahrenheit(data.main.temp_min);
			// speed is in kmph
			let windSpeed = data.wind.speed;
			setData({
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
			});
			setError(false);
		} catch (error) {
			setError(true);
			setData();
			getGif('error');
		}
	};

	const getGif = async weather => {
		try {
			let response = await fetch(
				`https://api.giphy.com/v1/gifs/translate?api_key=oEV60zdH7ioYsTvpBOJuRJsOnrkOIcCL&s=${weather}`
			);
			response = await response.json();
			setLink(response.data.images.original.url);
		} catch (error) {
			throw new Error('There was an error finding a gif');
		}
	};

	const getCelsius = kelvin => {
		return Math.floor(kelvin - 273.15);
	};

	const getFahrenheit = kelvin => {
		return Math.floor((kelvin - 273.15) * (9 / 5) + 32);
	};

	return (
		<div className={classes.root}>
			<div className={classes.weather}>
				<Typography className={classes.title} variant='h2'>
					Weather App
				</Typography>
				<Form
					error={error}
					value={value}
					handleChange={handleChange}
					reset={reset}
					getWeather={getWeather}
				/>
				{data && <Display data={data} location={location} />}
			</div>
			<div className={classes.gif}>
				<Gif imgLink={link} />
			</div>
		</div>
	);
}

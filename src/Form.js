import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';

const styles = makeStyles({
	root: {
		display: 'flex',
		width: '80%',
		flexDirection: 'column',
	},
	form: {
		width: '100%',
	},
	error: {
		color: 'white',
	},
});

export default function Form({
	value,
	handleChange,
	reset,
	getWeather,
	error,
}) {
	const classes = styles();
	return (
		<div className={classes.root}>
			<form
				noValidate
				className={classes.form}
				onSubmit={e => {
					e.preventDefault();
					getWeather(value);
					reset();
				}}
			>
				<FormControl variant='filled' fullWidth>
					<InputLabel
						htmlFor='filled-adornment-password'
						style={{ color: 'white' }}
					>
						Enter Location
					</InputLabel>
					<FilledInput
						style={{ color: 'white' }}
						autoFocus
						id='filled-adornment-password'
						type='text'
						value={value}
						onChange={handleChange}
						endAdornment={
							<InputAdornment position='end'>
								<IconButton
									style={{ color: 'white' }}
									aria-label='toggle password visibility'
									edge='end'
								>
									<SearchIcon />
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
			</form>
			{error && (
				<Typography variant='h6' className={classes.error}>
					Error finding location. Please try again.
				</Typography>
			)}
		</div>
	);
}

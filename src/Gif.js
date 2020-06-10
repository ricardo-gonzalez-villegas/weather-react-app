import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
	root: {
		backgroundSize: 'cover',
		width: '100%',
		height: '100%',
	},
});

export default function Gif({ imgLink }) {
	const classes = styles();
	return (
		<div
			className={classes.root}
			style={{
				backgroundColor: 'white',
				backgroundImage: `url(${
					imgLink
						? imgLink
						: 'https://media.giphy.com/media/8F62ttKOw1FlXLn0QC/giphy.gif'
				})`,
			}}
		></div>
	);
}

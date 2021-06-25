import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { AppBar, Collapse, Grid, Paper, Tab, Tabs, withStyles } from '@material-ui/core';

import ConnConsequenceTypeMenuBar from './ConnConsequenceTypeMenuBar';
import ensemblCalculatedVariantConsequences from '../../../../models/ensembl-calculated-variant-consequences';


const ConsequenceBox = consequenceType => ({ filterConsequenceTypes, addFilterConsequenceType, removeFilterConsequenceType }) => {
	const present = filterConsequenceTypes.includes(consequenceType.id);
	const onChange = (_, checked) => {
		if (!!checked && !present) {
			addFilterConsequenceType(consequenceType.id);
		} else if (!checked && !!present) {
			removeFilterConsequenceType(consequenceType.id);
		}
	};
	return (
		<FormControlLabel
			control={
				<Checkbox checked={present} onChange={onChange} />
			}
			label={consequenceType.label}
		/>
	)
};


const CategoryPanel = category => ({ filterConsequenceTypes, addFilterConsequenceType, removeFilterConsequenceType }) => {
	const consequenceTypes = ensemblCalculatedVariantConsequences.filter(consequence => consequence.categories.includes(category));
	return (
		<Grid container justify="flex-start" alignItems="center">
			{
				consequenceTypes.map(consequenceType => {
					const ConsequenceTypeBox = ConsequenceBox(consequenceType);
					return (
						<Grid key={consequenceType.id} item xs={12} sm={6} md={4} style={{ textAlign: "left" }}>
							{
								<ConsequenceTypeBox
									filterConsequenceTypes={filterConsequenceTypes}
									addFilterConsequenceType={addFilterConsequenceType}
									removeFilterConsequenceType={removeFilterConsequenceType} />
							}
						</Grid>
					);
				})
			}
		</Grid>
	);
};


const ConsequenceTypeFilter = ({ classes, activeCategory, filterConsequenceTypes, addFilterConsequenceType, removeFilterConsequenceType }) => {
	const categories = ensemblCalculatedVariantConsequences.categories;
	return (
		<Paper>
			<ConnConsequenceTypeMenuBar />
			<Paper elevation={0} className={classes.container}>
				{
					Object.keys(categories).map(categoryName => {
						const category = categories[categoryName];
						const CategoryPanelRenderer = CategoryPanel(category);
						return (
							<Collapse key={categoryName} in={categoryName === activeCategory} mountOnEnter unmountOnExit>
								<CategoryPanelRenderer
									filterConsequenceTypes={filterConsequenceTypes}
									addFilterConsequenceType={addFilterConsequenceType}
									removeFilterConsequenceType={removeFilterConsequenceType}
								/>
							</Collapse>
						);
					})
				}
			</Paper>
		</Paper>
	);
};


ConsequenceTypeFilter.propTypes = {
	classes: PropTypes.object.isRequired,
	activeCategory: PropTypes.string.isRequired,
	filterConsequenceTypes: PropTypes.array.isRequired,
	addFilterConsequenceType: PropTypes.func.isRequired,
	removeFilterConsequenceType: PropTypes.func.isRequired,
};


const styles = theme => ({
	container: {
		...theme.mixins.gutters(),
	}
});


export default withStyles(styles)(ConsequenceTypeFilter);
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import ParentActions from '../../actions';
import ParentQuerist from '../../state-querist';

import ConnConsequenceCategoryCheckbox from './ConnConsequenceCategoryCheckbox';
import ensemblCalculatedVariantConsequences from '../../../../models/ensembl-calculated-variant-consequences';


const CategoryLabel = category => props => {
	const CategoryCheckbox = ConnConsequenceCategoryCheckbox(category);
	return (
		<React.Fragment>
			<CategoryCheckbox />
			{category.label}
		</React.Fragment>
	);
};



const ConsequenceTypeMenuBar = ({ activeCategory, selectCategory }) => {
	const categories = ensemblCalculatedVariantConsequences.categories;
	const categoryNames = Object.keys(categories);
	return (
		<AppBar position="static" color="secondary">
			<Tabs value={activeCategory} onChange={(event, value) => { selectCategory(value); }} scrollButtons="auto" indicatorColor="primary" variant="scrollable">
				{
					categoryNames.map(categoryName => {
						const category = categories[categoryName];
						const Label = CategoryLabel(category);
						return (
							<Tab key={categoryName} value={categoryName} label={
								<Label />
							} component="div" />

						);
					})
				}
			</Tabs>
		</AppBar>
	);
};


ConsequenceTypeMenuBar.propTypes = {
	activeCategory: PropTypes.string.isRequired,
	selectCategory: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
	activeCategory: ParentQuerist.param(state, "consequenceTypesCategory") || "LOSS_OF_FUNCTION",
});


const mapDispatchToProps = dispatch => ({
	selectCategory: category => {
		dispatch(ParentActions.setParam("consequenceTypesCategory", category));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(ConsequenceTypeMenuBar);

import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import ParentActions from '../../actions';
import ParentQuerist from '../../state-querist';


const MenuBar = ({ activeSubfilter, selectSubfilter }) => {
    const handleSelect = (event, value) => { selectSubfilter(value); };
    return (
	<AppBar position="static" color="secondary">
		<Tabs value={activeSubfilter}  onChange={handleSelect} scrollButtons="auto" indicatorColor="primary" variant="scrollable">
			<Tab value="regions" label="Chromosomal location" />
			{/*<Tab value="feature" label="Feature" />*/}
			{/*<Tab value="biotype" label="Biotype" />*/}
			<Tab value="variant-type" label="Variant type" />
		</Tabs>
	</AppBar>
	);
};


MenuBar.propTypes = {
	activeSubfilter: PropTypes.string.isRequired,
	selectSubfilter: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
	activeSubfilter: ParentQuerist.param(state, "genomicSubfilter") || "regions",
});


const mapDispatchToProps = dispatch => ({
	selectSubfilter: subfilter => {
		dispatch(ParentActions.setParam("genomicSubfilter", subfilter));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);

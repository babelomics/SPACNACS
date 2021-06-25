import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import ParentActions from '../../actions';
import ParentQuerist from '../../state-querist';


const MenuBar = ({ activeSubfilter, selectSubfilter }) => (
	<AppBar position="static" color="secondary">
		<Tabs value={activeSubfilter} onChange={(_, value) => { selectSubfilter(value); }} scrollButtons="auto" indicatorColor="primary" variant="scrollable">
			<Tab value="sift" label="SIFT" />
			<Tab value="polyphen" label="Polyphen" />
			<Tab value="cadd" label="CADD" />
		</Tabs>
	</AppBar>
);


MenuBar.propTypes = {
	activeSubfilter: PropTypes.string.isRequired,
	selectSubfilter: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
	activeSubfilter: ParentQuerist.param(state, "deleteriousnessSubfilter") || "sift",
});


const mapDispatchToProps = dispatch => ({
	selectSubfilter: subfilter => {
		dispatch(ParentActions.setParam("deleteriousnessSubfilter", subfilter));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);

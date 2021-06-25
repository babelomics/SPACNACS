import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import ParentActions from '../../actions';
import ParentQuerist from '../../state-querist';



const ConsequenceTypeMenuBar = ({ activeSection, selectSection }) => {
	const handleSelect = (event, value) => { selectSection(value); };
	return (
		<AppBar position="static" color="secondary">
			<Tabs value={activeSection} onChange={handleSelect}>
				<Tab value="clinvar-significance" label="ClinVar significance" />
				<Tab value="terms" label="Terms" />
			</Tabs>
		</AppBar>
	);
};


ConsequenceTypeMenuBar.propTypes = {
	activeSection: PropTypes.string.isRequired,
	selectSection: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
	activeSection: ParentQuerist.param(state, "clinicalActiveSection") || "clinvar-significance",
});


const mapDispatchToProps = dispatch => ({
	selectSection: section => {
		dispatch(ParentActions.setParam("clinicalActiveSection", section));
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(ConsequenceTypeMenuBar);

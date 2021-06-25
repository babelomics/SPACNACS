import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Collapse, Paper } from '@material-ui/core';

import ConnMenuBar from './ConnMenuBar';
import ConnClinicalSignificance from './ConnClincalSignificance';
import ConnHpoSelector from './ConnHpoSelector';
import ConnAnnotationSelector from './ConnAnnotationSelector';
import ParentQuerist from '../../state-querist';

const ClinicalFilter = props => (
	<Paper>
		<ConnMenuBar />
		<Collapse in={"clinvar-significance" === props.activeSection} mountOnEnter unmountOnExit>
			<ConnClinicalSignificance />
		</Collapse>
		<Collapse in={"terms" === props.activeSection} mountOnEnter unmountOnExit>
			{/*<ConnHpoSelector />*/}
			<ConnAnnotationSelector/>
		</Collapse>
	</Paper>
);


ClinicalFilter.propTypes = {
	activeSection: PropTypes.string.isRequired,
};


const mapStateToProps = state => ({
	activeSection: ParentQuerist.param(state, "clinicalActiveSection") || "clinvar-significance",
});


const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicalFilter);
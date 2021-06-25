import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

import ParentActions from '../../actions';
import ParentQuerist from '../../state-querist';
import populationFrequencyStudies from '../../../../common/population-frequency-studies';


const MenuBar = props => (

	<div>{
        populationFrequencyStudies.map(study => (
			<div> </div>
        ))
    }

        {/*<AppBar position="static" color="secondary">
		<Tabs value={props.activeStudy} onChange={(_, value) => { props.selectStudy(value); }} scrollButtons="auto" indicatorColor="primary" variant="scrollable">
			{
				populationFrequencyStudies.map(study => (
					<Tab key={study.id} value={study.id} label={study.label} />
				))
			}
		</Tabs>
	</AppBar>*/}
    </div>

);


MenuBar.propTypes = {
	activeStudy: PropTypes.string.isRequired,
	selectStudy: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
	activeStudy: ParentQuerist.param(state, "frequenciesStudy") || populationFrequencyStudies[0].id,
});


const mapDispatchToProps = dispatch => ({
	selectStudy: studyId => {
		if (populationFrequencyStudies.some(study => study.id === studyId)) {
			dispatch(ParentActions.setParam("frequenciesStudy", studyId));
		}
	},
});


export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);

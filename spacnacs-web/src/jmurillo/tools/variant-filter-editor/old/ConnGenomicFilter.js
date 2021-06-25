import { connect } from 'react-redux';

import GenomicFilter from './GenomicFilter';
import ParentQuerist from '../../state-querist';
import ParentActions from '../../actions';


const mapStateToProps = state => ({
	activeSubfilter: ParentQuerist.param(state, "genomicSubfilter") || "regions",
});


const mapDispatchToProps = dispatch => ({

	selectSubfilter: subfilter => {
		dispatch(ParentActions.setParam("genomicActiveSubfilter", subfilter));
	},

});


export default connect(mapStateToProps, mapDispatchToProps)(GenomicFilter);

import { connect } from 'react-redux';

import CaddFilter from './CaddFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';


const mapStateToProps = state => ({
	filterCaddRaw: VariantFilterQuerist.deleteriousness.caddRaw(state),
	filterCaddScaled: VariantFilterQuerist.deleteriousness.caddScaled(state),
});


const mapDispatchToProps = dispatch => ({
	setFilterCaddRaw: value => {
		dispatch(VariantFilterActions.deleteriousness.setCaddRaw(value));
	},
	setFilterCaddScaled: value => {
		dispatch(VariantFilterActions.deleteriousness.setCaddScaled(value));
	},
})


export default connect(mapStateToProps, mapDispatchToProps)(CaddFilter);

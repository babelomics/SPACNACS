import { connect } from 'react-redux';

import DeleteriousnessFilter from './DeleteriousnessFilter';
import ParentQuerist from '../../state-querist';

const mapStateToProps = state => ({
	activeSubfilter: ParentQuerist.param(state, "deleteriousnessSubfilter") || "sift",
});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(DeleteriousnessFilter);
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Actions from './actions';


const mapStateToProps = state => ({});


const mapDispatchToProps = dispatch => ({
    setTitle: title => {
        dispatch(Actions.setName(title));
    },

    setBreadcrumbs: breadcrumbs => {
        dispatch(Actions.setBreadcrumbs(breadcrumbs));
    },
});


const Tool = Component => connect(mapStateToProps, mapDispatchToProps)(Component);


Tool.propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    setTitle: PropTypes.func.isRequired,
    setBreadcrumbs: PropTypes.func.isRequired,
};


export default Tool;

// export default connect(mapStateToProps, mapDispatchToProps)(Tool);
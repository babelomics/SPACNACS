import { connect } from 'react-redux';

import PipelineFilter from './PipelineFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';

const mapStateToProps = state => ({
	filterPipeline: VariantFilterQuerist.genomic.pipeline(state)
});


const mapDispatchToProps = dispatch => ({
    addFilterPipeline: pipeline => {
        dispatch(VariantFilterActions.genomic.pipeline.add(pipeline));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(PipelineFilter);
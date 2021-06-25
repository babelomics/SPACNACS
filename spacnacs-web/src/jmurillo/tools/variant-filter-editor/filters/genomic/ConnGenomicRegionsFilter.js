import { connect } from 'react-redux';

import GenomicRegionsFilter from './GenomicRegionsFilter';
import VariantFilterActions from '../../../variant-filter/actions';
import VariantFilterQuerist from '../../../variant-filter/state-querist';
import InteractiveInterpretatorActions from "../../../interactive-interpretator/actions";

const mapStateToProps = state => ({
    regions: VariantFilterQuerist.genomic.genomicRegions(state),

});


const mapDispatchToProps = dispatch => ({
    addGenomicRegion: region => {
        dispatch(VariantFilterActions.search.cleanGene());
        dispatch(VariantFilterActions.genomic.genomicRegions.add(region));
        dispatch(InteractiveInterpretatorActions.variants.locusVariant(region));
    },
    removeGenomicRegion: region => {
        dispatch(VariantFilterActions.genomic.genomicRegions.remove(region));
    },
});


export default connect(mapStateToProps, mapDispatchToProps)(GenomicRegionsFilter);
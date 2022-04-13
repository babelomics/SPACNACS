import { connect } from 'react-redux';

import AnnotationGeneSelector from './AnnotationGeneSelector';
import VariantFilterActions from './../../../variant-filter/actions';
import VariantFilterQuerist from './../../../variant-filter/state-querist';
import VariantTableActions from './../../../interactive-interpretator/actions';
import InteractiveInterpretatorActions from "../../../interactive-interpretator/actions";


const annotationFields = [
    {
        id: "gene",
        label: "Gene",
    }
];

const mapStateToProps = state => ({
	//phenotypes: VariantFilterQuerist.clinical.phenotypes(state),
    annotationFields: annotationFields,
    search: VariantFilterQuerist.search.search(state),
    pageSize: 5,
    page: 0
});


const mapDispatchToProps = dispatch => ({
	removeAnnotation: (term) => {
		dispatch(VariantFilterActions.search.remove(term));
        // Reload page
        dispatch(VariantTableActions.clean());
	},
    addAnnotation: (term) => {
        if (term.annotationField === "all")
            dispatch(VariantFilterActions.search.set(term));
        else {
            // Remove other positions
            dispatch(VariantFilterActions.genomic.genomicRegions.clean());
            dispatch(VariantFilterActions.search.cleanGene());
            dispatch(VariantFilterActions.search.add(term));
            dispatch(InteractiveInterpretatorActions.variants.locusVariant(term.chromosome + ":"+ term.start+"-"+term.end));
        }
        // Reload page
        dispatch(VariantTableActions.clean());
    },
});


const ConnAnnotationGeneSelector = connect(mapStateToProps, mapDispatchToProps)(AnnotationGeneSelector);


export default ConnAnnotationGeneSelector;
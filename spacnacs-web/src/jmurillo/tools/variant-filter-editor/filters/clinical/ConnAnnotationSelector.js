import { connect } from 'react-redux';

import AnnotationSelector from './AnnotationSelector';
import VariantFilterActions from './../../../variant-filter/actions';
import VariantFilterQuerist from './../../../variant-filter/state-querist';
import VariantTableActions from './../../../interactive-interpretator/actions';



const annotationFields = [
    /*{
        id: "gene",
        label: "Gene",
    },*/
    {
        id: "disgenet",
        label: "DisGenet",
    },
    {
        id: "omim",
        label: "Omim",
    },
    {
        id: "orpha",
        label: "Orpha",
    },
    {
        id: "go",
        label: "Go",
    },
    {
        id: "hpo",
        label: "HPO"
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
        if (term.annotationField == "all")
            dispatch(VariantFilterActions.search.set(term));
        else
            dispatch(VariantFilterActions.search.add(term));
        // Reload page
        dispatch(VariantTableActions.clean());
    },
});


const ConnAnnotationSelector = connect(mapStateToProps, mapDispatchToProps)(AnnotationSelector);


export default ConnAnnotationSelector;
import { connect } from 'react-redux';

import ListFilters from './ListFilters';
//import Actions from '../variant-filter-editor/actions';
//import StateQuerist from '../variant-filter-editor/state-querist';
//import EntitiesQuerist from "../../entities/state-querist";
import VariantFilterQuerist from './../variant-filter/state-querist';
import VariantFilterActions from './../variant-filter/actions';
import InteractiveInterpretatorActions from "../interactive-interpretator/actions";


const mapStateToProps = state => ({
    //activeEditor: StateQuerist.activeEditor(state),
    //numSamples: !!EntitiesQuerist.entity(state, "analysis") && !!EntitiesQuerist.entity(state, "analysis").samplesFiles &&
	//EntitiesQuerist.entity(state, "analysis").samplesFiles.length || 0
    filters: { genomicRegions: VariantFilterQuerist.genomic.genomicRegions(state),
               genes: VariantFilterQuerist.search.search(state).filter(x=> x.annotationField == "gene"),
               variantTypes:VariantFilterQuerist.genomic.variantTypes(state),
               clinvars: VariantFilterQuerist.clinical.clinvars(state),
               phenotypes: VariantFilterQuerist.search.search(state).filter(x=> x.annotationField != "gene" && x.annotationField != "all"),
               populationFrequency: VariantFilterQuerist.populationFrequency.populationFilters(state, "Spanish CNVs DB") || [],
               genders:VariantFilterQuerist.samples.genders(state) || [],
               phenotypesSamples: VariantFilterQuerist.samples.phenotypesSample(state) || [],
               subpopulations: VariantFilterQuerist.samples.subpopulations(state) || []
        }
})

const mapDispatchToProps = dispatch => ({
	/*selectEditor: editorName => {
		dispatch(Actions.selectActiveEditor(editorName));
	},*/
	onRemoveFilter:(annotation, term) => {
	    switch (annotation){
            case "genomicRegions":
                dispatch(VariantFilterActions.genomic.genomicRegions.remove(term));
                break;

            case "genes":
                dispatch(VariantFilterActions.search.remove(term));
                 break;

            case "variantTypes":
                dispatch(VariantFilterActions.genomic.variantTypes.remove(term));
                break;

            case "clinvars":
                dispatch(VariantFilterActions.clinical.clinvars.remove(term));

                break;
            case "phenotypes":
                dispatch(VariantFilterActions.search.remove(term));
                break;

            case "populationFrequency":
                dispatch(VariantFilterActions.populationFrequency.removeFilter("Spanish CNVs DB", "ALL"));
                break;

            case "samples.phenotypes":
                dispatch(VariantFilterActions.samples.phenotypes.remove(term));
                break;

            case "genders":
                dispatch(VariantFilterActions.samples.genders.remove(term));
                break;

            case "subpopulations":
                dispatch(VariantFilterActions.samples.subpopulations.clear());
                break;



        }
    },
    onLocus:(region) =>{
        dispatch(InteractiveInterpretatorActions.variants.locusVariant(region));

    }
});


const ConnListFilters = connect(mapStateToProps, mapDispatchToProps)(ListFilters);


export default ConnListFilters;

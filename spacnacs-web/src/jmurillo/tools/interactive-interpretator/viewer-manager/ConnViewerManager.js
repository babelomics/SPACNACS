import { connect } from "react-redux";
import PropTypes from "prop-types";
import ViewerManager from "./ViewerManager";
import StateQueristInterpretator from "./../state-querist";
import config from "./../../../../config";
import VariantFilterQuerist from './../../variant-filter/state-querist';


import VariantFilterActions from '../../variant-filter/actions';

const mapStateToProps = state => ({
    locusVariant: StateQueristInterpretator.locusVariant(state),
    //url: config.cnv.url + "/database" + '/searchAll?outputFormat=txt',
    url: config.cnv.url + "/database" + '/search?outputFormat=json',
    filters: { genomicRegions: VariantFilterQuerist.genomic.genomicRegions(state),
                genes: VariantFilterQuerist.search.search(state).filter(x=> x.annotationField == "gene"),
                variantTypes:VariantFilterQuerist.genomic.variantTypes(state),
                clinvars: VariantFilterQuerist.clinical.clinvars(state),
                phenotypes: VariantFilterQuerist.search.search(state).filter(x=> x.annotationField != "gene" && x.annotationField != "all"),
                populationFrequency: VariantFilterQuerist.populationFrequency.populationFilters(state, "Spanish CNVs DB") || [],
                phenotypesSample: VariantFilterQuerist.samples.phenotypesSample(state) || [],
                genders: VariantFilterQuerist.samples.genders(state) || [],
                subpopulations: VariantFilterQuerist.samples.subpopulations(state) || [],

            }
});

const mapDispatchToProps = dispatch => ({
  onExpand: () => {},
  onCollapse: () => {},

  //onOrderSave: (order, typeOrder) => {
  // },
  // onOrderChanged: order => {
  // }

    addGenomicRegion: region => {
        dispatch(VariantFilterActions.genomic.genomicRegions.add(region));
    },
    removeGenomicRegion: region => {
        dispatch(VariantFilterActions.genomic.genomicRegions.remove(region));
    },
});

const ConnViewerManager = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewerManager);

ConnViewerManager.defaultProps = {
  /*locus: "3:21224301-21266945",
    genome: "hg19",
    data: [],*/
  locusVariant: config.default.igv.locus,
  showSampleNames: config.default.igv.showSampleNames,
  genome: config.default.igv.genome,
  data: config.default.igv.data,
  filters: {}
};

ConnViewerManager.propTypes = {
  locus: PropTypes.string,
  genome: PropTypes.string,
    filters: PropTypes.object
  //expanded: PropTypes.bool,
  //order: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnViewerManager);

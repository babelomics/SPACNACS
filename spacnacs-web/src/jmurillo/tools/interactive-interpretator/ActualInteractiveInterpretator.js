import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {render} from 'react-dom';

import StateQuerist from "./state-querist";
//import VariantFilterActions from "../variant-filter/actions";
/*import Actions from "./actions";*/

//import Tool from "../ConnTool";
import ConnViewerManager from "./viewer-manager/ConnViewerManager";


import ConnVariantFilterEditorDB from "./../variant-filter-editor-db/ConnVariantFilterEditorDB";
import Grid from '@material-ui/core/Grid';
//import ConnSortBox from "./sort/ConnSortBox";
import { withStyles } from "@material-ui/core/styles";

import ConnListFilters from "./../variant-filter-editor-db/ConnListFilters";



const styles = theme => ({
    paper: {
        textAlign: "center",
        color: theme.palette.text.secondary
    },
    visible: {
        display: "none"
    },
    hiddenGrid: {
        transitionDuration: "0.4s"
    },
    collapsible: { transitionDuration: "0.3s" }

});

class ConnWrappedInteractiveInterpretator extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            openActionIGV: null,
            anchorElIGV: null,
            minWidth: "80%",
            minHeight: "80%",
            isViewActivityMode: false,
            isVisible: false
        }
    }


  componentDidMount() {
    //this.updateAppBar();


    //if (!!this.props.analysis) {
      //this.props.setFilterSamples(this.props.analysis.samples);
    //  this.createPrioritization();
    //}
  }

  componentDidUpdate(prevProps) {
  }

  render() {
          const columns = [
              {field: 'order', hidden: true},
              {field: 'groupInfo', hidden: false},
              {field: 'id'},
              {field: 'genes'},
              {field: 'populationFrequencies', hidden: false},
              {field: 'annotations', hidden: false},
              {field: 'pathogenicity', hidden: false},
              {field: 'comments', hidden: false},
              {field: 'conservation', hidden: false}
          ];

      const rows = [
          {
              id: <ConnVariantFilterEditorDB />,
              username: <ConnViewerManager/>,

          },
      ];
          return (
              <React.Fragment>


                  <ConnListFilters />

                  <Grid container spacing={1.5}>
                      <Grid item xs={12} sm={2} >
                          <ConnVariantFilterEditorDB />
                      </Grid>
                      <Grid item  xs={this.state.isViewActivityMode ? 7 : 10}>
                          <ConnViewerManager/>
                      </Grid>
                  </Grid>


              </React.Fragment>
          );
      }
      /*createPrioritization() {
    this.abortController = new AbortController();
    const userId = getUrlParam(this.props, "userId");
    const analysisId = getUrlParam(this.props, "analysisId");
    return Client.instance.cnvs.createPrioritization(
      userId, analysisId,
      this.abortController.signal
    ).then(isCreated => {
        this.props.reload();
    });*/
}

const mapStateToProps = state => ({
  error: (StateQuerist.error(state) || "").toString(),
  /*expandedViewer: StateQuerist.expandedViewer(state),
  onExpandViewer: PropTypes.func.isRequired,
  onCollapseViewer: PropTypes.func.isRequired*/
});

const mapDispatchToProps = dispatch => ({
/*  setFilterSamples: samples => {
    dispatch(VariantFilterActions.samples.setSamples(samples));
    dispatch(VariantFilterActions.samples.setDefaultSampleGenotypes());
  },

  reload:()=> {
      dispatch(Actions.pages.set([]));
    },

  onExpandViewer: () =>{
      dispatch(Actions.setExpandedViewer(true));

  },
  onCollapseViewer: () =>{
      dispatch(Actions.setExpandedViewer(false));
  },

  onLocus:(variant) =>{
      dispatch(Actions.variants.locusVariant(variant));
  }*/
});
export default withStyles(styles)( ConnWrappedInteractiveInterpretator);


/*
const ConnInteractiveInterpretator2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnWrappedInteractiveInterpretator);

ConnInteractiveInterpretator2.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default Tool(ConnInteractiveInterpretator2);*/

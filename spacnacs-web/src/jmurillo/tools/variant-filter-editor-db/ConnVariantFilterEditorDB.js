import { connect } from 'react-redux';

import VariantFilterEditorBD from './VariantFilterEditorBD';
import Actions from '../variant-filter-editor/actions';
import StateQuerist from '../variant-filter-editor/state-querist';
import EntitiesQuerist from "../../entities/state-querist";
// import VariantFilterQuerist from './state-querist';


const mapStateToProps = state => ({
    activeEditor: StateQuerist.activeEditor(state),
    numSamples: !!EntitiesQuerist.entity(state, "analysis") && !!EntitiesQuerist.entity(state, "analysis").samplesFiles &&
	EntitiesQuerist.entity(state, "analysis").samplesFiles.length || 0
})

const mapDispatchToProps = dispatch => ({
	selectEditor: editorName => {
		dispatch(Actions.selectActiveEditor(editorName));
	},
});


const ConnVariantFilterEditorBD = connect(mapStateToProps, mapDispatchToProps)(VariantFilterEditorBD);


export default ConnVariantFilterEditorBD;

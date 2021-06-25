import { connect } from 'react-redux';

import VariantFilterEditor from './VariantFilterEditor';
import Actions from './actions';
import StateQuerist from './state-querist';
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


const ConnVariantFilterEditor = connect(mapStateToProps, mapDispatchToProps)(VariantFilterEditor);


export default ConnVariantFilterEditor;

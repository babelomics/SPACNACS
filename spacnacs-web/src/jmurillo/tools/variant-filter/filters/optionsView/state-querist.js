import rootState from '../../root-state';


const StateQuerist = Object.freeze({
    rootState: state => rootState(state).optionsView || {},
    selectedView: state =>StateQuerist.rootState(state).selectedView || "",
    hidden: state =>StateQuerist.rootState(state).hidden || [],
});


export default StateQuerist;
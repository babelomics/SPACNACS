import rootState from '../../root-state';


const StateQuerist = Object.freeze({
    rootState: state => rootState(state).search || {},
    search: state =>  StateQuerist.rootState(state).search || [],
    sort: state => StateQuerist.rootState(state).sort || [],
});


export default StateQuerist;
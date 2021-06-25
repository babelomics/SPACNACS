import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	scores: state => rootState(state).conservationScores || [],
	score: (state, scoreName) => (rootState(state).conservationScores || []).find(score => score.id === scoreName),
});


export default StateQuerist;
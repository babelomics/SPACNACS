import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	setAllScores: scores => ({
		type: ActionTypes.SET_ALL,
		scores: scores,
	}),
	setScore: score => ({
		type: ActionTypes.SET,
		score: score,
	}),
	removeScore: scoreName => ({
		type: ActionTypes.REMOVE,
		scoreName: scoreName,
	}),
});


export default Actions;

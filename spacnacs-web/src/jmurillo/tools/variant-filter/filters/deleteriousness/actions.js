import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	setSift: value => ({
		type: ActionTypes.SET_SIFT,
		value: value,
	}),
	setPolyphen: value => ({
		type: ActionTypes.SET_POLYPHEN,
		value: value,
	}),
	setCaddRaw: value => ({
		type: ActionTypes.SET_CADD_RAW,
		value: value,
	}),
	setCaddScaled: value => ({
		type: ActionTypes.SET_CADD_SCALED,
		value: value,
	}),
});


export default Actions;

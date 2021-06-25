import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	set: vcfMetrics => ({
		type: ActionTypes.SET,
		vcfMetrics: vcfMetrics,
	}),
	add: vcfMetric => ({
		type: ActionTypes.ADD,
		vcfMetric: vcfMetric,
	}),
	remove: vcfMetric => ({
		type: ActionTypes.REMOVE,
		vcfMetric: vcfMetric,
	}),
});


export default Actions;

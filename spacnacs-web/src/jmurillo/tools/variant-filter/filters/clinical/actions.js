import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	phenotypes: {
		clean: () => ({
			type: ActionTypes.phenotypes.CLEAN,
		}),
		add: hpTermId => ({
			type: ActionTypes.phenotypes.ADD,
			hpTermId: hpTermId,
		}),
		remove: hpTermId => ({
			type: ActionTypes.phenotypes.REMOVE,
			hpTermId: hpTermId,
		}),
	},
	clinvars: {
		clean: () => ({
			type: ActionTypes.clinvars.CLEAN,
		}),
		add: clinvar => ({
			type: ActionTypes.clinvars.ADD,
			clinvar: clinvar,
		}),
		remove: clinvar => ({
			type: ActionTypes.clinvars.REMOVE,
			clinvar: clinvar,
		}),
	},
});


export default Actions;

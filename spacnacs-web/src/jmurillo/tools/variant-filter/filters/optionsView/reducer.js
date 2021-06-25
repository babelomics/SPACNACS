import ActionTypes from './action-types';

/*

function addSample(samples, sample) {
	const s = samples.find(s => sample.individualId === s.individualId || sample.sampleId === s.sampleId);
	if (undefined === s) {
		return [...samples, sample];
	} else {
		return samples.map(x => x !== s ? x : sample);
	}
}

function removeSample(samples, individualId, sampleId) {
	return samples.filter(sample => sample.individualId !== individualId || sample.sampleId !== sampleId);
}

function setSampleGenotypes(samples, individualId, sampleId, genotypes) {
	const sample = samples.find(sample => sample.individualId === individualId || sample.sampleId === sampleId);
	return samples.map(s => s !== sample ? s : { ...sample, genotypes: genotypes });
}

function addSampleGenotype(samples, individualId, sampleId, genotype) {
	const sample = samples.find(sample => sample.individualId === individualId || sample.sampleId === sampleId);
	if (undefined !== sample) {
		const sampleGenotypes = sample.genotypes || [];
		if (sampleGenotypes.includes(genotype)) {
			return samples;
		} else {
			const newSampleGenotypes = [...sampleGenotypes, genotype];
			return samples.map(s => sample !== s ? s : { ...sample, genotypes: newSampleGenotypes });
		}
	} else {
		return samples;
	}
}

function removeSampleGenotype(samples, individualId, sampleId, genotype) {
	const sample = samples.find(sample => sample.individualId === individualId || sample.sampleId === sampleId);
	if (undefined !== sample) {
		const sampleGenotypes = sample.genotypes || [];
		if (sampleGenotypes.includes(genotype)) {
			const newSampleGenotypes = sampleGenotypes.filter(gt => gt !== genotype);
			return samples.map(s => sample !== s ? s : { ...sample, genotypes: newSampleGenotypes });
		} else {
			return samples;
		}
	} else {
		return samples;
	}
}

function cleanSampleGenotypes(samples) {
	return samples.map(sample => {
		const { genotypes, ...rest } = sample;
		return rest;
	});
}

function setDefaultSampleGenotypes(samples) {
	const defaultGenotypes = ["R/A", "A/A"];
	return samples.map(sample => {
		const { genotypes, ...rest } = sample;
		return { ...rest, genotypes: defaultGenotypes };
	});
}

function addSampleGroupView(samples, individualId, sampleId, typeGroup) {
	const sample = samples.find(sample => sample.individualId === individualId && sample.sampleId === sampleId);
	if (undefined !== sample) {
		const sampleGroupViews = sample.typeGroups || [];
		if (sampleGroupViews.includes(typeGroup)) {
			return samples;
		} else {
			const newSampleViewGroups = [...sampleGroupViews, typeGroup];
			return samples.map(s => sample !== s ? s : { ...sample, typeGroups: newSampleViewGroups });
		}
	} else {
		return samples;
	}
}

function removeSampleGroupView(samples, individualId, sampleId, typeGroup) {
	const sample = samples.find(sample => sample.individualId === individualId && sample.sampleId === sampleId);
	if (undefined !== sample) {
		const sampleGroupViews = sample.typeGroups || [];
		if (sampleGroupViews.includes(typeGroup)) {
			const newSampleViewGroups = sampleGroupViews.filter(gt => gt !== typeGroup);
			return samples.map(s => sample !== s ? s : { ...sample, typeGroups: newSampleViewGroups });
		} else {
			return samples;
		}
	} else {
		return samples;
	}
}


function cleanSampleGroupView(samples) {
	return samples.map(sample => {
		const { typeGroups, ...rest } = sample;
		return rest;
	});
}

*/



const defaultState = {"selectedView":"", hidden:["selector","copy"]};

function reducer(state = defaultState, action) {
	switch (!!action && action.type) {
		case ActionTypes.CLEAN:
			return defaultState;
		case ActionTypes.SET_SELECTED_VIEW:
			return {...state, selectedView: action.selectedView || ""};



		case ActionTypes.ADD_HIDDEN:
            return state.hidden.includes(action.column) ? state : { ...state, hidden:[...state.hidden, action.column] };
		case ActionTypes.REMOVE_HIDDEN:
            return {...state, hidden: state.hidden.filter(column => (action.column !== column))};


        default:
			return state;
	}
};

export default reducer;

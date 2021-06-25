import rootState from '../../root-state';


const StateQuerist = Object.freeze({
	rootState: state => rootState(state).deleteriousness || {},
	active: state => {
		const filter = StateQuerist.rootState(state);
		const sift = (!!filter.proteinSubstitutionScores && filter.proteinSubstitutionScores.sift) || {};
		if (!isNaN(sift.min) || !isNaN(sift.max) || !!sift.type) {
			return true;
		}
		const polyphen = (!!filter.proteinSubstitutionScores && filter.proteinSubstitutionScores.polyphen) || {};
		if (!isNaN(polyphen.min) || !isNaN(polyphen.max) || !!polyphen.type) {
			return true;
		}
		const caddRaw = (!!filter.cadd && filter.cadd.raw) || {};
		if (!isNaN(caddRaw.min) || !isNaN(caddRaw.max)) {
			return true;
		}
		const caddScaled = (!!filter.cadd && filter.cadd.scaled) || {};
		if (!isNaN(caddScaled.min) || !isNaN(caddScaled.max)) {
			return true;
		}
		return false;
	},
	proteinSubstitutionScores: state => StateQuerist.rootState(state).proteinSubstitutionScores || {},
	sift: state => StateQuerist.proteinSubstitutionScores(state).sift || {},
	polyphen: state => StateQuerist.proteinSubstitutionScores(state).polyphen || {},
	cadd: state => StateQuerist.rootState(state).cadd || {},
	caddRaw: state => StateQuerist.cadd(state).raw || {},
	caddScaled: state => StateQuerist.cadd(state).scaled || {},
});


export default StateQuerist;
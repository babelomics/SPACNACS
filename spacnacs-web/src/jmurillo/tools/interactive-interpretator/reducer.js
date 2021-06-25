import ActionTypes from './action-types';

const initialState = {
	/*pages: [],
	expanded: [],
	error: '',

	// search
	searchText: '',
	sortField: '',
	annotationField: ''*/
};

const reducer = (state = initialState, action) => {
	switch ((!!action && action.type) || undefined) {
/*		case ActionTypes.CLEAN:
			return initialState;
		case ActionTypes.pages.SET:
			return { ...state, pages: action.pages };
		// variants
		case ActionTypes.variants.EXPAND:
			return state.expanded.includes(action.variantId) ? state : {
				...state,
				expanded: [action.variantId],
			};

		case ActionTypes.variants.COLLAPSE:
			return !state.expanded.includes(action.variantId) ? state : {
				...state,
				expanded: []
			};
*/
		case ActionTypes.variants.LOCUS:
            return { ...state, locusVariant: action.variantId };
/*
		case ActionTypes.gene.EXPAND_INFO:
			let findPosition = !!state.expanded && state.expanded.findIndex(v => v.id === action.variantId);
			let newExpanded = [...state.expanded];
			let newVariant = newExpanded[findPosition];
			let findPositionGene = !!newVariant && newVariant["genes"].findIndex(g => g.geneSymbol === action.geneSymbol);

			let newGene = newVariant["genes"][findPositionGene];

			if (newGene["expanded"] === undefined) {
				let expandGene = [];
				expandGene.push(action.typeInfo)
				newGene.expanded = expandGene;
			} else {
				if (!!newGene["expanded"] && newGene["expanded"].findIndex(i => i === action.typeInfo) === -1) {
					newGene.expanded.push(action.typeInfo);
				} else
					newGene.expanded = newGene.expanded.filter(t => t !== action.typeInfo);
			}

			newVariant["genes"][findPositionGene] = newGene;
			newExpanded[findPosition] = newVariant;

			return { ...state, expanded: newExpanded };

		case ActionTypes.error.SET:
			return {
				...state,
				error: action.message,
			};
		case ActionTypes.error.CLEAR:
			return {
				...state,
				error: "",
			};

		// Search
		case ActionTypes.SET_SEARCH_TEXT:
			return { ...state, searchText: action.text };
		case ActionTypes.SET_ANNOTATION:
			return { ...state, annotation: action.annotation };
		case ActionTypes.SORT_BY:
			return { ...state, sortField: action.field };

		// Update order in page
		case ActionTypes.pages.UPDATE_ORDER:
            let isFind = false;
            let nPages = [... state.pages];
            for (let i=0; i < state.pages.length && !isFind; i++){
                let indSearchCnv = nPages[i].items.findIndex( cnv =>
                    cnv.chromosome === action.cnvs.chromosome && cnv.start === action.cnvs.start &&
                    cnv.end === action.cnvs.end && cnv.ty === action.cnvs.ty
                );
                if (indSearchCnv != -1 ){
                    isFind = true;
                    // Add/Replace comment
                    nPages[i].items[indSearchCnv].order = action.cnvs.order ;
                }
            }
            return { ...state, pages: nPages };

			/*
			let newList = state.pages.map(variant => {
				if (variant.id === action.variant.id) {
					let nVariant = variant;
					nVariant.order = action.variant.order;
					return nVariant;
				} else {
					return variant;
				}
			});
			return { ...state, pages: newList };

*/
        // Update comment in page
	/*	case ActionTypes.pages.UPDATE_COMMENT:
            let isFindC = false;
            let nPagesC = [... state.pages];
			for (let i=0; i < state.pages.length && !isFindC; i++){
                let indSearchCnv = nPagesC[i].items.findIndex( cnv =>
                    cnv.chromosome === action.cnvs.chromosome && cnv.start === action.cnvs.start &&
                        cnv.end === action.cnvs.end && cnv.ty === action.cnvs.ty
				);
                if (indSearchCnv != -1 ){
                    isFindC = true;
                    // Add/Replace comment
                    if (nPagesC[i].items[indSearchCnv].comments == null) {
                        nPagesC[i].items[indSearchCnv].comments = [];
                    }
                    const indSearchComment = nPagesC[i].items[indSearchCnv].comments.findIndex(c => c.owner === action.comment.owner)
                    if (indSearchComment == -1)
                        nPagesC[i].items[indSearchCnv].comments.push(action.comment);
                    else
                        nPagesC[i].items[indSearchCnv].comments[indSearchComment] = action.comment;
                }
            }

            return { ...state, pages: nPagesC };



        // Update pathogenicity in page
		case ActionTypes.pages.UPDATE_PATHOGENICITY:

            let nPagesP = [... state.pages];
            for (let patI=0; patI < action.pathogenicity.length ; patI++) {

                let isFindP = false;
                for (let i = 0; i < state.pages.length && !isFindP; i++) {
                    let indSearchCnv = nPagesP[i].items.findIndex(cnv =>
                        cnv.chromosome === action.cnvs.chromosome && cnv.start === action.cnvs.start &&
                        cnv.end === action.cnvs.end && cnv.ty === action.cnvs.ty
                    );
                    if (indSearchCnv != -1) {
                        isFindP = true;
                        // Add/Replace comment
                        if (nPagesP[i].items[indSearchCnv].sumPathog == null) {
                            nPagesP[i].items[indSearchCnv].sumPathog = {};
                        }

                        if (action.pathogenicity[patI].sumPathog != null) {
                            nPagesP[i].items[indSearchCnv].sumPathog = {...action.pathogenicity[patI].sumPathog};
                        }
                    }
                }
            }

            // Update pathogenicity in expanded
           /* let nExpadedP = [... state.expanded];
            for (let patI=0; patI < action.pathogenicity.length ; patI++) {
				let indSearchCnv = nExpadedP.findIndex(cnv =>
					cnv.chromosome === action.cnvs.chromosome && cnv.start === action.cnvs.start &&
					cnv.end === action.cnvs.end && cnv.ty === action.cnvs.ty
				);
				if (indSearchCnv != -1) {
					// Add/Replace comment
					if (nExpadedP[indSearchCnv].sumPathog == null) {
						nExpadedP[indSearchCnv].sumPathog = {};
					}

					if (action.pathogenicity[patI].sumPathog != null)
						nExpadedP[indSearchCnv].sumPathog = {...action.pathogenicity[patI].sumPathog};
				}
            }

            return { ...state, pages: nPagesP, expanded: nExpadedP  };
            /
            return { ...state, pages: nPagesP };
        case ActionTypes.SET_EXPANDED_VIEWER:
            return {...state, expandedViewer: action.expandedViewer};
            */
		default:
			return state;
	}
};


export default reducer;
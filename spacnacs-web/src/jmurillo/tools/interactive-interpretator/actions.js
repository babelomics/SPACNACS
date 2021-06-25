import ActionTypes from './action-types';


const Actions = Object.freeze({
	clean: () => ({
		type: ActionTypes.CLEAN,
	}),
	pages: Object.freeze({
		set: pages => ({
			type: ActionTypes.pages.SET,
			pages: pages,
		}),
		updateOrder: cnvs => ({
            type: ActionTypes.pages.UPDATE_ORDER,
            cnvs: cnvs,
        }),
        updateComment: (cnvs, comment) => ({
            type: ActionTypes.pages.UPDATE_COMMENT,
            cnvs: cnvs,
            comment: comment,
        }),
        updatePathogenicity: (cnvs, pathogenicity) => ({
            type: ActionTypes.pages.UPDATE_PATHOGENICITY,
            cnvs: cnvs,
            pathogenicity: pathogenicity,
        }),
	}),

	variants: Object.freeze({
		expand: variantId => ({
			type: ActionTypes.variants.EXPAND,
			variantId: variantId,
		}),
		collapse: variantId => ({
			type: ActionTypes.variants.COLLAPSE,
			variantId: variantId,
		}),
        locusVariant:  variantId => ({
            type: ActionTypes.variants.LOCUS,
            variantId: variantId,
        }),
	}),

    gene: Object.freeze({
        expandInfo: (variantId, geneSymbol, typeInfo) => ({
            type: ActionTypes.gene.EXPAND_INFO,
            variantId: variantId,
            geneSymbol:geneSymbol,
            typeInfo: typeInfo
        }),
    }),

    setExpandedViewer: expandedViewer => ({
        type: ActionTypes.SET_EXPANDED_VIEWER,
        expandedViewer: expandedViewer,
    }),



	// TODO: make this individually reusable
	error: Object.freeze({
		set: msg => ({
			type: ActionTypes.error.SET,
			message: msg,
		}),
		clear: () => ({
			type: ActionTypes.error.CLEAR,
		})
	}),
});


export default Actions;

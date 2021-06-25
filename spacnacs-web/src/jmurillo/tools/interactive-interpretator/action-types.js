const PREFIX = 'jmurillo.interactive-interpretator.';


const ActionTypes = Object.freeze({
	CLEAN: 'jmurillo.interactive-interpretator.clean',
	pages: Object.freeze({
		SET: 'jmurillo.interactive-interpretator.pages.set',
        UPDATE_ORDER: 'jmurillo.interactive-interpretator.pages.update-order',
        UPDATE_COMMENT: 'jmurillo.interactive-interpretator.pages.update-comment',
        UPDATE_PATHOGENICITY: 'jmurillo.interactive-interpretator.pages.update-pathogenicity',
	}),
	variants: Object.freeze({
		EXPAND: 'jmurillo.interactive-interpretator.variants.expand',
		COLLAPSE: 'jmurillo.interactive-interpretator.variants.collapse',
		LOCUS: 'jmurillo.interactive-interpretator.variants.locus',
	}),
	// TODO: make this individually reusable
	error: Object.freeze({
		SET: 'jmurillo.interactive-interpretator.error.set',
		CLEAR: 'jmurillo.interactive-interpretator.error.clear',
	}),

    gene : Object.freeze({
        EXPAND_INFO: PREFIX + 'expand-info',
    }),

   // CLEAN: PREFIX + 'clean',
    SET_SEARCH_TEXT: PREFIX + 'set-search-text',
    SET_ANNOTATION: PREFIX + 'set-annotation',
    SORT_BY: PREFIX + 'sort-by',

	SELECT_VIEW: PREFIX + 'set-view',
    EXPAND_VIEWER:PREFIX + 'expand-viewer',

    SET_EXPANDED_VIEWER: PREFIX + "set-expanded-viewer",
});


export default ActionTypes;
import ActionTypes from './action-types';


const Actions = Object.freeze({
    clean: () => ({
        type: ActionTypes.CLEAN,
    }),
    cleanAnnotationField: () => ({
        type: ActionTypes.CLEAN_ANNOTATION_FIELD
    }),
    cleanGene:() => ({
        type: ActionTypes.CLEAN_GENE
    }),

    set: (newSearch) => ({
        type: ActionTypes.SET,
        searchTerm: newSearch
    }),
    add: (searchTerm) => ({
        type: ActionTypes.ADD,
        searchTerm: searchTerm
    }),
    remove: (searchTerm) => ({
        type: ActionTypes.REMOVE,
        searchTerm: searchTerm,
    }),

    setSort: (sortTerm) => ({
        type: ActionTypes.SET_SORT,
        sortTerm: sortTerm
    }),
    addSort: (sortTerm) => ({
        type: ActionTypes.ADD_SORT,
        sortTerm: sortTerm
    }),
    removeSort: (sortTerm) => ({
        type: ActionTypes.REMOVE_SORT,
        sortTerm: sortTerm,
    }),
});


export default Actions;


import ActionTypes from "./action-types";


const defaultState = {
    search: [{ searchText: "", annotationField: "all"}],
    sort:[{sortField: "CNV" , option:"asc"}]
};


const reducer = (state = defaultState, action) => {
      switch (!!action && action.type) {
            case ActionTypes.CLEAN:
                  return defaultState;

          case ActionTypes.CLEAN_ANNOTATION_FIELD:
              return {...state, search: state.search.filter(term => (term.annotationField === "all" || term.annotationField === "gene"))};

              case ActionTypes.CLEAN_GENE:
              return {...state, search: state.search.filter(term => (term.annotationField !== "gene"))};

          case ActionTypes.SET:
              return {...state, search: state.search.includes(action.searchTerm) ? state.search : [ ...state.search, action.searchTerm ]};
              break;

          case ActionTypes.ADD:
              return {...state, search: state.search.includes(action.searchTerm) ? state.search : [ ...state.search, action.searchTerm ]};

          case ActionTypes.REMOVE:
              if (action.searchTerm.annotationField === "all")
                  return {...state, search: state.search.includes(action.searchTerm) ? state.search : [ ...state.search, action.searchTerm ]};
              else
                  return {...state, search: state.search.filter(term => (term.id === undefined || action.searchTerm.id !== term.id || (action.searchTerm.id !== term.id && term.annotationField !== action.searchTerm.annotationField)))};


          case ActionTypes.SET_SORT:
              return {...state, sort:  action.sortTerm};
              break;

          case ActionTypes.ADD_SORT:
              let newSort = state.sort.filter(term => action.sortTerm.sortField !== term.sortField);
              return {...state, sort: [...newSort, action.sortTerm ]};

          case ActionTypes.REMOVE_SORT:
              return {...state, sort: state.sort.filter(term => action.sortTerm.sortField !== term.sortField)};

          default:
              return state;

      }

};





export default reducer;
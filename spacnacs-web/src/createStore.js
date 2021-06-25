import { applyMiddleware, createStore, combineReducers } from 'redux';
import thunk from 'redux-thunk'
import { logger } from 'redux-logger';

//import sessionReducer from './jmurillo/tools/session/reducer';
//import menuSummaryReducer from './jmurillo/tools/menu-summary/reducer';
//import toolReducer from './jmurillo/tools/reducer';
//import userManagerReducer from './jmurillo/tools/user-manager/reducer';
//import projectManagerReducer from './jmurillo/tools/project-manager/reducer';
//import studyManagerReducer from './jmurillo/tools/study-manager/reducer';
//import messengerReducer from './jmurillo/tools/messenger/reducer';
//import analysesManagerReducer from './jmurillo/tools/analyses-manager/reducer';
//import individualsManagerReducer from './jmurillo/tools/individuals-manager/reducer';
//import samplesManagerReducer from './jmurillo/tools/samples-manager/reducer';


//import entitiesReducer from './jmurillo/entities/reducer';
//import orderReducer from './jmurillo/tools/order-manager/reducer';
import interactiveInterpretatorReducer from './jmurillo/tools/interactive-interpretator/reducer';
import variantFilterReducer from './jmurillo/tools/variant-filter/reducer';
import variantFilterEditorReducer from './jmurillo/tools/variant-filter-editor/reducer';


const rootReducer = combineReducers({
    //tool: toolReducer,
	//messenger: messengerReducer,

    //entities: entitiesReducer,
	interactiveInterpretator: interactiveInterpretatorReducer,
	//orderManager: orderReducer,
	variantFilter: variantFilterReducer,
	variantFilterEditor: variantFilterEditorReducer,
});


const initialState = rootReducer(undefined, undefined);


export const configureStore = (state = initialState) => (
    createStore(
        rootReducer,
        state,
        applyMiddleware(thunk, logger)
    )
);


export default configureStore;
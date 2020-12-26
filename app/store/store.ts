import { createStore, combineReducers, Reducer, CombinedState } from 'redux';
import { AppState } from './types';
import { terminals } from './terminals/reducer';
import { selected } from './selected/reducer';

// We combine all the reducers into one single reducer
const reducer: Reducer<CombinedState<AppState>> = combineReducers<AppState>({ terminals, selected });

export default createStore(reducer);

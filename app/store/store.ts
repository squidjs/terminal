import { createStore, combineReducers, Reducer, CombinedState } from 'redux';
import { AppState } from './types';
import { terminals } from './terminals/reducer';
import { selected } from './selected/reducer';
import { notifications } from './notifications/reducer';

// We combine all the reducers into one single reducer
const reducer: Reducer<CombinedState<AppState>> = combineReducers<AppState>({ terminals, selected , notifications });

export default createStore(reducer);

import { createStore, combineReducers, Reducer, CombinedState } from 'redux';
import { AppState } from '@app/store/types';
import { terminals } from '@app/store/terminals/reducer';
import { selected } from '@app/store/selected/reducer';
import { notifications } from '@app/store/notifications/reducer';

// We combine all the reducers into one single reducer
const reducer: Reducer<CombinedState<AppState>> = combineReducers<AppState>({ terminals, selected , notifications });

export default createStore(reducer);

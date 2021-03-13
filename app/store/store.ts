import { createStore, combineReducers, Reducer, CombinedState } from 'redux';
import { AppState } from '@app/store/types';
import { hosts } from '@app/store/hosts/reducer';

// We combine all the reducers into one single reducer
const reducer: Reducer<CombinedState<AppState>> = combineReducers<AppState>({ hosts });

export default createStore(reducer);

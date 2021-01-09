import { createStore, combineReducers, Reducer, CombinedState } from 'redux';
import { AppState } from '@app/store/types';
import { windows } from '@app/store/windows/reducer';
import { selected } from '@app/store/selected/reducer';
import { notifications } from '@app/store/notifications/reducer';
import { hosts } from '@app/store/hosts/reducer';

// We combine all the reducers into one single reducer
const reducer: Reducer<CombinedState<AppState>> = combineReducers<AppState>({ windows, selected , notifications, hosts });

export default createStore(reducer);

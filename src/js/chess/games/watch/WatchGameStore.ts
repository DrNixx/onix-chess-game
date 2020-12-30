import { intlReducer } from 'onix-app';
import { gameReducer } from 'onix-chess';
import { Store, createStore as reduxCreateStore, combineReducers, AnyAction } from 'redux';
import { boardReducer } from '../../BoardReducer';
import { WatchGameState } from "./WatchGameState";


export const createWatchGameStore = (preloadedState: WatchGameState) =>
    reduxCreateStore(
        combineReducers<WatchGameState>({
            intl: intlReducer,
            board: boardReducer,
            game: gameReducer,
        }), preloadedState);

// export type combinedAction = GameAction | ba.BoardAction | AnalyseAction | IntlAction;
export type WatchGameStore = Store<WatchGameState, AnyAction>;
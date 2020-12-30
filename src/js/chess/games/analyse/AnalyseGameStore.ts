import { intlReducer } from 'onix-app';
import { gameReducer } from 'onix-chess';
import { Store, createStore as reduxCreateStore, combineReducers, AnyAction } from 'redux';
import { boardReducer } from '../../BoardReducer';
import { AnalyseGameState } from "./AnalyseGameState";

export const createAnalyseGameStore = (preloadedState: AnalyseGameState) =>
    reduxCreateStore(
        combineReducers<AnalyseGameState>({
            intl: intlReducer,
            board: boardReducer,
            game: gameReducer,
        }), preloadedState);

// export type combinedAction = GameAction | ba.BoardAction | AnalyseAction | IntlAction;
export type AnalyseGameStore = Store<AnalyseGameState, AnyAction>;
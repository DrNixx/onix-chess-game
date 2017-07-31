import * as types from './GameActionTypes';
import { Move } from 'onix-chess';
import { GameSettings } from './GameSettings';

export type GameNavigateToPlyAction = {
    type: types.NAVIGATE_TO_PLY,
    ply: number,
}

export type GameNavigateToKeyAction = {
    type: types.NAVIGATE_TO_KEY,
    move: string,
}

export type GameNavigateToMoveAction = {
    type: types.NAVIGATE_TO_MOVE,
    move: Move,
}

export type GameSetSettingsAction = {
    type: types.GAME_SET_SETTINGS,
    settings: GameSettings,
}

export type GameReadAnalysisAction = {
    type: types.READ_ANALYSIS,
    analysis: any,
}

export type GameAction = 
    GameNavigateToPlyAction | 
    GameNavigateToKeyAction |
    GameNavigateToMoveAction |
    GameSetSettingsAction |
    GameReadAnalysisAction;
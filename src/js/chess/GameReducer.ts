import { Reducer } from 'redux';
import * as shortid from 'shortid';
import { Logger } from 'onix-core';
import { BoardMode } from 'onix-board';
import { GameSettings } from './GameSettings';
import { Color, FenStandartStart, Chess } from 'onix-chess';
import { AnalysisResult } from 'onix-chess-analyse';
import { GameState } from './GameState';
import { GameAction } from './GameActions';
import * as gameActions from './GameActionConsts';

const INITIAL_STATE: GameState = {
    color: Color.NoColor,
    mode: BoardMode.Observe,
    game: null,
    analysis: null,
};

export const createGameState = (settings: GameSettings, fen?: string, analysis?: AnalysisResult): GameState => {
    const { id, pgn, result, startply } = settings;
    const { movelist, fens, fen: feng, analysis_state: astate, ...gameProps } = settings;
    let { mode, color } = settings;

    const fena = feng || fen || FenStandartStart;
    const key = "game-" + (id ?  + id.toString() : shortid.generate());

    color = (typeof color !== "undefined") ? color : Color.NoColor;
    if (!mode) {
        mode = ((color === Color.NoColor) && (mode > BoardMode.Observe)) ? BoardMode.Observe : mode;
        mode = (result && (mode > BoardMode.Exam)) ? BoardMode.Exam : mode;
    }

    const game = new Chess({
        id: id,
        fen: fena,
        moves: movelist,
    });

    game.StartPlyCount = startply;
    game.Result = result;
    let analysis_state = astate || "empty";

    if (!analysis && !settings.analysis_state && settings.analysis) {

        const { players } = settings;
        analysis = new AnalysisResult({
            "state": "ready",
            "white": (players.white && players.white.analysis) ? players.white.analysis : null,
            "black": (players.black && players.black.analysis) ? players.black.analysis : null,
            "analysis": settings.analysis
        });
    }

    return {
        ...gameProps,
        key: key,
        mode: mode,
        color: color,
        game: game,
        analysis_state: analysis_state,
        analysis: analysis,
    }
}

export const gameReducer: Reducer<GameState, GameAction> = (state: GameState = INITIAL_STATE, action: GameAction) => {
    Logger.debug('Try game action', action);
    switch (action.type) {
        case gameActions.NAVIGATE_TO_PLY: 
        case gameActions.ANALYSE_POSITION: {
            const { game, onPosChange } = state;
            game.moveToPly(action.ply);
            if (onPosChange) {
                onPosChange(game.CurrentPlyCount);
            }

            return {
                ...state,
                game: game
            };
        }

        case gameActions.NAVIGATE_TO_MOVE: {
            const { game, onPosChange } = state;
            game.moveToPly(action.move.PlyCount);
            if (onPosChange) {
                onPosChange(game.CurrentPlyCount);
            }
            
            return {
                ...state,
                game: game
            };
        }

        case gameActions.NAVIGATE_TO_KEY: {
            const { game, onPosChange } = state;
            game.moveToKey(action.move);
            if (onPosChange) {
                onPosChange(game.CurrentPlyCount);
            }

            return {
                ...state,
                game: game
            };
        }

        case gameActions.GAME_SET_SETTINGS: {
            const { game, analysis, onPosChange } = state;
            action.settings.onPosChange = action.settings.onPosChange || onPosChange;
            return createGameState(action.settings, null, analysis);
        }

        case gameActions.LOAD_ANALYSIS:
            let result = action.analysis;
            const ar = new AnalysisResult(result);
            
            return {
                ...state,
                analysis: ar
            };

        default:
            return state;
    }
}
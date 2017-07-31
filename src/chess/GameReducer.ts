import { Reducer } from 'redux';
import * as shortid from 'shortid';
import { BoardMode } from 'onix-board';
import { GameSettings } from './GameSettings';
import { Color, FenStandartStart, Chess } from 'onix-chess';
import { GameState } from './GameState';
import { GameAction } from './GameActions';
import * as gameActions from './GameActionConsts';
import { AnalysisResult } from "onix-chess-analyse";

const INITIAL_STATE: GameState = {
    color: Color.NoColor,
    mode: BoardMode.Observe,
    game: null,
    analysis: null,
};

export const createGameState = (settings: GameSettings, fen?: string): GameState => {
    const { id, pgn, result } = settings;
    const { moves, fen: feng, ...gameProps } = settings;
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
        moves: moves,
    });

    game.Result = result;

    return {
        ...gameProps,
        mode: mode,
        color: color,
        game: game
    }
}

export const gameReducer: Reducer<GameState> = (state: GameState = INITIAL_STATE, action: GameAction) => {
    switch (action.type) {
        case gameActions.NAVIGATE_TO_PLY: {
            const { game } = state;
            game.moveToPly(action.ply);
            return {
                ...state,
                game: game
            };
        }

        case gameActions.NAVIGATE_TO_MOVE: {
            const { game } = state;
            game.moveToPly(action.move.PlyCount);
            return {
                ...state,
                game: game
            };
        }

        case gameActions.NAVIGATE_TO_KEY: {
            const { game } = state;
            game.moveToKey(action.move);
            return {
                ...state,
                game: game
            };
        }

        case gameActions.GAME_SET_SETTINGS: {
            const { game } = state;
            return createGameState(action.settings);
        }

        case gameActions.READ_ANALYSIS: {
            let result = action.analysis;

            const analysis = new AnalysisResult(result);
            
            return {
                ...state,
                analysis: analysis
            };
        }


        default:
            return state;
    }
}

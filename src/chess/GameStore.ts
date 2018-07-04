import { Store, createStore as reduxCreateStore, combineReducers, AnyAction } from 'redux';
import { ajax } from 'rxjs/ajax';
import { BoardMovement, BoardState, boardReducer, BoardActions as ba, BoardActionConsts as bac } from 'onix-board';
import { gameReducer } from './GameReducer';
import { GameState } from './GameState';
import { GameAction } from './GameActions';
import * as gameActions from './GameActionConsts';
import { IntlState, intlReducer, IntlAction } from 'onix-app';
import { Piece, Square, Move } from 'onix-chess';
import { AnalyseState, analyseReducer } from 'onix-chess-analyse';
import { AnalyseAction } from 'onix-chess-analyse/dist/analyse/AnalyseActions';
 
export interface PlayState {
    intl: IntlState,
    board: BoardState,
    game: GameState,
    analysis: AnalyseState,
}

export const createPlayStore = (preloadedState: PlayState) =>
    reduxCreateStore(
        combineReducers<PlayState>({
            intl: intlReducer,
            board: boardReducer,
            game: gameReducer,
            analysis: analyseReducer,
        }), preloadedState);

// export type combinedAction = GameAction | ba.BoardAction | AnalyseAction | IntlAction;
export type PlayStore = Store<PlayState, AnyAction>;

export const gameSetSelection = (store: PlayStore, move?: Move) => {
    const state = store.getState();
    move = move || state.game.game.CurrentMove;
    if (!move.isBegin()) {
        move = move.Prev;
    }

    let selection: BoardMovement = {
        from: {
            piece: Piece.NoPiece,
            square: Square.NullSquare
        }
    };

    if (!move.isBegin()) {
        const { moveData } = move;
        selection = {
            from: {
                square: moveData.From,
            },
            to: {
                square: moveData.To
            }
        };

        if (!move.Prev.isBegin()) {
            const prev = move.Prev;
            const prevData = prev.moveData;
            selection = {
                ...selection,
                lastFrom: {
                    square: prevData.From
                },
                lastTo: {
                    square: prevData.To
                }
            }
        }
    }

    store.dispatch({type: bac.SET_SELECTION, selection: selection } as ba.BoardAction);
}

const msgHandler = (msg) => {
    console.log(msg);  
}

export const gameNavigateToPly = (store: PlayStore, ply: number) => {
    store.dispatch({ type: gameActions.NAVIGATE_TO_PLY, ply: ply } as GameAction);
    const state = store.getState();
    const { game } = state.game;
    store.dispatch({type: bac.SET_POSITION, position: game.CurrentPos } as ba.BoardAction);
    gameSetSelection(store, game.CurrentMove);
}

export const gameNavigateToMove = (store: PlayStore, move: Move) => {
    store.dispatch({ type: gameActions.NAVIGATE_TO_MOVE, move: move } as GameAction);
    const state = store.getState();
    const { game } = state.game;
    store.dispatch({type: bac.SET_POSITION, position: game.CurrentPos } as ba.BoardAction);
    gameSetSelection(store, game.CurrentMove);
}

export const gameNavigateToKey = (store: PlayStore, key: string) => {
    store.dispatch({ type: gameActions.NAVIGATE_TO_KEY, move: key } as GameAction);
    const state = store.getState();
    const { game } = state.game;
    store.dispatch({type: bac.SET_POSITION, position: game.CurrentPos } as ba.BoardAction);
    gameSetSelection(store, game.CurrentMove);
}

export const gameLoadInsite = (store: PlayStore, id: number) => {
    ajax({ 
        url:"https://www.chess-online.com/api/game/" + id.toString() + "?with_movelist=1&with_fens=1&with_movetimes=1&with_analysis=1&with_pgn=1&with_opening=1", 
        method: 'GET', 
        crossDomain: true
    }).subscribe(
        function (data) {
            if (data && data.response) {
                store.dispatch({type: gameActions.GAME_SET_SETTINGS, settings: data.response} as GameAction);
                const state = store.getState();
                const { game } = state.game;
                store.dispatch({type: bac.SET_POSITION, position: game.CurrentPos } as ba.BoardAction);
            }
        },
        function (error) {
            // Log the error
        }
    );
}

export const gameTakePgn = (store: PlayStore, pgn: string) => {
    const body = {
        pgn: pgn
    };

    ajax({ 
        url:'https://www.chess-online.com/api/pgn/parse', 
        method: 'POST', 
        body: body,
        crossDomain: true
    }).subscribe(
        function (data) {
            if (data && data.response) {
                data.response.pgn = pgn;
                store.dispatch({type: gameActions.GAME_SET_SETTINGS, settings: data.response} as GameAction);
                const state = store.getState();
                const { game } = state.game;
                store.dispatch({type: bac.SET_POSITION, position: game.CurrentPos } as ba.BoardAction);
            }
        },
        function (error) {
            // Log the error
        }
    );
}
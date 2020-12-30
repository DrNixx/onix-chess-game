import { IntlState } from "onix-app";
import { createGameState, GameState } from 'onix-chess';
import { BoardState } from "../../BoardState";
import { GameProps } from "../GameProps";

export interface WatchGameState {
    intl: IntlState;
    board: BoardState;
    game: GameState;
} 

export const createWatchGameState = (props: GameProps): WatchGameState => {
    const { locale, board, game } = props;
    return {
        intl: {
            locale: locale ?? 'en-us'
        },
        board: {
            is3d: !!board.is3d,
            size: board.size,
            piece: board.piece || 'alpha',
            square: board.square || 'color-brown',
            orientation: board.orientation ?? 'white',
            coordinates: !!board.coordinates
        },
        game: createGameState(props.game)
    }
}
import { BoardSize } from 'onix-board-assets';
import { BoardSettings } from "../settings/BoardSettings";
import { GameSettings } from "../settings/GameSettings";

export interface GameProps {
    locale?: string,
    board: BoardSettings,
    game: GameSettings,
}

export const defaultProps: GameProps = {
    locale: "ru-ru",
    board: {
        is3d: false,
        orientation: "white",
        size: BoardSize.Largest,
        piece: "alpha",
        square: "cedar"
    },
    game: {
        orientation: "white"
    }
};
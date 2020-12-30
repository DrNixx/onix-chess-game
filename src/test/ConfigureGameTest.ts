import { ConfigureGame } from '../js/chess/games/configure/ConfigureGame';
import { BoardSettings } from '../js/chess/settings/BoardSettings';

var props: BoardSettings = {
    size: 4,
    piece: "alpha",
    square: "cedar",
    coordinates: true,
};

export const GameTest = ConfigureGame(props, document.getElementById("boardHere")!);
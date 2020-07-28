import * as GameActionTypes from './chess/GameActionTypes';
import * as GameActionConsts from './chess/GameActionConsts';
import * as GameActions from './chess/GameActions';

export { GameBoard, ViewGame, ChessGameProps } from './chess/games/WatchGame';
export { register as i18nRegister } from './i18n';

export { PlayStore } from './chess/GameStore';
export { gameReducer } from './chess/GameReducer';

export { GameActionTypes, GameActionConsts, GameActions };
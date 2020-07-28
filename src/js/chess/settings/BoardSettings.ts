import { Config as CgConfig } from 'chessground/config';
import { BoardSize } from 'onix-board-assets';

export interface BoardSettings extends CgConfig {
    size: BoardSize,
    piece?: string,
    square?: string,
    markers?: string,
}
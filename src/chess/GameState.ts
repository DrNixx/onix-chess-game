import { BoardMode } from 'onix-board';
import { Chess as ChessGame } from 'onix-chess';
import { IUser } from 'onix-core';
import { AnalysisResult } from 'onix-chess-analyse';

export interface GameState {
    /**
     * ИД партии
     */
    id?: number,

    /**
     * Партию нужно загрузить
     */
    load?: boolean,

    /**
     * Партия сыграна на сайте
     */
    insite?: boolean,

    /**
     * UID партии
     */
    key?: string,

    /**
     * Белый игрок
     */
    white?: IUser,

    /**
     * Черный игрок
     */
    black?: IUser,

    event?: string,

    trn_id?: number,
    
    trn_name?: string,

    limit?: string,
    
    can_pause?: boolean,
    
    rated?: boolean,

    private?: boolean,
    
    advance?: boolean,
    
    started?: Date,
    
    completed?: Date,

    result?: number,

    result_name?: string,

    legal?: false,
    
    chat_pub?: string,
    
    chat_pvt?: string,
    
    channel?: string,

    /**
     * Режим доски
     */
    mode: BoardMode,

    /**
     * Цвет для текущего игрока
     */
    color: number,

    startply?: number,

    pgn?: string,

    final_fen?: string,

    /**
     * Объект партии
     */
    game: ChessGame
}
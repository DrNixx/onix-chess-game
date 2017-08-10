import { BoardMode } from 'onix-board';
import { Chess as ChessGame } from 'onix-chess';
import { IUser } from 'onix-core';
import { AnalysisResult } from 'onix-chess-analyse';
import { IClock } from './IClock';
import { IGamePlayers } from './IGamePlayers';
import { IOpening } from './IOpening';

export interface GameState {
    /**
     * Game identifier
     */
    id?: number,

    /**
     * Need load game
     */
    load?: boolean,

    /**
     * Is site played game
     */
    insite?: boolean,

    /**
     * Game UID
     */
    key?: string,

    /**
     * Chess variation
     */
    variant?: string,
    
    /**
     * Game speed
     */
    speed?: string,
    
    /**
     * Preferense
     */
    perf?: string,
    
    /**
     * Is rated game
     */
    rated?: boolean,
    
    /**
     * Start fen
     */
    fen?: string,

    /**
     * Start ply counter
     */
    startply?: number,
    
    /**
     * Game status
     */
    status?: string,
    
    /**
     * Game clock settings
     */
    clock?: IClock,

    /**
     * Start timestamp
     */
    createdAt?: number,

    /**
     * End timestamp
     */
    lastMoveAt?: number,    

    /**
     * Turns count
     */
    turns?: number,

    /**
     * Game URL
     */
    urn?: string,

    /**
     * Tournament id
     */
    trn_id?: number,

    /**
     * Tournament name
     */
    trn_name?: string,

    /**
     * Board mode
     */
    mode?: BoardMode,

    /**
     * My color
     */
    color?: number,

    /**
     * Winner code
     */
    winner?: string,

    /**
     * Game result
     */
    result?: number,

    /**
     * Result name
     */
    result_name?: string,

    /**
     * Is private game
     */
    private?: boolean,

    /**
     * Can use computer hints
     */
    advance?: boolean,

    /**
     * Game play channer
     */
    channel?: string,

    /**
     * Game private chat channel
     */
    chat_pvt?: string,

    /**
     * Game public chat channel
     */
    chat_pub?: string,

    /**
     * Players
     */
    players?: IGamePlayers,

    /**
     * Game pgn
     */
    pgn?: string,

    /**
     * Final fen
     */
    final_fen?: string,

    /**
     * Opening
     */
    opening?: IOpening,

    /**
     * Game engine instance
     */
    game: ChessGame

    /**
     * Analysis state
     */
    analysis_state?: string,

    /**
     * Game analysis
     */
    analysis: AnalysisResult;
}
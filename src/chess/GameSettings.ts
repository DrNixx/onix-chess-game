import { BoardSize, BoardMode } from 'onix-board';
import { IUser } from 'onix-core';
import { AnalysisItem } from 'onix-chess-analyse';
import { IClock } from './IClock';
import { IGamePlayers } from './IGamePlayers';
import { IOpening } from './IOpening';

export interface GameSettings {
    id?: number,
    load?: boolean,
    insite?: boolean,
    variant?: string,
    speed?: string,
    perf?: string,
    rated?: boolean,
    fen?: string,
    startply?: number,
    status?: string,
    clock?: IClock,
    createdAt?: number,
    lastMoveAt?: number,    
    turns?: number,
    urn?: string,
    trn_id?: number,
    trn_name?: string,
    mode?: BoardMode,
    color?: number,
    winner?: string,
    result?: number,
    result_name?: string,
    private?: boolean,
    advance?: boolean,
    channel?: string,
    chat_pvt?: string,
    chat_pub?: string,
    players?: IGamePlayers,
    analysis_state?: string,
    analysis?: AnalysisItem[],
    movelist?: any,
    opening?: IOpening,
    fens?: string[],
    final_fen?: string,    
    pgn?: string,
}
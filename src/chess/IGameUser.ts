import { IUser } from 'onix-core';
import { IUserAnalysis } from 'onix-chess-analyse';

export interface IGameUser extends IUser {
    aurl?: string,
    rating?: number,
    zone?: number,
    zone_name?: string,
    timer?: number,
    postpone?: number,
    analysis?: IUserAnalysis,
    moveCentis?: number[]
}
import React from 'react';
import classNames from 'classnames';
import * as cg from 'chessground/types';
import { Chess as ChessEngine, GameResult, IChessPlayer, isAdvanceClock, isBlitzClock, isCorrespondenceClock } from "onix-chess";
import { UserName } from 'onix-chess-ctrls';
import { formatTimer } from 'onix-core';


export const renderPlayer = (engine: ChessEngine, orientation: cg.Color, position: "top" | "bottom") => {
    const { White: white, Black: black } = engine;

    let player: IChessPlayer | undefined;
    if (orientation == "white") {
        player = (position == "bottom") ? white : black; 
    } else {
        player = (position == "bottom") ? black : white; 
    }

    if (player) {
        return (
            <UserName user={player.user} size="Small" />
        );
    }

    return null;   
};

export const renderTimer = (engine: ChessEngine, orientation: cg.Color, position: "top" | "bottom") => {
    const rawData = engine.RawData;

    const timer = rawData.correspondence ? rawData.correspondence : rawData.clock;
    if (timer) {
        let time: number|undefined;
        let color: cg.Color|undefined;

        if (isBlitzClock(timer) || isCorrespondenceClock(timer)) {
            if (orientation == "white") {
                time = (position == "bottom") ? timer.white : timer.black; 
                color = (position == "bottom") ? "white" : "black"; 
            } else {
                time = (position == "bottom") ? timer.black : timer.white; 
                color = (position == "bottom") ? "black" : "white"; 
            }
        } else if (isAdvanceClock(timer)) {
            let playerTime: number;
            if (orientation == "white") {
                playerTime = (position == "bottom") ? timer.white : timer.black; 
                color = (position == "bottom") ? "white" : "black"; 
            } else {
                playerTime = (position == "bottom") ? timer.black : timer.white; 
                color = (position == "bottom") ? "black" : "white"; 
            }

            if (timer.lastMoveAt && timer.serverNow) {
                time = playerTime - (timer.serverNow - timer.lastMoveAt);
            }
        }

        if (time) {
            const isActive = (rawData.game!.player == color);
            const timerClass = [
                "timer",
                { "active": isActive }
            ];

            const timerIcon = (active: boolean) => {
                if (active) {
                    return (<i className="xi-time pr-2"></i>);
                }

                return null;
            }

            return (<div className={classNames(timerClass)} >{timerIcon(isActive)}<span>{formatTimer(time)}</span></div>);
        }
    }

    return null;
};

export const renderResult = (engine: ChessEngine, orientation: cg.Color, position: "top" | "bottom") => {
    if (engine.Result) {
        const whiteResult = engine.Result;
        const blackResult = GameResult.OppositeColor[whiteResult];

        let score: number;
        let type: GameResult.Type;
        if (orientation == "white") {
            score = (position == "bottom") ? GameResult.score[whiteResult] : GameResult.score[blackResult];
        } else {
            score = (position == "bottom") ? GameResult.score[blackResult] : GameResult.score[whiteResult]; 
        }

        return (
            <div className="game-result">{score}</div>
        );
    }
    
    return null;
};
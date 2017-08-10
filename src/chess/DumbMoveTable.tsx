import * as React from 'react';
import { Chess as ChessGame, Move } from 'onix-chess';
import { AnalysisResult } from 'onix-chess-analyse';
import { NavigatorMode } from './Constants';
import { PlayStore } from './GameStore';
import { MoveNavigator } from './MoveNavigator';
import { IOpening } from './IOpening';

export interface DumbMoveTableProps {
    nav: NavigatorMode,
    game: ChessGame,
    analysis: AnalysisResult,
    opeinig?: IOpening,
    startPly: number,
    currentMove: Move,
    onChangePos: (move: Move) => void,
    onChangeKey: (move: string) => void,
}

export class DumbMoveTable extends React.Component<DumbMoveTableProps, {}> {
    /**
     * constructor
     */
    constructor(props: DumbMoveTableProps) {
        super(props);
        // <div className="ui-movetable-element">
    }
}
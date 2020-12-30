import * as React from 'react';
import { Chess as ChessGame, IChessOpening, Move } from 'onix-chess';
import { NavigatorMode } from './Constants';


export interface DumbMoveTableProps {
    nav: NavigatorMode,
    game: ChessGame,
    opeinig?: IChessOpening,
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
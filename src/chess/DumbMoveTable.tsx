import * as React from 'react';
import { Chess as ChessGame } from 'onix-chess';
import { NavigatorMode } from './Constants';
import { PlayStore } from './GameStore';
import { MoveNavigator } from './MoveNavigator';
import { Move } from 'onix-chess';

export interface DumbMoveTableProps {
    nav: NavigatorMode,
    game: ChessGame,
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
import * as React from 'react';
import { NavigatorMode } from './Constants';
import { PlayStore } from './GameStore';
import { MoveNavigator } from './MoveNavigator';
import { Move } from 'onix-chess';

export interface DumbMoveTableProps {
    nav: NavigatorMode,
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
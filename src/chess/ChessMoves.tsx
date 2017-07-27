import * as React from 'react';
import { PlayStore } from './GameStore';
import { MovesMode, NavigatorMode } from './Constants';
import { Move } from 'onix-chess';
import { DumbMoveList } from './DumbMoveList';
import { DumbMoveTable } from './DumbMoveTable';
import { gameNavigateToMove, gameNavigateToKey } from './GameStore';

export interface ChessMovesProps {
    mode: MovesMode,
    nav: NavigatorMode,
    store: PlayStore
}

export class ChessMoves extends React.Component<ChessMovesProps, {}> {
    /**
     * constructor
     */
    constructor(props: ChessMovesProps) {
        super(props);
    }

    private onChangeKey = (move: string) => {
        const { store } = this.props;
        gameNavigateToKey(store, move);
    }

    private onChangePos = (move: Move) => {
        const { store } = this.props;
        gameNavigateToMove(store, move);
    }

    render() {
        const { store, mode, nav } = this.props;
        const state = store.getState();
        const { game } = state.game;
        const currMove = game.CurrentMove;

        if (mode === MovesMode.Table) {
            return (
                <DumbMoveTable 
                    startPly={game.StartPlyCount}
                    currentMove={currMove}
                    nav={nav} 
                    onChangePos={this.onChangePos} 
                    onChangeKey={this.onChangeKey} />
                
            );
        } else if (mode === MovesMode.List) {
            return (
                <DumbMoveList 
                    startPly={game.StartPlyCount}
                    currentMove={currMove} 
                    nav={nav} 
                    onChangePos={this.onChangePos} 
                    onChangeKey={this.onChangeKey} />
            );
        }

        return null;
    }

}
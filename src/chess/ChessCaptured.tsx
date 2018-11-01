import * as React from 'react';
import { Color, Piece } from 'onix-chess';
import { DumbPiece } from 'onix-board';
import { PlayStore } from './GameStore';

export interface ChessCapturedProps {
    store: PlayStore
}

export class ChessCaptured extends React.Component<ChessCapturedProps, {}> {
    /**
     * constructor
     */
    constructor(props: ChessCapturedProps) {
        super(props);
    }

    render() {
        const { store } = this.props;
        const state = store.getState();
        const { game } = state.game;

        let white = [];
        let whiteWeight = 0;
        let black = [];
        let blackWeight = 0;

        if (game) {
            const captured = game.CurrentPos.Captured;
            for (var i = 0; i < captured.length; i++) {
                var p = captured[i];
                if (p && (p !== Piece.NoPiece)) {
                    const c = Piece.color(p);
                    const t = Piece.type(p);
                    const pc = (
                        <DumbPiece 
                            key={i}
                            piece={p}
                            selected={false}
                            onClick={null} />
                    );
                    if (c === Color.White) {
                        whiteWeight += Piece.Score[t];
                        white.push(pc);
                    } else {
                        blackWeight += Piece.Score[t];
                        black.push(pc);
                    }
                }
            } 
        }

        return (
            <div className="size2 ui-captures">
                <div className="ui-captures-white d-flex flex-row flex-wrap">{white}</div>
                <div className="ui-captures-black d-flex flex-row flex-wrap">{black}</div>
            </div>
        );
    }
}
import * as React from 'react';
import { Chess as ChessGame } from 'onix-chess';
import { NavigatorMode } from './Constants';
import { PlayStore } from './GameStore';
import { MoveNavigator } from './MoveNavigator';
import { GameAction } from './GameActions';
import { Color, Move } from 'onix-chess';

export interface DumbMoveListProps {
    nav: NavigatorMode,
    game: ChessGame,
    startPly: number,
    currentMove: Move,
    onChangePos: (move: Move) => void,
    onChangeKey: (move: string) => void,
}

export class DumbMoveList extends React.Component<DumbMoveListProps, {}> {
    /**
     * constructor
     */
    constructor(props: DumbMoveListProps) {
        super(props);
    }

    private renderNav= (pos: NavigatorMode) => {
        const { nav, currentMove, onChangePos } = this.props;
        return nav ===  pos? (
                <MoveNavigator currentMove={currentMove} onChange={onChangePos} key={currentMove.moveKey} />
        ) : null;
    }

    onMoveClick = (e: React.MouseEvent<HTMLSpanElement>) => {
        const key = e.currentTarget.getAttribute("data-key");
        if (key) {
            const { onChangeKey } = this.props;
            if (onChangeKey) {
                onChangeKey(key);
            }
        }
    }

    private renderMoveNo = (color, ply) => {
        if (color === Color.White) {
            var moveNo = ((ply + 1) >> 1);
            return (
                <span className="moveno" data-moveno={moveNo} key={"mn" + moveNo.toString() }>{moveNo}. </span>
            );
        }

        return null;
    }

    private renderMove = (x: Move, i: number, p: string, c: number, s: string, n?: string, m?: string) => {
        let result = [];
        if (c === Color.White) {
            result.push(this.renderMoveNo(c, i));
        }

        var cc = [(c === Color.White) ? "white_move" : "black_move"];

        if (x.Prev.moveKey === p) {
            cc.push("ui-state-active");
        } else {
            cc.push("ui-state-default");
        }
        
        result.push(
            <span 
                className={cc.join(" ")} 
                data-ply={i} 
                data-key={p} 
                key={p}
                onClick={this.onMoveClick}>{s}</span>
        );

        return result;
    }

    private renderMoves = () => {
        const { currentMove, game } = this.props;
        let moves = []; 
        let move = currentMove.First.Next;

        if (!move.isEnd()) {
            if (move.moveData.Color === Color.Black) {
                moves = moves.concat(
                    this.renderMove(currentMove, -1, "-1", Color.White, "...")
                );
            }

            do {
                const data = move.moveData;
                moves = moves.concat(
                    this.renderMove(currentMove, data.PlyCount, move.moveKey, data.Color, data.San, data.Nag, data.Comments)
                );

                move = move.Next;
            } while (!move.isEnd());
        }

        moves.push(
            <span className="game_result">{game.getResultName('short')}</span>
        );

        return moves;
    }

    render() {
        const { renderNav } = this;
        
        return (
            <div className="ui-movelist-element ui-moves">
                {renderNav(NavigatorMode.Top)}
                <div className="ui-movelist-wrap">
                    {this.renderMoves()}
                </div>
                {renderNav(NavigatorMode.Bottom)}
            </div>
        );
    }

}
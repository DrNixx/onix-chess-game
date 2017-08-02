import * as React from 'react';
import { Logger } from 'onix-core';
import { Chess as ChessGame, Color, Move } from 'onix-chess';
import { AnalysisResult } from 'onix-chess-analyse';
import { NavigatorMode } from './Constants';
import { PlayStore } from './GameStore';
import { MoveNavigator } from './MoveNavigator';
import { GameAction } from './GameActions';

export interface DumbMoveListProps {
    nav: NavigatorMode,
    game: ChessGame,
    analysis: AnalysisResult,
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

        if (m) {
            const evalKey = `cm_${p}`;
            result.push(
                <span key={evalKey} className="ui-comment">{m}</span>
            );
        }

        return result;
    }

    private renderMoves = () => {
        const { currentMove, game, analysis } = this.props;
        let moves = []; 
        let move = currentMove.First.Next;

        Logger.debug("renderMoves", analysis);

        if (!move.isEnd()) {
            if (move.moveData.Color === Color.Black) {
                moves = moves.concat(
                    this.renderMove(currentMove, game.StartPlyCount, "mn0_" + game.StartPlyCount.toString(), Color.White, "...")
                );
            }

            let i = 0;
            do {
                const data = move.moveData;
                const ply = game.StartPlyCount + data.PlyCount;
                let nag = data.Nag || "";
                let comment = data.Comments || "";
                if (analysis && analysis.state == "ready") {
                    const evalItem = analysis.analysis[i];
                    Logger.debug("evalItem", evalItem);
                    if (evalItem) {
                        comment += " " + evalItem.desc + " ";
                        if (evalItem.variation)  {
                            comment += "Best line: { " +  evalItem.variation + " } ";
                        }
                        
                    }
                }

                moves = moves.concat(
                    this.renderMove(currentMove, ply, move.moveKey, data.Color, data.San, data.Nag, comment)
                );

                move = move.Next;
                i++;
            } while (!move.isEnd());
        }

        moves.push(
            <span key="game-result" className="game_result">{game.getResultName('short')}</span>
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
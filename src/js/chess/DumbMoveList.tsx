import * as React from 'react';
import * as ReactDOM from 'react-dom'
import * as classNames from 'classnames';
import { Logger } from 'onix-core';
import { Chess as ChessGame, Color, Move } from 'onix-chess';
import { AnalysisResult, Intl as IntlAnalysis } from 'onix-chess-analyse';
import { NavigatorMode } from './Constants';
import { PlayStore } from './GameStore';
import { MoveNavigator } from './MoveNavigator';
import { GameAction } from './GameActions';
import { IOpening } from './IOpening';

export interface DumbMoveListProps {
    nav: NavigatorMode,
    game: ChessGame,
    analysis: AnalysisResult,
    opeinig?: IOpening,
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
        IntlAnalysis.register();
    }

    componentDidUpdate(prevProps) {
        // only scroll into view if the active item changed last render
        if (this.props.currentMove.moveKey !== prevProps.currentMove.moveKey) {
            this.ensureActiveItemVisible();
        }
    }

    ensureActiveItemVisible() {
        var itemComponent = this.refs.activeItem;
        if (itemComponent) {
            var domNode = ReactDOM.findDOMNode(itemComponent);
            this.scrollElementIntoViewIfNeeded(domNode);
        }
    }

    scrollElementIntoViewIfNeeded(domNode) {
        // var containerDomNode = ReactDOM.findDOMNode(this);
        // Determine if `domNode` fully fits inside `containerDomNode`.
        // If not, set the container's scrollTop appropriately.
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

    private renderMove = (x: Move, i: number, p: string, c: number, s: string, n?: string, m?: string, classes?: any) => {
        let result = [];
        if (c === Color.White) {
            result.push(this.renderMoveNo(c, i));
        }

        const myclass = {
            ['white_move']: (c === Color.White),
            ['black_move']: (c === Color.Black),
            ['ui-state-active']: (x.Prev.moveKey === p),
            ['ui-state-default']: (x.Prev.moveKey !== p),
        };

        const moveClasses = classNames(myclass, classes);

        
        result.push(
            <span 
                className={moveClasses} 
                data-ply={i} 
                data-key={p} 
                key={p}
                onClick={this.onMoveClick}>{s}</span>
        );

        if (n) {
            const evalKey = `ng_${p}`;
            result.push(
                <span key={evalKey} className="ui-nag">{n}</span>
            );
        }

        if (m) {
            const evalKey = `cm_${p}`;
            result.push(
                <span key={evalKey} className="ui-comment">{m}</span>
            );
        }

        return result;
    }

    private renderMoves = () => {
        const { currentMove, game, analysis, opeinig } = this.props;
        let moves = []; 
        let move = currentMove.First.Next;

        if (opeinig && opeinig.name) {
            moves.push(
                <span key="opening" className="ui-comment ui-opening">{opeinig.code} {opeinig.name}</span>
            );
        }

        Logger.debug("renderMoves", analysis);

        if (!move.isEnd()) {
            if (move.moveData.Color === Color.Black) {
                moves = moves.concat(
                    this.renderMove(currentMove, game.StartPlyCount, "mn0_" + game.StartPlyCount.toString(), Color.White, "...")
                );
            }

            let i = 1;
            do {
                const data = move.moveData;
                const ply = game.StartPlyCount + data.PlyCount;
                let nag = data.Nag || "";
                const comments = [];
                if (data.Comments) {
                    comments.push(data.Comments);
                }

                const classes = {};
                if (analysis && analysis.state == "ready") {
                    const evalItem = analysis.analysis[i];
                    Logger.debug("evalItem", evalItem);
                    if (evalItem) {
                        comments.push(evalItem.desc);

                        classes['best'] = !evalItem.best;
                        if (evalItem.judgment) {
                            if (evalItem.judgment.glyph) {
                                nag = evalItem.judgment.glyph.symbol;
                            }

                            switch (evalItem.judgment.name) {
                                case "Blunder":
                                    classes['blunder'] = true;
                                    break;
                                case "Mistake":
                                    classes['mistake'] = true;
                                    break;
                                case "Inaccuracy":
                                    classes['inaccuracy'] = true;
                                    break;
                            }

                            comments.push(evalItem.judgment.comment);
                        }

                        if (evalItem.variation)  {
                            const sign = (evalItem.ceilPawn > 0) ? "+" : "";
                            comments.push(" { " +  evalItem.variation + " " + sign + evalItem.ceilPawn + " }");
                        }
                        
                    }
                }

                const comment = (comments.length > 0) ? comments.join(" ") : null;

                moves = moves.concat(
                    this.renderMove(currentMove, ply, move.moveKey, data.Color, data.San, nag, comment, classes)
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
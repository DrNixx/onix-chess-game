import * as React from 'react';
import { Move } from 'onix-chess';

export interface MoveNavigatorProps {
    currentMove: Move,
    onChange: (move: Move) => void,
}

export class MoveNavigator extends React.Component<MoveNavigatorProps, {}> {
    /**
     * constructor
     */
    constructor(props: MoveNavigatorProps) {
        super(props);
    }

    private setCurrentMove = (move: Move) => {
        const { onChange } = this.props;
        if (onChange) {
            onChange(move);
        };
    }

    private moveFirst = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.getAttribute('disabled') === null) {
            const { currentMove } = this.props;
            if (!currentMove.isFirst()) {
                this.setCurrentMove(currentMove.First);
            }
        }
        
    }

    private movePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.getAttribute('disabled') === null) {
            const { currentMove } = this.props;
            if (!currentMove.isFirst()) {
                this.setCurrentMove(currentMove.Prev.Prev);
            }
        }
    }

    private moveNext = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.getAttribute('disabled') === null) {
            const { currentMove } = this.props;
            if (!currentMove.isEnd()) {
                this.setCurrentMove(currentMove);
            }
        }
    }

    private moveLast = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.getAttribute('disabled') === null) {
            const { currentMove } = this.props;
            if (!currentMove.isEnd()) {
                this.setCurrentMove(currentMove.Last);
            }
        }
    }

    render() {
        const { currentMove } = this.props;
        const { moveFirst, movePrev, moveNext, moveLast } = this;
        const btnClass = "btn btn-mini";

        return (
            <div className="btn-group move-nav">
                <button className={btnClass} disabled={currentMove.isFirst()} onClick={moveFirst}><i className="xi-page-first"></i></button>
                <button className={btnClass} disabled={currentMove.isFirst()} onClick={movePrev}><i className="xi-page-prev"></i></button>
                <button className={btnClass} disabled={currentMove.isEnd()} onClick={moveNext}><i className="xi-page-next"></i></button>
                <button className={btnClass} disabled={currentMove.isEnd()} onClick={moveLast}><i className="xi-page-last"></i></button>
            </div>
        );
    }
}
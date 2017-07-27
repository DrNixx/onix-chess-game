import * as React from 'react';
import * as classNames from 'classnames';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { registerStrings } from '../Intl';
import { Intl } from 'onix-core';
import { MovesMode, NavigatorMode } from './Constants';
import { BoardMode, BoardSize, BoardSizeClass, ChessBoard, ChessDragLayer } from 'onix-board';
import { ChessMoves } from './ChessMoves';
import { ChessCaptured } from './ChessCaptured';
import { PlayStore } from './GameStore';
import { Tabs, Tab, Row, Col, Button } from 'onix-ui';


export interface DumbGameProps {
    store: PlayStore,
    onPgnChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void,
    onLoadPgn?: () => void,
}

export interface DumbGameState {
}

@DragDropContext(HTML5Backend)
export class DumbGame extends React.Component<DumbGameProps, DumbGameState> {
    constructor(props: DumbGameProps) {
        super(props);
        registerStrings();
        this.state = {}
    }

    private renderMoves? = (store: PlayStore) => {
        return (
            <div className="moves-wrapper">
                <ChessMoves mode={MovesMode.List} store={store} nav={NavigatorMode.Top} />
            </div>
        );
    }

    private renderCaptures? = (store: PlayStore) => {
        return (
            <div className="captures-wrapper">
                <ChessCaptured store={store} />
            </div>
        );
    }

    private renderPgn? = (store: PlayStore) => {
        const state = store.getState();
        const { mode, pgn, key } = state.game;
        const { onLoadPgn, onPgnChange } = this.props;

        const command = BoardMode.Pgn ? (
            <div className="pgn-command">
                <Button state="default" onClick={onLoadPgn}>{Intl.t("app", "load")}</Button>
            </div>
        ) : null;

        return pgn ? (
            <Tab eventKey="pgn" title="PGN">
                <div className="pgn-wrapper">
                    <div className="pgn-text">
                        <textarea className="pgn-body" defaultValue={pgn} onChange={onPgnChange} spellCheck={false}></textarea>
                    </div>
                    {command}  
                </div>
            </Tab>
        ) : null;
    }

    private renderControls? = (store: PlayStore) => {
        const state = store.getState();
        const { pgn, key } = state.game;

        return (
            <div className="controls">
                <Tabs className="tabs" id={key + "-tabs"}>
                    <Tab eventKey="moves" title="Moves">
                        {this.renderMoves(store)}
                        {this.renderCaptures(store)}
                    </Tab>
                    <Tab eventKey="info" title="Info">
                        12345
                    </Tab>
                    {this.renderPgn(store)}
                    <Tab eventKey="settings" title="Settings">
                        12345
                    </Tab>
                </Tabs>
            </div>
        );
    }

    render() {
        const { store } = this.props;
        const state = store.getState();
        const { size, position } = state.board;
        const { key, mode, legal } = state.game;

        const dnd = (mode === BoardMode.Setup) || (mode >= BoardMode.Analyze);

        return (
            <div key={key} className="game-play">
                <Row>
                    <Col md={12}>
                        <div className="game-body">
                            <div className="board-container">
                                <ChessBoard
                                    store={this.props.store}
                                    dnd={dnd}
                                    legal={false}
                                    getPiece={position.getPiece} />
                                <ChessDragLayer size={size} />
                            </div>
                            {this.renderControls(store)}
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}
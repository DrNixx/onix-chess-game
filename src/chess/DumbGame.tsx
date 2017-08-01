import * as React from 'react';
import * as classNames from 'classnames';
import { ResponsiveContainer, AreaChart, XAxis, YAxis, Area, Tooltip, CartesianGrid } from 'recharts';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { registerStrings } from '../Intl';
import { Intl } from 'onix-core';
import { MovesMode, NavigatorMode } from './Constants';
import { BoardMode, BoardSize, BoardSizeClass, ChessBoard, ChessDragLayer } from 'onix-board';
import { ChessMoves } from './ChessMoves';
import { ChessCaptured } from './ChessCaptured';
import { PlayStore, PlayState, gameNavigateToPly } from './GameStore';
import { AnalyseGraph } from 'onix-chess-analyse';
import { Tabs, Tab, Row, Col, Button, FormGroup, ControlLabel, TextWithCopy } from 'onix-ui';
import { GameState } from "./GameState";


export interface DumbGameProps {
    store: PlayStore,
    onPgnChange?: (e: React.FormEvent<HTMLTextAreaElement>) => void,
    onLoadPgn?: () => void,
    onRequestAnalyse?: () => void,
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
        const { game } = state;
        const { pgn, key } = game;

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
                    {game.mode === BoardMode.Pgn ? this.renderPgn(store) : null}
                    <Tab eventKey="settings" title="Settings">
                        12345
                    </Tab>
                </Tabs>
            </div>
        );
    }

    private onPlyClick = (ply: number) => {
        const { store } = this.props;
        gameNavigateToPly(store, ply);
    }

    private renderCounters? = (store: PlayStore) => {
        const state = store.getState();
        const { game, analysis } = state;

        if (game !== null) {
            const { pgn, key, final_fen } = game;

            return (
                <Row>
                    <Col md={6} sm={15}>
                        <div className="counters">
                            <Tabs className="tabs" id={key + "-tabs2"}>
                                <Tab eventKey="analysis" title="Computer analysis">
                                    <AnalyseGraph 
                                        id={game.id}
                                        store={store} 
                                        onPositionDotClick={this.onPlyClick} />
                                </Tab>
                                <Tab eventKey="movetime" title="Move times">
                                    ---
                                </Tab>
                                <Tab eventKey="fenpgn" title="FEN &amp; PGN">
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup controlId="fen">
                                                <ControlLabel>{Intl.t("chess", "fen")}</ControlLabel>
                                                <TextWithCopy value={final_fen} scale="small" placeholder={Intl.t("chess", "fen")} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={12}>
                                            <div className="pgn-wrapper">
                                                <div className="pgn-text">
                                                    <textarea className="pgn-body" defaultValue={pgn} rows={12} spellCheck={false}></textarea>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Tab>
                            </Tabs>
                        </div>
                    </Col>
                </Row>
            );
        } else {
            return null;
        }
    }

    render() {
        const { store } = this.props;
        const state = store.getState();
        const { size, position } = state.board;
        const { key, mode, legal, insite, completed } = state.game;

        const dnd = (mode === BoardMode.Setup) || (mode >= BoardMode.Analyze);

        return (
            <div key={key} className="game-play">
                <Row>
                    <Col md={12}>
                        <div className="game-body">
                            <div className="board-container">
                                <ChessBoard
                                    store={store}
                                    dnd={dnd}
                                    legal={false}
                                    getPiece={position.getPiece} />
                                <ChessDragLayer size={size} />
                            </div>
                            {this.renderControls(store)}
                        </div>
                    </Col>
                </Row>
                { (insite && completed && mode > BoardMode.Pgn) ? this.renderCounters(store) : null }
            </div>
        );
    }
}
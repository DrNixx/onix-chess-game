import * as React from 'react';
import * as classNames from 'classnames';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ResponsiveContainer, BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'rechart';
import { registerStrings } from '../Intl';
import { Intl, intVal } from 'onix-core';
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

    private renderMovetime? = (game: GameState) => {
        if (game.players && 
            game.players.white && game.players.white.moveCentis &&
            game.players.black && game.players.black.moveCentis) {

            const { white, black } = game.players;
            let data = [];

            const len = Math.max(white.moveCentis.length, black.moveCentis.length);
            for (let i = 0; i < len; i++) {
                data.push({
                    ply: i + 1,
                    white: intVal(white.moveCentis[i] / 100),
                    black: intVal(black.moveCentis[i] / 100),
                });
            }            

            return (
                <Tab eventKey="movetime" title="Move times">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={data} stackOffset="sign" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <XAxis dataKey="ply" hide={true} />
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <ReferenceLine y={0} stroke='#000'/>
                            <Bar dataKey="white" fill="#8884d8" stackId="stack" />
                            <Bar dataKey="black" fill="#82ca9d" stackId="stack" />
                        </BarChart>
                    </ResponsiveContainer>
                </Tab>
            );
        } else {
            return null;
        }
    }

    private renderCounters? = (store: PlayStore) => {
        const state = store.getState();
        const { game, analysis } = state;

        // { this.renderMovetime(game) }

        if (game !== null) {
            const { pgn, key, final_fen, game: engine } = game;
            const currentPly = engine.CurrentMove.PlyCount - 1;

            return (
                <Row>
                    <Col md={6} sm={15}>
                        <div className="counters">
                            <Tabs className="tabs" id={key + "-tabs2"}>
                                <Tab eventKey="analysis" title="Computer analysis">
                                    <AnalyseGraph 
                                        id={game.id}
                                        store={store} 
                                        currentPly={currentPly}
                                        onPositionDotClick={this.onPlyClick} />
                                </Tab>
                                { this.renderMovetime(game) }
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
        const { key, mode, insite, result } = state.game;

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
                { (insite && (result > 0) && mode > BoardMode.Pgn) ? this.renderCounters(store) : null }
            </div>
        );
    }
}
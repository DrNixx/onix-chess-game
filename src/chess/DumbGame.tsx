import * as React from 'react';
import * as classNames from 'classnames';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { AnalyseGraphAsync } from 'onix-chess-analyse/dist/analyse/AnalyseGraphAsync';
import { MovesGraphAsync } from 'onix-chess-movetimes/dist/chess/MovesGraphAsync';
import { Intl } from '../Intl';
import { Intl as IntlCore } from 'onix-core';
import { MovesMode, NavigatorMode } from './Constants';
import { BoardMode, BoardSizeClass, ChessBoard, ChessDragLayer } from 'onix-board';
import { ChessMoves } from './ChessMoves';
import { ChessCaptured } from './ChessCaptured';
import { PlayStore, gameNavigateToPly } from './GameStore';
import { Tabs, Tab, Row, Col, Button, FormGroup, ControlLabel, TextWithCopy } from 'onix-ui';
import { GameState } from "./GameState";
import { GameInfo } from "./GameInfo";



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
        Intl.register();
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
                <Button state="default" onClick={onLoadPgn}>{IntlCore.t("app", "load")}</Button>
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
                    <Tab eventKey="moves" title={IntlCore.t("game", "movesTab")}>
                        {this.renderMoves(store)}
                        {this.renderCaptures(store)}
                    </Tab>
                    <Tab eventKey="info" title={IntlCore.t("game", "infoTab")}>
                        <GameInfo store={store} />
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
            
            const { game: engine } = game;

            return (
                <Tab eventKey="movetime" title="Затраченное время">
                    <MovesGraphAsync 
                        height={400}
                        white={game.players.white.moveCentis} 
                        black={game.players.black.moveCentis}
                        startPly={engine.StartPlyCount}
                        currentPly={engine.CurrentMove.PlyCount - 1}
                        onTurnClick={this.onPlyClick} />
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
            const gameId = game.load ? 0 : game.id;

            return (
                <Row>
                    <Col lg={12}>
                        <div className="counters">
                            <Tabs className="tabs" id={key + "-tabs2"}>
                                <Tab eventKey="analysis" title={IntlCore.t("analyse", "title")}>
                                    <AnalyseGraphAsync 
                                        id={gameId}
                                        store={store} 
                                        height={400}
                                        currentPly={engine.CurrentMove.PlyCount - 1}
                                        onPositionDotClick={this.onPlyClick} />
                                </Tab>
                                { this.renderMovetime(game) }
                                <Tab eventKey="fenpgn" title="FEN &amp; PGN">
                                    <Row>
                                        <Col md={12}>
                                            <FormGroup controlId="fen">
                                                <ControlLabel>{IntlCore.t("chess", "fen")}</ControlLabel>
                                                <TextWithCopy value={final_fen} scale="small" placeholder={IntlCore.t("chess", "fen")} />
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

        const classes = classNames("game-play", BoardSizeClass[size]); 
        
        BoardSizeClass['size'];

        return (
            <div key={key} className={classes}>
                <Row>
                    <Col md={12}>
                        <div className="game-body">
                            <div className="board-container">
                                <ChessBoard
                                    store={store}
                                    dnd={dnd}
                                    legal={false} />
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
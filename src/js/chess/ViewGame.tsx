import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Unsubscribe } from 'redux';
import { Subscription } from 'rxjs';
import { appInstance } from 'onix-app';
import { Logger } from 'onix-core';
import { FenStandartStart, Piece, Square, Chess } from 'onix-chess';
import { BoardSize, BoardSettings, BoardActions as ba, BoardActionConsts as bac } from 'onix-board';
import { GameSettings } from './GameSettings';
import { DumbGame } from './DumbGame';
import { createPlayStore, PlayState, PlayStore, gameTakePgn, gameLoadInsite } from './GameStore';
import { createGameState } from './GameReducer';

export interface ChessGameProps {
    locale?: string,
    board: BoardSettings,
    game: GameSettings,
}

export interface ChessGameState {
    pgn?: string,
}

export class ViewGame extends React.Component<ChessGameProps, ChessGameState> {
    private store: PlayStore;
    private holder: number[] = [];
    private storeUnsubscribe: Unsubscribe;

    private gameSubscrption: Subscription = null;
    private pvtSubscrption: Subscription = null;
    private pubSubscrption: Subscription = null;

    constructor(props: ChessGameProps) {
        super(props);

        const { locale } = this.props;
        const { board, game} = this.props;
        const { size, piece, square, flip, coords, frame, fen: fenb } = board;
        const { pgn, fen: feng } = game;
        
        this.state = {
            pgn: pgn
        };

        const fena = feng || fenb || FenStandartStart;
        const gstate = createGameState(game, fena);

        let analysis = {
                status: "empty",
                white: null,
                black: null,
                evals: []
            };

        if (gstate.analysis && gstate.analysis.analysis && gstate.analysis.analysis.length) {
            analysis = {
                status: gstate.analysis.state,
                white: gstate.analysis.white,
                black: gstate.analysis.black,
                evals: gstate.analysis.analysis
            };
        }

        this.store = createPlayStore({
            intl: {
                locale: locale
            },
            board: {
                size: size || BoardSize.Normal,
                piece: piece || "alpha",
                square: square || "color-brown",
                flip: !!flip,
                coords: (typeof coords !== "undefined") ? !!coords : true,
                frame: (typeof frame !== "undefined") ? !!frame : true,
                moveturn: true,
                position: gstate.game.CurrentPos,
                fen: fena,
                selection: {
                    from: {
                        piece: Piece.NoPiece,
                        square: Square.NullSquare
                    }
                }
            },
            game: gstate,
            analysis: analysis,
        });
    }

    componentDidMount() {
        this.storeUnsubscribe = this.store.subscribe(() =>
            this.updateState()
        );

        const { game } = this.props;
        if (game.id) {
            if (game.load) {
                this.loadGame(game.id, game.insite);
            }
        }
    }

    componentWillUnmount() {
        this.gameDisconnect();
        this.storeUnsubscribe();
    }

    updateState = () => {
        const { store } = this;
        const state = store.getState();
        const { game } = state;
        
        if (game.id && !game.load) {
            this.gameConnect();    
        }

        this.forceUpdate();
    }

    private gameConnect = () => {
        if (appInstance) {
            const { stream } = appInstance;
            const { store, gameMsgHandler, pvtChatHandler, pubChatHandler } = this;
            const { game } = store.getState();

            if (game.channel && !this.gameSubscrption) {
                this.gameSubscrption = stream.subscribe(game.channel, gameMsgHandler);
            }

            if (game.chat_pvt && !this.pvtSubscrption) {
                this.pvtSubscrption = stream.subscribe(game.chat_pvt, pvtChatHandler);
            }

            if (game.chat_pub && !this.pubSubscrption) {
                this.pubSubscrption = stream.subscribe(game.chat_pub, pubChatHandler);
            }
        }
    }

    gameDisconnect = () => {
        const { store } = this;
        const { game } = store.getState();

        if (appInstance) {
            const { stream } = appInstance;

            if (game.channel && this.gameSubscrption) {
                stream.removeChannel(game.channel);
                this.gameSubscrption = null;
            }

            if (game.chat_pvt && this.pvtSubscrption) {
                stream.removeChannel(game.chat_pvt);
                this.pvtSubscrption = null;
            }

            if (game.chat_pub && this.pubSubscrption) {
                stream.removeChannel(game.chat_pub);
                this.pubSubscrption = null;
            }
        }
    }

    gameMsgHandler = (msg) => {
        console.log(msg);
    }

    pvtChatHandler = (msg) => {
        console.log(msg);
    }

    pubChatHandler = (msg) => {
        console.log(msg);
    }

    loadGame = (id: number, insite: boolean) => {
        const { store } = this;
        if (insite) {
            gameLoadInsite(store, id);
        }
    }

    pgnChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
        const { state } = this;
        this.state = {
            ...state,
            pgn: e.currentTarget.value
        };
    }

    loadPgn = () => {
        const { state, store } = this;
        const { pgn } = state;
        gameTakePgn(store, pgn);
    }

    private flipBoard = (flag: boolean) => {
        this.store.dispatch({ type: bac.FLIP_BOARD, flag: flag } as ba.BoardAction);
    }

    render() {
        const { loadPgn, pgnChange  } = this;
        const state: PlayState = this.store.getState();
        Logger.debug(state.board.position.writeFEN());
        return (
            <DumbGame store={this.store} onPgnChange={pgnChange} onLoadPgn={loadPgn} />
        );
    }
}

export const GameBoard = (props: ChessGameProps, container: HTMLElement) => {
    ReactDOM.render(React.createElement(ViewGame, props), container);
};
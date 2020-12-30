import classNames from 'classnames';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Scrollbar from "react-scrollbars-custom";
import { Unsubscribe } from 'redux';
import { Container, Row, Col, FormGroup, FormLabel, FormCheck, Form, Button } from 'react-bootstrap';

import * as cg from 'chessground/types';
import { Chessground } from 'chessground';
import { Api } from 'chessground/api';

import { register } from '../../../i18n';

import { _ } from 'onix-core';
import { BoardSize, BoardSizeClass } from 'onix-board-assets';
import { Chess as ChessEngine, Color, FenString, GameState, i18nRegister as i18nRegisterChess, IChessPlayer } from 'onix-chess';

import { PieceSelector, SizeSelector, SquareSelector, TextWithCopy } from 'onix-chess-ctrls';
import * as BoardActions from '../../BoardActions';
import { BoardStore, createBoardStore } from '../../BoardReducer';
import { BoardSettings, defaultSettings } from '../../settings/BoardSettings';

class ConfigureGameComponent extends React.Component<BoardSettings, {}> {
    public static defaultProps: BoardSettings = defaultSettings;

    private storeUnsubscribe?: Unsubscribe = undefined;

    private store: BoardStore;

    private cg?: Api = undefined;

    private boardElement: HTMLDivElement | null = null;

    constructor(props: BoardSettings) {
        super(props);

        i18nRegisterChess();
        register();

        const { is3d, size, square, piece, orientation, coordinates } = this.props;
        this.store = createBoardStore({
            is3d: !!is3d,
            size: size,
            square: square!,
            piece: piece!,
            orientation: orientation ?? 'white',
            coordinates: !!coordinates
        });
    }

    componentDidMount() {
        const { store } = this;
        const { orientation, coordinates }  = store.getState();

        this.storeUnsubscribe = this.store.subscribe(() =>
            this.updateState()
        );

        this.cg = Chessground(this.boardElement!, {
            fen: FenString.standartStart,
            orientation: orientation,
            coordinates: coordinates,
            viewOnly: true,
            resizable: true
        });

        window.addEventListener("resize", this.redrawBoard);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.redrawBoard);

        const { cg } = this;
        if (cg !== undefined) {
            cg.destroy();
        }

        if (this.storeUnsubscribe) {
            this.storeUnsubscribe();
        }
        
    }

    private redrawBoard = () => {
        const { cg } = this;
        if (cg !== undefined) {
            cg.redrawAll();
        }
    };

    updateState = () => {
        this.forceUpdate();
    };

    private onCoordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.store.dispatch({ type: BoardActions.SET_COORDS } as BoardActions.BoardAction)
    };

    private onSizeChange = (size: BoardSize) => {
        this.store.dispatch({ type: BoardActions.CHANGE_SIZE, size: size } as BoardActions.BoardAction);
    };

    private onPieceChange = (piece: string) => {
        this.store.dispatch({ type: BoardActions.SET_PIECE, piece: piece } as BoardActions.BoardAction);
    };

    private onSquareChange = (square: string) => {
        this.store.dispatch({ type: BoardActions.SET_SQUARE, square: square } as BoardActions.BoardAction);
    };
    
    private renderControls = () => {
        const { props } = this;
        const { size, piece, square, coordinates } = this.store.getState();
        return (
            <div className="controls flex-grow-1">
                <Form method="post">
                    { (props.csrfTokenName && props.csrfTokenValue) ? (<input type="hidden" name={props.csrfTokenName} value={props.csrfTokenValue} />) : "" }
                    { (props.returnUrl) ? (<input type="hidden" name="returnUrl" value={props.returnUrl} />) : "" }
                    <Row>
                        <Col md={12}>
                            <FormGroup controlId="size">
                                <FormLabel>{_("game", "board_size")}</FormLabel>
                                <SizeSelector defaultValue={size} onChangeSize={this.onSizeChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup controlId="piece">
                                <FormLabel>{_("chess", "pieces")}</FormLabel>
                                <PieceSelector defaultValue={piece} onChangePiece={this.onPieceChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormGroup controlId="square">
                                <FormLabel>{_("chess", "squares")}</FormLabel>
                                <SquareSelector defaultValue={square} onChangeSquare={this.onSquareChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <FormCheck 
                                id ="coords" 
                                type="checkbox"
                                value="1" 
                                onChange={this.onCoordsChange} 
                                defaultChecked={coordinates}
                                label={_("game", "display_coord")} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-right" md={12}>
                            <Button type="submit">{_("app", "save")}</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    };

    render() {
        const { store } = this;
        const { square, piece, size, coordinates, orientation, is3d } = store.getState();
        
        if (this.cg) {
            this.cg.set({
                fen: FenString.standartStart,
                orientation: orientation,
                coordinates: coordinates,
            });
        }

        const containerClass = [
            square,
            BoardSizeClass[size],
            { 
                "coords-no": !coordinates,
                "is2d": !is3d,
                "is3d": is3d
            }
        ];

        return (
            <Container fluid={true} className={classNames(containerClass)}>
                <Row>
                    <Col md={12}>
                        <div className="d-block d-lg-flex mb-2">
                            <div>
                                <div className={classNames("board-container", piece)}>
                                    <Row className="py-2">
                                        <Col>
                                            <div className="main-board" ref={el => this.boardElement = el} />
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                            <div className="mini-controls mx-3 mt-5">
                                
                            </div>
                            {this.renderControls()}
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export const ConfigureGame = (props: BoardSettings, container: HTMLElement) => {
    ReactDOM.render(React.createElement(ConfigureGameComponent, props), container, () => { });
};
import * as React from 'react';
import { Intl as IntlCore, sprintf } from 'onix-core';
import { Row, Col } from 'onix-ui';
import { PlayStore } from './GameStore';
import { GameState } from './GameState';

export interface GameInfoProps {
    store: PlayStore
}

export class GameInfo extends React.Component<GameInfoProps, {}> {
    constructor(props: GameInfoProps) {
        super(props);
    }

    renderInfo(game: GameState) {
        return (
            <span className="info">(
            { game.private ? (
                <span className="is_private">{IntlCore.t("game", "privateGame")}, </span>
            ) : null }
            { game.rated ? (
                <span className="is_rated">{IntlCore.t("game", "ratedGame")}</span>
            ) : (
                <span className="is_unrated">{IntlCore.t("game", "unratedGame")}</span>
            )
            }
            )</span>
        );
    }

    renderName(game: GameState) {
        if (game.trn_id && game.trn_name) {
            const trnUrl = `https://www.chess-online.com/tournaments/${game.trn_id}`;
            return (
                <div className="game-name game-trn">{IntlCore.t("game", "tournament")}:
                    <a href={trnUrl} target="_blank">{game.trn_name}</a>
                    {this.renderInfo(game)}
                </div>
            )
        } else {
            return (
                <div className="game-name">
                    {game.event}
                    {this.renderInfo(game)}
                </div>
            )
        }
    }

    renderDates(game: GameState) {
        if (game.result > 0) {
            let from = new Date(game.createdAt).toLocaleString();
            let to = new Date(game.lastMoveAt).toLocaleString();
            let fmt = IntlCore.t("game", "datesFmt");
            let strDates = sprintf(fmt, from, to);
            return (
                <span>{IntlCore.t("game", "completeState")}.
                    <span>{strDates}</span>
                </span>
            );
        }

        return (
            <span>{IntlCore.t("game", "startDate")}: <span>{new Date(game.createdAt).toLocaleString()}</span></span>
        );
    }

    renderResult(game: GameState) {
        if (game.result > 0) {
            const { white, black } = game.players;
            let fmt: string,
                resStr: string;

            if (game.result == 1) {
                if (white.display && (white.display != white.name)) {
                    fmt = IntlCore.t("game", "gameResultWhite");
                    resStr = sprintf(fmt, white.display, white.name, game.result_name);
                } else {
                    fmt = IntlCore.t("game", "gameResultWhite1");
                    resStr = sprintf(fmt, white.name, game.result_name);
                }
                
                return (
                    <div className="game-result">
                        <span className="result-white">{resStr}</span>
                    </div>
                );
            } else if (game.result == 2) {
                if (black.display && (black.display != black.name)) {
                    fmt = IntlCore.t("game", "gameResultBlack");
                    resStr = sprintf(fmt, black.display, black.name, game.result_name);
                } else {
                    fmt = IntlCore.t("game", "gameResultBlack1");
                    resStr = sprintf(fmt, black.name, game.result_name);
                }
                
                return (
                    <div className="game-result">
                        <span className="result-black">{resStr}</span>
                    </div>
                );
            } else {
                return (
                    <div className="game-result">
                        <span className="result-draw">{IntlCore.t("game", "gameResultDraw")}</span>
                    </div>
                );
            }
        }

        return null;
    }

    render() {
        const { store } = this.props;
        const state = store.getState();
        const { game } = state;

        
        
        return (
            <div className="ui-game-info">
                {this.renderName(game)}
                <div className="game-dates">{this.renderDates(game)}</div>
                {this.renderResult(game)}
                <div className="game-tk">
                    <span>{IntlCore.t("game", "timeControl")}: 
                        <span>{game.clock.limit} ({game.clock.can_pause ? IntlCore.t("game", "canPostpone") : IntlCore.t("game", "noPostpone") })</span>
                    </span>
                </div>
                <div className="game-comp">{IntlCore.t("game", "useCompHints")}: 
                    <span className="game-comp-label">
                    { game.advance ? (
                        <span className="is_allow">{IntlCore.t("game", "allow")}, </span>
                    ) : (
                        <span className="is_denied">{IntlCore.t("game", "denied")}, </span>
                    )
                    }
                    </span>
                </div>
            </div>
        );

/*
Простая партия
Турнир: нет
Начата: 03.05.2012 12:34:44
Контроль времени: Адванс 30+2/30
Приватная, Рейтинговая
Отпуск: разрешен
Использование подсказок компьютера: разрешено
*/
    }
}
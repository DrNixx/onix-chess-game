import * as React from 'react';
import { Intl as IntlCore } from 'onix-core';
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
            return (
                <span>{IntlCore.t("game", "completeDate")}:
                    <span>{new Date(game.lastMoveAt).toLocaleString()}</span>
                    | 
                    <span className="result-name">{game.result_name}</span>
                </span>
            );
        }

        return (
            <span>{IntlCore.t("game", "startDate")}: <span>{new Date(game.createdAt).toLocaleString()}</span></span>
        );
    }

    render() {
        const { store } = this.props;
        const state = store.getState();
        const { game } = state;

        
        
        return (
            <div className="ui-game-info">
                {this.renderName(game)}
                <div className="game-dates">{this.renderDates(game)}</div>
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
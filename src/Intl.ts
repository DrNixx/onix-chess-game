import { Intl as IntlCore } from 'onix-core';
import { Intl as IntlBoard } from 'onix-board';
import { Intl as IntlAnalysis } from 'onix-chess-analyse';

export class Intl {
    private static intlInitialized = false;

    public static register() {
        if (!Intl.intlInitialized) {
            
            IntlBoard.register();
            IntlAnalysis.register();

            IntlCore.registerStrings('app', {
                'ru-ru': {
                    load: "Загрузить",
                    send: "Отправить",    
                },

                'en-us': {
                    load: "Load",
                    send: "Send",    
                }
            });

            IntlCore.registerStrings('game', {
                'ru-ru': {
                    movesTab: "Ходы",
                    infoTab: "Информация",
                    startDate: "Начата",
                    completeDate: "Завершена",
                    completeState: "Игра завершена",
                    datesFmt: "Партия продолжалась с %s по %s",
                    tournament: "Турнир", 
                    noTrn: "нет",
                    canPostpone: "отпуск разрешен",
                    noPostpone: "без отпуска",
                    timeControl: "Контроль времени",
                    privateGame: "Приватная",
                    ratedGame: "Рейтинговая",
                    unratedGame: "Без рейтинга",
                    useCompHints: "Использование подсказок компьютера",
                    allow: "разрешено",
                    denied: "запрещено",
                    gameResultWhite: "Белыми фигурами победил %s (%s) - %s",
                    gameResultWhite1: "Белыми фигурами победил %s - %s",
                    gameResultBlack: "Черными фигурами победил %s (%s) - %s",
                    gameResultBlack1: "Черными фигурами победил %s - %s", 
                    gameResultDraw: "В партии зафиксирована ничья",
                    infoLoading: "Информация загружается...",
                    send: "Отправить",    
                },

                'en-us': {
                    movesTab: "Moves",
                    infoTab: "Information",
                    startDate: "Started",
                    completeDate: "Completed",
                    completeState: "Game complete",
                    datesFmt: "Game was playing sinse %s to %s",
                    tournament: "Tournament", 
                    noTrn: "none",
                    canPostpone: "отпуск разрешен",
                    noPostpone: "без отпуска",
                    timeControl: "Time control",
                    privateGame: "Private",
                    ratedGame: "Rated",
                    unratedGame: "Unrated",
                    useCompHints: "Using computer hints",
                    allow: "allow",
                    denied: "denied", 
                    gameResultWhite: "%s (%s) wins by white - %s",
                    gameResultWhite1: "%s wins by white - %s",
                    gameResultBlack: "%s (%s) wins by black - %s",
                    gameResultBlack1: "%s wins by black - %s",
                    gameResultDraw: "The game ended a draw",
                    infoLoading: "Loading...",
                    send: "Send",    
                }
            });

            Intl.intlInitialized = true;
        }
    }
}

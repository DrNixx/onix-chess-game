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
                    infoTab: "Информация",
                    startDate: "Начата",
                    completeDate: "Завершена",
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
                    send: "Отправить",    
                },

                'en-us': {
                    infoTab: "Information",
                    startDate: "Started",
                    completeDate: "Completed",
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
                    send: "Send",    
                }
            });

            Intl.intlInitialized = true;
        }
    }
}

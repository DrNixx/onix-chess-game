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

            Intl.intlInitialized = true;
        }
    }
}

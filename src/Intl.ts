import { Intl as IntlCore } from 'onix-core';
import { registerStrings as IntlBoard } from 'onix-board';

var intlInitialized = false;

export function registerStrings() {
    if (!intlInitialized) {
        
        IntlBoard();

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

        intlInitialized = true;
    }
}

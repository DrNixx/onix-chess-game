import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ViewGame } from '../chess/ViewGame';

export const ViewGameTest = (props, container: HTMLElement) => {
    ReactDOM.render(React.createElement(ViewGame, props), container, () => {});
};
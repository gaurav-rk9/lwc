import { LightningElement, api } from 'lwc';

let testClick;

export default class Spread extends LightningElement {
    @api
    get testClick() {
        return testClick;
    }
    set testClick(val) {
        testClick = val;
    }

    spreadObject = {
        onclick: function () {
            testClick('lwc:spread handler called');
        },
    };

    eventHandlers = {
        click: function () {
            testClick('lwc:on handler called');
        },
    };
}

class UIGamePage{
    constructor(app){
        this.app = app;

        this.initDOMElements();
    }

    initDOMElements(){
        this.DOMElement = this.app.el.querySelector('#game');    
    }
}
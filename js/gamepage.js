class UIGamePage{
    constructor(app){
        this.app = app;

        this.initDOMElements();
    }

    initDOMElements(){
        this.DOMElement = this.app.el.querySelector('#game');    
    }

    startGame(){
        this.players = [];
        this.allElements = [];

        this.playerOne = new Player('#perso_01', this.app.characterGamerClassName1, 81, 68, 90, 83, 65, 69, 4, -90);
        this.playerTwo = new Player('#perso_02', this.app.characterGamerClassName2, 102, 100, 101, 104, 103, 105, 4, 90);
        
        this.playerOne.collisionList.push(this.playerTwo);
        this.playerTwo.collisionList.push(this.playerOne);
        
        
        this.players.push(this.playerOne);
        this.players.push(this.playerTwo);

        // ON met tous les éléments dans le tableau, y compris les joueurs
        this.allElements.push(this.playerOne);
        this.allElements.push(this.playerTwo);

        this.initKeyboardListener();
    }

    render(){
        this.playerOne.render();
        this.playerTwo.render();
    }

      /* MOVE PLAYER */

    initKeyboardListener(){
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(event){
        this.playerOne.onKeyDown(event);
        this.playerTwo.onKeyDown(event);
    }

    onKeyUp(event){
        this.playerOne.onKeyUp(event);
        this.playerTwo.onKeyUp(event);
    }

    onKeyPress(event){
        this.playerOne.onKeyPress(event);
        this.playerTwo.onKeyPress(event);
    }
}
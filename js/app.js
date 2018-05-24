class App {

    /**
     * @constructor
     */
    constructor() {
        this.el = null;              // Parent DOM Element
        this.gameStarted = false;    // Game is running or not
        this.characterGamer1 = null; // character chosen by player 1
        this.characterGamer2 = null; // character chosen by player 2

        this.gameIsStarted = false;

        this.players = [];
        this.allElements = [];


        this.playerOne = new Player('#perso_01', 81, 68, 90, 83, 65, 69, 7, -90);
        this.playerTwo = new Player('#perso_02', 102, 100, 101, 104, 103, 105, 7, -90);
        this.players.push(this.playerOne);
        this.players.push(this.playerTwo);

        // ON met tous les éléments dans le tableau, y compris les joueurs
        this.allElements.push(this.playerOne);
        this.allElements.push(this.playerTwo);

        this.initKeyboardListener();
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

    moveCharacter(){
        this.playerOne.moveCharacter(); 
        this.playerTwo.moveCharacter();
    }

    checkCollision(){
        this.playerOne.checkCollision();
        this.playerTwo.checkCollision();
    }

    /* COLLISIONS */
    // checkAllCollision(){
    //     for(let i = 0; i< this.players.length; i++) {
    //         let player = this.players[i];
    //         player.checkCollision(this.allElements);
    //     }
    // }

    /**
     * Init Application
     */
    
    start() {
        this.initDOMElements();
        this.initEvents();

        this.UIhomePage = new UIHomePage(this);
        this.UIGamePage = new UIGamePage(this);

        this.loop();
    }

    /**
     * Link to DOM elements
     */
    initDOMElements() {
        this.el = document.querySelector('#app');
        
        this.container_game = document.querySelector('#game');
        this.player1 = document.querySelector('#perso_01');
        this.player2 = document.querySelector('#perso_02');

        console.log('this.player1', this.player1);

    }

    /**
     * Events
     */
    initEvents() {

    }

    /**
     * Eternal loop
     */
    loop() {
        var self = this;

        requestAnimationFrame(function () {
            self.render();

            if(self.gameIsStarted){
                self.moveCharacter();
                self.checkCollision();
                // self.checkAllCollision();
            }
            self.loop();
        })
    }

    /**
     * Render App and all views
     */
    render() {
        if (!this.gameStarted) {
            this.UIhomePage.render();
        }
    }

    /**
     *
     * @param character
     */
    onChooseCharacter(character, characterChosenName) {
        // Second click on character, remove data
        if (this.characterGamer1 === character) {
            this.UIhomePage.removeCharacter01vs(character, characterChosenName);
            this.characterGamer1 = null;
            return;
        }

        // Second click on character, remove data
        if (this.characterGamer2 === character) {
            this.UIhomePage.removeCharacter02vs(character, characterChosenName);
            this.characterGamer2 = null;
            return;
        }

        // Set new Value
        if (this.characterGamer1 == null) {
            this.characterGamer1 = character;
            this.UIhomePage.addCharacter01vs(character, characterChosenName);
        }
        else if (this.characterGamer2 == null) {
            this.characterGamer2 = character;
            this.UIhomePage.addCharacter02vs(character, characterChosenName);
        }

        console.log('Player 1 is :', this.characterGamer1);
        console.log('Player 2 is :', this.characterGamer2);
    }

    goToGame(){
        console.log('Gotogame');
        console.log('this.UIhomePage.DOMElement.style.display', this.UIhomePage.DOMElement.style.display)
        
        this.gameIsStarted = true;

        let uiHomePageCurrentDisplay = this.UIhomePage.DOMElement.currentStyle ? 
            this.UIhomePage.DOMElement.currentStyle.display :
            getComputedStyle(this.UIhomePage.DOMElement, null).display;

        console.log('uiHomePageCurrentDisplay', uiHomePageCurrentDisplay)
        
        if(uiHomePageCurrentDisplay == "block"){
            this.UIhomePage.DOMElement.style.display = "none";
            this.UIGamePage.DOMElement.style.display = "block";
        }
    }
}


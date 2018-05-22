class App {

    /**
     * @constructor
     */
    constructor() {
        this.el = null;              // Parent DOM Element
        this.gameStarted = false;    // Game is running or not
        this.characterGamer1 = null; // character chosen by player 1
        this.characterGamer2 = null; // character chosen by player 2

        this.players = [];
        this.allElements = [];

        this.playerOne = new Player('#perso_01', 81, 68, 90, 83, 65, 69, 5);
        this.playerTwo = new Player('#perso_02', 102, 100, 101, 104, 103, 105, 5);
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

    /* COLLISIONS */
    checkAllCollision(){
        for(let i = 0; i< this.players; i++) {
            let player = this.players[i];
            player.checkCollision(this.allElements);
        }
    }

    /**
     * Init Application
     */
    start() {
        this.initDOMElements();
        this.initEvents();

        this.UIhomePage = new UIHomePage(this);

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
            self.moveCharacter();
            self.checkAllCollision();
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
    onChooseCharacter(character) {

        // Second click on character, remove data
        if (this.characterGamer1 === character) {
            this.characterGamer1 = null;
            return;
        }

        // Second click on character, remove data
        if (this.characterGamer2 === character) {
            this.characterGamer2 = null;
            return;
        }

        // Set new Value
        if (this.characterGamer1 == null) {
            this.characterGamer1 = character;
        }
        else if (this.characterGamer2 == null) {
            this.characterGamer2 = character;
        }

        console.log('Player 1 is :', this.characterGamer1);
        console.log('Player 2 is :', this.characterGamer2);
    }
}


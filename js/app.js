class App {

    /**
     * @constructor
     */
    constructor() {
        this.el = null;              // Parent DOM Element
        this.gameStarted = false;    // Game is running or not

        this.characterGamer1 = null; // character chosen by player 1
        this.characterGamerClassName1 = null; 

        this.characterGamer2 = null; // character chosen by player 2
        this.characterGamerClassName2 = null; 

        this.gameIsStarted = false;

    }

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
                self.UIGamePage.render(); 
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
    onChooseCharacter(character, characterChosenName, characterChosenClassName) {
        // Second click on character, remove data
        if (this.characterGamer1 === character) {
            this.UIhomePage.removeCharacter01vs(character, characterChosenName);
            this.characterGamer1 = null;
            this.characterGamerClassName1 = null;
            return;
        }

        // Second click on character, remove data
        if (this.characterGamer2 === character) {
            this.UIhomePage.removeCharacter02vs(character, characterChosenName);
            this.characterGamer2 = null;
            this.characterGamerClassName2 = null;
            return;
        }

        // Set new Value
        if (this.characterGamer1 == null) {
            this.characterGamer1 = character;

            this.characterGamerClassName1 = characterChosenClassName;
            this.UIhomePage.addCharacter01vs(character, characterChosenName);
        }
        else if (this.characterGamer2 == null) {
            this.characterGamer2 = character;

            this.characterGamerClassName2 = characterChosenClassName;
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

            this.UIGamePage.startGame();
        }
    }
}


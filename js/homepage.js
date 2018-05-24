class UIHomePage {

    /**
     * @constructor
     *
     * @param app
     */
    constructor(app) {
        this.app = app;

        this.el = null; // Parent DOM Element

        this.initDOMElements();
        this.initEvents();
    }

    /**
     * Link to DOM elements
     */
    initDOMElements() {
        this.DOMElement = this.app.el.querySelector('#homepage');

        this.characterSelector = this.DOMElement.querySelector('#character-selector');

        this.charactersList = this.characterSelector.querySelectorAll('.character');
        
        this.buttonStartGame = this.DOMElement.querySelector('#start-game');

        this.character_01 = this.characterSelector.querySelectorAll('.character_01'); 
        this.character_02 = this.characterSelector.querySelectorAll('.character_02');
        this.character_03 = this.characterSelector.querySelectorAll('.character_03');
        this.character_04 = this.characterSelector.querySelectorAll('.character_04');

        this.character_vs_01 = this.DOMElement.querySelector('#character_vs_01');
        this.character_vs_02 = this.DOMElement.querySelector('#character_vs_02');
    }

    /**
     * Events
     */
    initEvents() {
        // Events on characters list
        for (let i = 0; i < this.charactersList.length; i++) {
            let a = this.charactersList[i];
            a.addEventListener('click', this.onChooseCharacter.bind(this));
        }

        // Event on button start
        this.buttonStartGame.addEventListener('click', this.onStartGame.bind(this));
    }

     
    /**
     * On choose character in list
     *
     * @param event
     */
    onChooseCharacter(event) {
        event.preventDefault();

        let characterChosen = event.target;

        let characterChosenData = characterChosen.dataset.character;
        
        let characterChosenName = characterChosen.querySelector('p').innerText;

        let characterChosenClassName = characterChosen.dataset.characterclassname;

        console.log('characterChosenName', characterChosenName)

        console.log('characterChosenData', characterChosenData); 

        ///////////////// IMG CORRESPONING TO THE SELECTED PLAYER /////////////////

        // if(characterChosenData = this.character_01){
        //     this.app.player_1.classList.add(".perso_1_img", "perso_1_position")
        // }

        // if(characterChosenData = this.character_02){
        //     this.character_02.classList.add(".perso_2_img", "perso_2_position")
        // }

        // if(characterChosenData = this.character_03){
        //     this.character_03.classList.add(".perso_3_img", "perso_3_position")
        // }

        // if(characterChosenData = this.character_04){
        //     this.character_04.classList.add(".perso_4_img", "perso_4_position")
        // }

         /////////////////////////////////////////////////////////////////// 

        this.app.onChooseCharacter(characterChosenData, characterChosenName, characterChosenClassName);

        this.checkStartButton();
    }

    checkStartButton() {
        if (this.app.characterGamer1 == null && this.app.characterGamer2 == null){
            this.buttonStartGame.innerText = "Select players!"; 
            return false;
        }
        else if(this.app.characterGamer1 == null){
            this.buttonStartGame.innerText = "Select player 1"; 
            return false;
        }
        else if(this.app.characterGamer2 == null){
            this.buttonStartGame.innerText = "Select player 2"; 
            return false;
        }
        else {
            this.buttonStartGame.innerText = "START GAME !"; 
            return true;
        }
    }

    /**
     * Click on button start game
     *
     * @param event
     */
    onStartGame(event) {

        if(this.checkStartButton()){
            console.log('On click btn start'); 
            this.app.goToGame();

            if(this.start){
                this.app.start(); 
            }
        }
    }

    addCharacter01vs(characterClass, characterName){
        console.log('characterClass', characterClass)
        this.character_vs_01.classList.add(characterClass);
        this.character_vs_01.querySelector('p').innerText = characterName;
    }

    removeCharacter01vs(characterClass, characterName){
        this.character_vs_01.classList.remove(characterClass);
        this.character_vs_01.querySelector('p').innerText = 'Player 1';
    }

    addCharacter02vs(characterClass, characterName){
        this.character_vs_02.classList.add(characterClass);
        this.character_vs_02.querySelector('p').innerText = characterName;
    }

    removeCharacter02vs(characterClass, characterName){
        this.character_vs_02.classList.remove(characterClass);
        this.character_vs_02.querySelector('p').innerText = 'Player 2';
    }

    /**
     * Render view
     */
    render() {
        // check if players select characters
        // change state on btn-start-game,
    }
}
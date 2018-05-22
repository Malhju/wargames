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
        this.buttonStartGame = this.DOMElement.querySelector('#btn-start-game');

        this.character_vs_01 = this.DOMElement.querySelector('#character_vs_01');
        this.character_vs_02 = this.DOMElement.querySelector('#character_vs_02');

        //this.player01Selector = this.DOMElement.querySelector("#character_homepage_01");
        // this.player02Selector = this.DOMElement.querySelector("#character_homepage_02");
        // this.player03Selector = this.DOMElement.querySelector("#character_homepage_03");
        // this.player04Selector = this.DOMElement.querySelector("#character_homepage_04");

        //this.player01List = this.player01Selector.querySelectorAll(".character_01");
        // this.player01List = this.player01Selector.querySelectorAll(".character_01");
        // this.player01List = this.player01Selector.querySelectorAll(".character_01");
        // this.player01List = this.player01Selector.querySelectorAll(".character_01");
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

        // Select your player
        //this.player01List.addEventListener('click', this.vsBattle.bind(this));
        // this.player02.addEventListener('click', this.vsBattle.bind(this));
        // this.player03.addEventListener('click', this.vsBattle.bind(this));
        // this.player04.addEventListener('click', this.vsBattle.bind(this));

    }
/*
    vsBattle(event){
        let selectPlayer = event.target.dataset.character;

        this.app.onChooseCharacter(characterChosen);
    }
*/
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

        console.log('characterChosenName', characterChosenName)

        this.app.onChooseCharacter(characterChosenData, characterChosenName);
    }

    /**
     * Click on button start game
     *
     * @param event
     */
    onStartGame(event) {
        console.log('On click btn start'); 
        this.app.goToGame();
        
        if(this.start){
            this.app.start(); 
        }
    }

    addCharacter01vs(characterClass, characterName){
        console.log('characterClass', characterClass)
        this.character_vs_01.classList.add(characterClass);
        this.character_vs_01.querySelector('p').innerText = characterName;
    }

    removeCharacter01vs(characterClass, characterName){
        this.character_vs_01.classList.remove(characterClass);
        this.character_vs_01.querySelector('p').innerText = '';
    }

    addCharacter02vs(characterClass, characterName){
        this.character_vs_02.classList.add(characterClass);
        this.character_vs_02.querySelector('p').innerText = characterName;
    }

    removeCharacter02vs(characterClass, characterName){
        this.character_vs_02.classList.remove(characterClass);
        this.character_vs_02.querySelector('p').innerText = '';
    }

    /**
     * Render view
     */
    render() {
        // check if players select characters
        // change state on btn-start-game,
    }
}
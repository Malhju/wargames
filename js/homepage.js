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
        this.el = this.app.el.querySelector('#homepage');
        this.characterSelector = this.el.querySelector('#character-selector');
        this.charactersList = this.characterSelector.querySelectorAll('.character');

        this.buttonStartGame = this.el.querySelector('#btn-start-game');
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

        let characterChosen = event.target.dataset.character;
        this.app.onChooseCharacter(characterChosen);
    }

    /**
     * Click on button start game
     *
     * @param event
     */
    onStartGame(event) {
        console.log('On click btn start')
    }

    /**
     * Render view
     */
    render() {
        // check if players select characters
        // change state on btn-start-game,
    }
}
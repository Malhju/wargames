class Player {
    constructor (name, codeArrowLeft, codeArrowRight, codeArrowUp, codeArrowDown){
        this.name = name;
    //constructor (char_name, char_size, char_orientation, char_speed){
        // this.char_name = char_name;
        // this.char_size = char_size;
        // this.char_orientation = char_orientation;
        // this.char_speed = char_speed;
        // this.char_health = char_health;
        this.codeArrowLeft = codeArrowLeft;
        this.codeArrowRight = codeArrowRight;
        this.codeArrowUp = codeArrowUp;
        this.codeArrowDown = codeArrowDown;

        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;

    }

    onKeyDown(event){
        if (event.keyCode == this.codeArrowUp) {
            this.moveUp = true;
            console.log(this.name,'movetop')
        }
        if (event.keyCode == this.codeArrowDown) this.moveDown = true;
        if (event.keyCode == this.codeArrowLeft) this.moveLeft = true;
        if (event.keyCode == this.codeArrowRight) this.moveRight = true;
    }

    onKeyUp(event){
        if (event.keyCode == this.codeArrowUp) this.moveUp = false;
        if (event.keyCode == this.codeArrowDown) this.moveDown = false;
        if (event.keyCode == this.codeArrowLeft) this.moveLeft = false;
        if (event.keyCode == this.codeArrowRight) this.moveRight = false;
    }

    // char_choice(){

    // }
}
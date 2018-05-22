class Player {
    constructor (id, codeArrowLeft, codeArrowRight, codeArrowUp, codeArrowDown, step, positionLeft){
        this.id = id;

        this.codeArrowLeft = codeArrowLeft;
        this.codeArrowRight = codeArrowRight;
        this.codeArrowUp = codeArrowUp;
        this.codeArrowDown = codeArrowDown;

        this.step = step; 
        this.positionLeft = positionLeft; 

        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;

        this.initDomElement();

    }

    initDomElement(){
        this.DomElement = document.querySelector(this.id); 
    }

    onKeyDown(event){
        if (event.keyCode == this.codeArrowUp) {this.moveUp = true;}
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

    moveCharacter(event){
        let positionLeft = this.DomElement.offsetLeft; 

        if(this.moveLeft){
            this.positionLeft -= this.step; 
        }

        if(this.moveRight){
            this.positionLeft += this.step; 
        }

        this.DomElement.style.left = this.positionLeft + "px"; 
    }
}
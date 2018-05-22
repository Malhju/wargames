class Player {
    constructor (id, codeArrowLeft, codeArrowRight, codeArrowUp, codeArrowDown, step, positionLeft, positionTop){
        this.id = id;

        this.codeArrowLeft = codeArrowLeft;
        this.codeArrowRight = codeArrowRight;
        this.codeArrowUp = codeArrowUp;
        this.codeArrowDown = codeArrowDown;

        this.step = step; 
        this.positionLeft = positionLeft; 
        this.positionTop = positionTop;

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
        if (event.keyCode == this.codeArrowUp) this.moveUp = true;
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
        let positionTop = this.DomElement.offsetTop;

        if(this.moveLeft) this.positionLeft -= this.step;
        if(this.moveRight) this.positionLeft += this.step; 
        if(this.moveUp) this.positionTop -= this.step;
        if(this.moveDown) this.positionTop += this.step;

        this.DomElement.style.left = this.positionLeft + "px"; 
        this.DomElement.style.top = this.positionTop + "px";
    }
}
class Player {
    constructor (id, codeArrowLeft, codeArrowRight, codeArrowUp, codeArrowDown, codeOrientLeft, codeOrientRight, step, angle){
        this.id = id;

        this.codeArrowLeft = codeArrowLeft;
        this.codeArrowRight = codeArrowRight;
        this.codeArrowUp = codeArrowUp;
        this.codeArrowDown = codeArrowDown;
        this.codeOrientLeft = codeOrientLeft;
        this.codeOrientRight = codeOrientRight;
        this. angle = angle;

        this.step = step; 
        
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.orientLeft = 1;
        this.orientRight = false;

        this.initDomElement();
    }

    initDomElement(){
        this.DomElement = document.querySelector(this.id);
        this.DomElBattlefield = document.querySelector('#battle');
    }

    //ECOUTES CLAVIERS
    onKeyDown(event){
        if (event.keyCode == this.codeArrowUp) this.moveUp = true;
        if (event.keyCode == this.codeArrowDown) this.moveDown = true;
        if (event.keyCode == this.codeArrowLeft) this.moveLeft = true;
        if (event.keyCode == this.codeArrowRight) this.moveRight = true;
        if (event.keyCode == this.codeOrientLeft) this.orientLeft = 0;
        if (event.keyCode == this.codeOrientRight) this.orientRight = 0;
    }

    onKeyUp(event){
        if (event.keyCode == this.codeArrowUp) this.moveUp = false;
        if (event.keyCode == this.codeArrowDown) this.moveDown = false;
        if (event.keyCode == this.codeArrowLeft) this.moveLeft = false;
        if (event.keyCode == this.codeArrowRight) this.moveRight = false;

    }

    //GESTION DES COLLISIONS ENTRE LES ELEMENTS
    checkCollision(elements){
        // for sur tous les éléments
        for(let i=0; i<this.players; i++){
            console.log('test');
        }
        // si elements == this, on teste pas la collision

        // détection côté qui touche
    }

    moveCharacter(){
        let positionLeft = this.DomElement.offsetLeft;
        let positionTop = this.DomElement.offsetTop;
        let width = this.DomElement.offsetWidth;
        let height = this.DomElement.offsetHeight;
        let battlefieldWidth = this.DomElBattlefield.offsetWidth;
        let battlefieldHeight = this.DomElBattlefield.offsetHeight;
        let tempOrientLeft = 0;
        let tempOrientRight = 0;

        //DEPLACEMENT DU PERSONNAGE SUR LES AXES DES ABSCISSES ET DES ORDONNEES
        if(this.moveLeft) positionLeft -= this.step;
        if(this.moveRight) positionLeft += this.step; 
        if(this.moveUp) positionTop -= this.step;
        if(this.moveDown) positionTop += this.step;

        //GESTION DES COLLISIONS AVEC LE BORD DU JEU
        if(positionLeft <= 0) positionLeft = 0;
        if(positionTop <= 0) positionTop = 0;
        if((positionLeft + width) >= battlefieldWidth) positionLeft = battlefieldWidth - width;
        if((positionTop + height) >= battlefieldHeight) positionTop = battlefieldHeight - height;


        //ORIENTATION DE L'ELEMENT PERSONNAGE
        if (this.orientLeft == 0){
            this.angle -= 90;
            tempOrientLeft = this.codeArrowUp;
            this.codeArrowUp = this.codeArrowRight;
            this.codeArrowRight = this.codeArrowDown;
            this.codeArrowDown = this.codeArrowLeft;
            this.codeArrowLeft = tempOrientLeft;
            this.orientLeft++;
            this.DomElement.style.transform = "rotate(" + this.angle + "deg)";
            this.moveUp = false;
            this.moveDown = false;
            this.moveLeft = false;
            this.moveRight = false;
        }

        if (this.orientRight == 0){
            this.angle += 90;
            tempOrientRight = this.codeArrowUp;
            this.codeArrowUp = this.codeArrowLeft;
            this.codeArrowLeft = this.codeArrowDown;
            this.codeArrowDown = this.codeArrowRight;
            this.codeArrowRight = tempOrientRight;
            this.orientRight++;
            this.DomElement.style.transform = "rotate(" + this.angle + "deg)";
            this.moveUp = false;
            this.moveDown = false;
            this.moveLeft = false;
            this.moveRight = false;
        }

        this.DomElement.style.left = positionLeft + "px"; 
        this.DomElement.style.top = positionTop + "px";
    }
}
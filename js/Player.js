class Player {
    constructor (id, className, codeArrowLeft, codeArrowRight, codeArrowUp, codeArrowDown, codeOrientLeft, codeOrientRight, step, angle){
        this.id = id;
        
        this.className = className;

        this.codeArrowLeft = codeArrowLeft;
        this.codeArrowRight = codeArrowRight;
        this.codeArrowUp = codeArrowUp;
        this.codeArrowDown = codeArrowDown;
        this.codeOrientLeft = codeOrientLeft;
        this.codeOrientRight = codeOrientRight;
        this.angle = angle;

        this.step = step; 
        this.stepRotation = 4;

        this.rotationDOMElement = this.angle;
        
        this.collisionList = [];
        
        this.canMove = true;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.orientLeft = 1;
        this.orientRight = false;

        this.startAnimationEject = false;
        this.animationEject = null;
        this.animationEjectDuration = 0;

        this.initDomElement();
        this.createPlayer();
    }

    initDomElement(){
        this.DomElement = document.querySelector(this.id);
        this.DomElBattlefield = document.querySelector('#battle');
    }

    createPlayer(){
        this.DomElement.classList.add(this.className);
    }

    //ECOUTES CLAVIERS
    onKeyDown(event){
        if(this.canMove){
            if (event.keyCode == this.codeArrowUp) this.moveUp = true;
            if (event.keyCode == this.codeArrowDown) this.moveDown = true;
            if (event.keyCode == this.codeArrowLeft) this.moveLeft = true;
            if (event.keyCode == this.codeArrowRight) this.moveRight = true;
            if (event.keyCode == this.codeOrientLeft) this.orientLeft = 0;
            if (event.keyCode == this.codeOrientRight) this.orientRight = 0;
        }
        
    }

    onKeyUp(event){
        if (event.keyCode == this.codeArrowUp) this.moveUp = false;
        if (event.keyCode == this.codeArrowDown) this.moveDown = false;
        if (event.keyCode == this.codeArrowLeft) this.moveLeft = false;
        if (event.keyCode == this.codeArrowRight) this.moveRight = false;

    }

    render(){
        if(this.animationEject != null){
            this.animateCharacter();
        }
        else{
            this.moveCharacter();
        }
        
        this.checkCollision();
    }

    //GESTION DES COLLISIONS ENTRE LES ELEMENTS
    checkCollision(){  
         //console.log('test');
        // for sur tous les éléments


        let positionPlayerTop = this.DomElement.offsetTop;
        let positionPlayerLeft = this.DomElement.offsetLeft;
        let positionPlayerBottom = this.DomElement.offsetTop + this.DomElement.offsetHeight;
        let positionPlayerRight = this.DomElement.offsetLeft + this.DomElement.offsetWidth;


        for(let i=0; i < this.collisionList.length; i++){
            let target = this.collisionList[i].DomElement;

            
            let targetTop = target.offsetTop;
            let targetLeft = target.offsetLeft;
            let targetWidth = target.offsetWidth;
            let targetBottom = target.offsetTop + target.offsetHeight;
            let targetRight = target.offsetLeft + targetWidth;


            //collision J1droite-J2gauche
            if (positionPlayerTop <= targetBottom &&
                positionPlayerBottom >= targetTop && 
                positionPlayerRight > targetLeft && 
                positionPlayerRight < targetLeft + targetWidth / 2)
            {
                this.startAnimationEject = true;
                this.animationEject = 'left' 
            }

            if (positionPlayerTop <= targetBottom && 
                positionPlayerBottom >= targetTop && 
                positionPlayerLeft > targetRight - targetWidth / 2 &&
                positionPlayerLeft < targetRight 
            ){
                this.startAnimationEject = true;
                this.animationEject = 'right' 
            }

        // if (positionPlayer1Right >= positionPlayer2Left && 
        //     positionPlayer1Left <= positionPlayer2Right && 
        //     positionPlayer1Top < positionPlayer2Bottom &&
        //     positionPlayer1Top > positionPlayer2Bottom - 2*this.step
        // ){
            // this.moveUp = false;
            // this.moveDown = false;
            // this.moveLeft = false;
            // this.moveRight = false;
            // this.canMove = false;

            // player1.classList.add('ejectDown');
            // player2.classList.add('ejectUp');
            
            // setTimeout(function(){
            //     requestAnimationFrame(function(){
            //         player1.style.top = (positionPlayer1Top + 50) + 'px';
            //         player2.style.top = (positionPlayer2Top - 50) + 'px';
            //         player1.classList.remove('ejectDown');
            //         player2.classList.remove('ejectUp');
            //         self.canMove = true;
            //     })
            // }, 1000);
        // }

        // if (positionPlayer1Right >= positionPlayer2Left && 
        //     positionPlayer1Left <= positionPlayer2Right && 
        //     positionPlayer1Bottom < positionPlayer2Top &&
        //     positionPlayer1Bottom > positionPlayer2Top - 2*this.step
        // ){
            // this.moveUp = false;
            // this.moveDown = false;
            // this.moveLeft = false;
            // this.moveRight = false;
            // this.canMove = false;

            // player1.classList.add('ejectUp');
            // player2.classList.add('ejectDown');
            
            // setTimeout(function(){
            //     requestAnimationFrame(function(){
            //         player1.style.top = (positionPlayer1Top - 50) + 'px';
            //         player2.style.top = (positionPlayer2Top + 50) + 'px';
            //         player1.classList.remove('ejectUp');
            //         player2.classList.remove('ejectDown');
            //         self.canMove = true;
            //     })
            // }, 1000);
        // }

        }
      

    }

    moveCharacter(){
        if(!this.canMove){
            return;
        }
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
        if((positionLeft + width) >= battlefieldWidth) positionLeft  = battlefieldWidth - width;
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
            this.rotationDOMElement = this.angle;
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
            
            this.rotationDOMElement = this.angle;
        }

        this.DomElement.style.left = positionLeft + "px"; 
        this.DomElement.style.top = positionTop + "px";
    }

    animateCharacter(){
        console.log(this.animationEject);

        if(this.startAnimationEject){
            this.startAnimationEject = false;
            this.animationEjectDuration = 0;

            this.offsetLeft = this.DomElement.offsetLeft;
            this.offsetTop = this.DomElement.offsetTop;

            var self = this;

            setTimeout(function(){
                self.animationEject = null;
            },1000);
        }


        this.rotationDOMElement += this.stepRotation * 2;

        switch(this.animationEject){
            case 'left':
                this.offsetLeft -= this.step/7;
                break;

            case 'right':
                this.offsetLeft += this.step/7;
                break;
        }
        

        this.animationEjectDuration++;


        this.DomElement.style.left = this.offsetLeft + "px"; 
        this.DomElement.style.top = this.offsetTop + "px";
        this.DomElement.style.transform = "rotate(" + this.rotationDOMElement + "deg)";
    }
}
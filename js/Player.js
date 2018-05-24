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
        
        this.canMove = true;
        this.moveLeft = false;
        this.moveRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.orientLeft = 1;
        this.orientRight = false;

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

    //GESTION DES COLLISIONS ENTRE LES ELEMENTS
    checkCollision(){
        // console.log('test');
        // for sur tous les éléments
        // for(let i=0; i < this.players; i++){
        //     console.log('test');
        // }
        // si elements == this, on teste pas la collision


        // détection côté qui touche
        let player1 = document.querySelector("#perso_01");
        let player2 = document.querySelector("#perso_02");
        
        let positionPlayer1 = document.querySelector("#perso_01");
        let positionPlayer2 = document.querySelector("#perso_02");

        let positionPlayer1Top = positionPlayer1.offsetTop;
        let positionPlayer1Left = positionPlayer1.offsetLeft;
        let positionPlayer1Bottom = positionPlayer1.offsetTop + positionPlayer1.offsetHeight;
        let positionPlayer1Right = positionPlayer1.offsetLeft + positionPlayer1.offsetWidth;
        

        let positionPlayer2Top = positionPlayer2.offsetTop;
        let positionPlayer2Left = positionPlayer2.offsetLeft;
        let positionPlayer2Bottom = positionPlayer2.offsetTop + positionPlayer2.offsetHeight;
        let positionPlayer2Right = positionPlayer2.offsetLeft + positionPlayer2.offsetWidth;

        let self = this;

        //collision J1droite-J2gauche
        if (positionPlayer1Top <= positionPlayer2Bottom &&
            positionPlayer1Bottom >= positionPlayer2Top && 
            positionPlayer1Right > positionPlayer2Left && 
            positionPlayer1Right < positionPlayer2Left + 2*this.step)
        {
            this.moveUp = false;
            this.moveDown = false;
            this.moveLeft = false;
            this.moveRight = false;
            this.canMove = false;

            player1.classList.add('ejectLeft');
            player2.classList.add('ejectRight');
            
            setTimeout(function(){
                requestAnimationFrame(function(){
                    player1.style.left = (positionPlayer1Left - 50) + 'px';
                    player2.style.left = (positionPlayer2Left + 50) + 'px';
                    player1.classList.remove('ejectLeft');
                    player2.classList.remove('ejectRight');
                    self.canMove = true;
                })
            }, 1000);
        }

        if (positionPlayer1Top <= positionPlayer2Bottom && 
            positionPlayer1Bottom >= positionPlayer2Top && 
            positionPlayer1Left > positionPlayer2Right &&
            positionPlayer1Left < positionPlayer2Right + 2*this.step
        ){
            this.moveUp = false;
            this.moveDown = false;
            this.moveLeft = false;
            this.moveRight = false;
            this.canMove = false;

            player1.classList.add('ejectRight');
            player2.classList.add('ejectLeft');
            
            setTimeout(function(){
                requestAnimationFrame(function(){
                    player1.style.left = (positionPlayer1Left + 50) + 'px';
                    player2.style.left = (positionPlayer2Left - 50) + 'px';
                    player1.classList.remove('ejectRight');
                    player2.classList.remove('ejectLeft');
                    self.canMove = true;
                })
            }, 1000);
        }

        if (positionPlayer1Right >= positionPlayer2Left && 
            positionPlayer1Left <= positionPlayer2Right && 
            positionPlayer1Top < positionPlayer2Bottom &&
            positionPlayer1Top > positionPlayer2Bottom - 2*this.step
        ){
            this.moveUp = false;
            this.moveDown = false;
            this.moveLeft = false;
            this.moveRight = false;
            this.canMove = false;

            player1.classList.add('ejectDown');
            player2.classList.add('ejectUp');
            
            setTimeout(function(){
                requestAnimationFrame(function(){
                    player1.style.top = (positionPlayer1Top + 50) + 'px';
                    player2.style.top = (positionPlayer2Top - 50) + 'px';
                    player1.classList.remove('ejectDown');
                    player2.classList.remove('ejectUp');
                    self.canMove = true;
                })
            }, 1000);
        }

        if (positionPlayer1Right >= positionPlayer2Left && 
            positionPlayer1Left <= positionPlayer2Right && 
            positionPlayer1Bottom < positionPlayer2Top &&
            positionPlayer1Bottom > positionPlayer2Top - 2*this.step
        ){
            this.moveUp = false;
            this.moveDown = false;
            this.moveLeft = false;
            this.moveRight = false;
            this.canMove = false;

            player1.classList.add('ejectUp');
            player2.classList.add('ejectDown');
            
            setTimeout(function(){
                requestAnimationFrame(function(){
                    player1.style.top = (positionPlayer1Top - 50) + 'px';
                    player2.style.top = (positionPlayer2Top + 50) + 'px';
                    player1.classList.remove('ejectUp');
                    player2.classList.remove('ejectDown');
                    self.canMove = true;
                })
            }, 1000);
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
class character{
    constructor (char_name, char_size, char_orientation, char_speed){
        this.char_name = char_name;
        this.char_size = char_size;
        this.char_orientation = char_orientation;
        this.char_speed = char_speed;
        // this.char_health = char_health;
        
    }

    // char_choice(){

    // }
}



class bullet{
    constructor (bul_size, bul_damages, bul_speed){
        this.bul_size = bul_size;
        this.bul_damages = bul_damages;
        this.bul_speed = bul_speed;
    }
}

const container_game = document.querySelector('#game');
const player1 = document.querySelector('#perso_01');
const player2 = document.querySelector('#perso_02');

let step = 1;

function initKeyboardListener(){
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
}

function onKeyDown(event){
    if (event.keyCode == 90) moveUp = true;
    if (event.keyCode == 83) moveDown = true;
    if (event.keyCode == 81) moveLeft = true;
    if (event.keyCode == 68) moveRight = true;
    // if (event.keyCode == 104) moveUpPlayer2 = true;
    // if (event.keyCode == 101) moveDownPlayer2 = true;
    // if (event.keyCode == 100) moveLeftPlayer2 = true;
    // if (event.keyCode == 102) moveRighPlayer2 = true;
}

function onKeyUp(event){
    if (event.keyCode == 90) moveUp = false;
    if (event.keyCode == 83) moveDown = false;
    if (event.keyCode == 81) moveLeft = false;
    if (event.keyCode == 68) moveRight = false;
    // if (event.keyCode == 104) moveUpPlayer2 = false;
    // if (event.keyCode == 101) moveDownPlayer2 = false;
    // if (event.keyCode == 100) moveLeft = false;
    // if (event.keyCode == 102) moveRight = false;
}

function movePlayer(){
    let player1_positionX = player1.offsetLeft;
    let player1_positionY = player1.offsetTop;

    if (moveUp) player1_positionX -= step;
    if (moveDown) player1_positionX += step;
    if (moveLeft) player1_positionY -= step;
    if (moveRight) player1_positionY += step; 
}

function loop(){
    window.requestAnimationFrame(function(){
        movePlayer();
        loop();
    })
}

function init(){
    initKeyboardListener();
    loop();
}

init();
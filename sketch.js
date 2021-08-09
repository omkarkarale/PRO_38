var canvas, backgroundImage;
var gameState = 0; 
var playerCount; 
var database; 
var form, player, game, allPlayers;
var distance = 0;

var p1, p2;
var p;

function preload(){
    bg = loadImage("images/ground.png");
    track = loadImage("images/Road.png");
    p1Img = loadImage("images/mainPlayer1.png");
    p2Img = loadImage("images/opponent1.png");
    mark = loadImage("images/marking.png");
}

function setup(){ 
    canvas = createCanvas(displayWidth - 20, displayHeight - 30); 
    database = firebase.database(); 
    game = new Game(); 
    game.getState(); 
    game.start(); 
} 

function draw(){
    if(playerCount===2){ 
        game.update(1);
    }
    
    if(gameState===1){
        clear();
        game.play();
    }
    if(gameState===2){
        game.end();
    }
}
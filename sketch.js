var pac, pacImg, pacImg2;
var backGround, backgroundImg;

var ghost, ghostImg;

var coin, coinImg;
var restart, restartImg;

var fireball, fireballImg;

var pointSound
var GameOverSound
var fireSound

var coinGroup;
var ghostGroup;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;

function preload(){
  pacImg = loadImage("Pac_man.png");
  pacImg2 = loadImage("Pac man.png");
  
  backgroundImg = loadImage("background.png");
  ghostImg = loadImage("ghost.png");
  
  coinImg = loadImage("Coin.png");
  
  restartImg = loadImage("restart.png");
  fireballImg = loadImage("fireball.png");
  
  pointSound = loadSound("point.wav");
  GameOverSound = loadSound("over.wav");
  fireSound = loadSound("fire.mp3");
}

function setup() {
  createCanvas(700,400);
  
  backGround = createSprite(200,200,400,10);
  backGround.addImage("backGround", backgroundImg);
  backGround.scale = 0.8
  
  pac = createSprite(100,200,20,20);
  pac.addImage("pac", pacImg2);
  pac.scale = 0.9/5.8;
  
  restart = createSprite(360,220,20,20);
  restart.addImage("reset", restartImg);
  restart.visible = false;
  restart.scale = 0.1 
  
  coinGroup = new Group();
  ghostGroup = new Group();
  fireballGroup = new Group();
}

function draw() {
  
  background("black");
  
  if (gameState === PLAY){
    
    pac.velocityY = 0;
    pac.velocityX = 0;
    
    if (backGround.x < 0){
      backGround.x = backGround.width/2;
    
    }
  
    backGround.velocityX = -4
    
    if (keyDown("up_arrow")){
      pac.velocityY = -3.5;
  
    }
  
    if (keyDown("down_arrow")){
      pac.velocityY = 3.5;
  
    }
  
    if (keyDown("right_arrow")){
      pac.velocityX = 3.5;
    
    }

    if (keyDown("left_arrow")){
      pac.velocityX = -3.5;

    }
    
    pac.addImage("pac", pacImg2);
    
    if (pac.velocityX === 3.5 || pac.velocityX === -3.5){
     pac.addImage("pac", pacImg); 
    }
    
    if (coinGroup.isTouching(pac)){
      coinGroup[0].destroy();
      score = score + 1;
      pointSound.play();
    }
    
    if (keyWentDown("space")){
      fireBall();
      fireSound.play();
    }
    if(ghostGroup.length){
      var ghost_x_pos = ghostGroup.get(0).x
    if (ghost_x_pos < -30){
      
      gameState = END;
      GameOverSound.play();
    }
    }
    
    if (ghostGroup.isTouching(fireballGroup)){
      fireballGroup.destroyEach();
      ghostGroup[0].destroy();
      score = score + 0.5;
    }
    
    if (ghostGroup.isTouching(pac) ||
     pac.y > 450 || pac.y < -30 || pac.x < -35 || pac.x > 700){
      
      gameState = END;      
      GameOverSound.play();
    }
    
    spawncoins();
    spawnghosts();
    
  } else if(gameState === END){
    
    pac.velocityX = 0;
    pac.velocityY = 0;
    
    fireballGroup.destroyEach();
    coinGroup.destroyEach();
    ghostGroup.destroyEach();
    backGround.visible = false;
    
    restart.visible = true;
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over :<", 270,160)
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  drawSprites();
  
  fill("white");
  text("Score: " + score, 500,50);
}

function fireBall(){
  fireball = createSprite(200,200,10,10);
  fireball.addImage("fire", fireballImg);
  
  fireball.scale = 0.1/2;
  fireball.velocityX = 4;
  
  fireball.lfetime = 100;
  fireball.y = pac.y;
  fireball.x = pac.x;
  
  fireballGroup.add(fireball);
}

function reset(){
  gameState = PLAY;
  backGround.visible = true;
  
  pac.x = 300;
  pac.y = 200;
  
  spawnghosts();
  spawncoins();
  
  restart.visible = false;
  score = 0;
}


function spawncoins(){
  if (frameCount % 180 === 0){
    coin = createSprite(750,200,20,20);
    coin.addImage("coin", coinImg);
    coin.scale = 0.1/3
    
    coin.y = Math.round(random(60,340));
    
    coin.velocityX = -(1.2 * (2));
    coin.lifetime = 400;
    
    coinGroup.add(coin);
  }
}

function spawnghosts(){
  if (frameCount % 200 === 0){
    ghost = createSprite(750,200,20,20);
    ghost.addImage("ghost", ghostImg);
    ghost.scale = 0.1/2;
    
    ghost.y = Math.round(random(90,300));
    
    ghost.velocityX = -(1.2 * (score/2));
    //ghost.lifetime = 400;
    
    ghostGroup.add(ghost);
  }
}
var path, playerBee;
var stone
var honey
var balls
var sheild
var beesheild
var pathImg, pathImg2, pathImg3, mainRacerImg1, mainRacerImg2;
var level = 1

var stoneImage
var honeyImage
var ballsImage
var sheildImage
var gameOverImg, cycleBell;

var stonesGroup, honeyGroup, ballsGroup, sheildGroup, beesheildGroup

var END = 0;
var PLAY = 1;
var gameState = PLAY;

var score = 0;
var gameOver, restart;

var edges

function preload() {
  pathImg = loadImage("background2.jpg");
  pathImg2 = loadImage("cityback.jpg");
  pathImg3 = loadImage("spacebackground.jpg")
  mainRacerImg1 = loadAnimation("beesprite1.png", "beesprite3.png")

  stoneImage = loadImage("stone.png");
  gameOverImg = loadImage("gameOver.png");

  honeyImage = loadImage("honeysprite.png")
  ballsImage = loadImage("ballOb.webp")
  sheildImage = loadImage("sheild.png")

}

function setup() {

  createCanvas(1200, 850);
  // Moving background
  path = createSprite(0, 200);



  path.velocityX = -5;

  //creating bee flying
  playerBee = createSprite(70, 750);
  playerBee.addAnimation("bee", mainRacerImg1);
  playerBee.scale = 1.5;

  // //set collider for playerBee


  playerBee.setCollider("rectangle", 0, 0, 40, 40);



  gameOver = createSprite(650, 150);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  gameOver.visible = false;

  stonesGroup = new Group();
  honeyGroup = new Group();
  ballsGroup = new Group();
  sheildGroup = new Group();

  beesheild = createSprite(playerBee.x, 750);
  beesheild.addImage("beesheild", sheildImage);
  beesheild.scale = 0.3;
  beesheild.visible = false
  



}

function draw() {
  background(0);
  drawSprites();

  textSize(40);
  fill("black");
  textStyle("bold")
  text("Score: " + score, 900, 80);

  if (gameState === PLAY) {

    createStones()
    createHoney()

    if (keyDown("right")) {
      playerBee.x += 10
      beesheild.x=playerBee.x
    }

    if (keyDown("left")) {
      playerBee.x -= 10
      beesheild.x=playerBee.x
    }

    //  playerBee.y = World.mouseY;
    //  playerBee.x = World.mouseX;


    if (level === 1) {
      path.addImage(pathImg);
      path.scale = 4
    }
    else if (level === 2) {
      path.addImage(pathImg2);
      path.scale = 2
      path.y = 320
      path.x = -10
      createBalls()

    }

    if (level === 3) {
      path.addImage(pathImg3)
      path.scale = 2.5
      path.velocityX = 0;
      path.y = 471
      path.x = -30
      createSheild()
      createBalls()

      for(var i =0; i <sheildGroup.length;i++){
        if (sheildGroup.get(i).isTouching(playerBee)) {
          sheildGroup.get(i).destroy()
          beesheild.visible = true
          beesheild.x = playerBee.x
        }
      }
    }

    
   
  

    if (ballsGroup.isTouching(playerBee) && level === 2) {
      gameState = END;
    }

    edges = createEdgeSprites();
    playerBee.collide(edges);

    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }



    // if (stonesGroup.isTouching(playerBee)) {
    //   gameState = END;
    //   //stone.addAnimation("opponentstone");
    // }

  //   for (var i = 0; i <stonesGroup.length; i++) {
  //     for (var j = 0; j <ballsGroup.length; j++)
  //   if (beesheild.isTouching(stonesGroup.get(i)) || beesheild.isTouching(ballsGroup.get(j))) {
  //     beesheild.visible=false
  //     beesheild.remove()
  //     stonesGroup.get(i).destroy()
  //     ballsGroup.get(j).destroy()
  //   }
  // }

  for (var i = 0; i <stonesGroup.length; i++) {
    for (var j = 0; j <ballsGroup.length; j++)
  if (beesheild.overlap(stonesGroup.get(i),destroySheild) || beesheild.overlap(ballsGroup.get(j),destroySheild)) {
    stonesGroup.get(i).destroy()
    ballsGroup.get(j).destroy()
  }
}




    for (var i = 0; i < honeyGroup.length; i++) {
      if (honeyGroup.get(i).isTouching(playerBee)) {
        honeyGroup.get(i).destroy()
        score += 1
      }
    }

    if (score >= 1) {
      level = 2
    }

    if (score >= 2) {
      level = 3
    }



  } else if (gameState === END) {
    gameOver.visible = true;

    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500, 200);

    path.velocityX = 0;
    playerBee.velocityY = 0;
    playerBee.addAnimation("SahilRunning", mainRacerImg2);

    stonesGroup.setVelocityXEach(0);
    stonesGroup.setLifetimeEach(-1);

    if (keyDown("UP_ARROW")) {
      reset();
    }

  }

}

function createStones() {
  if (frameCount % 50 === 0) {
    stone = createSprite(Math.round(random(50, 1100)), -30);
    stone.scale = 0.06;
    stone.velocityY = +(8);
    stone.addImage("opponentstone", stoneImage);
    stonesGroup.add(stone);
    stone.lifetime = 110;

  }

}

function createBalls() {
  if (frameCount % 50 === 0) {
    balls = createSprite(Math.round(random(50, 1100)), -30);
    balls.scale = 0.06;
    balls.velocityY = +(8 + 2 * score / 2);
    balls.addImage("opponentballs", ballsImage);
    ballsGroup.add(balls);
    balls.lifetime = 110;

  }
}



function createHoney() {
  if (frameCount % 50 === 0) {
    honey = createSprite(Math.round(random(50, 1100)), -50);
    honey.scale = 0.2;
    honey.velocityY = +(8 - 2 * score / 150);
    honey.addImage("honeyImage", honeyImage);
    honeyGroup.add(honey);
    honey.lifetime = 110;

  }
}

function createSheild() {
  if (frameCount % 40 === 0) {
    sheild = createSprite(Math.round(random(50, 1100)), -50);
    sheild.scale = 0.2;
    sheild.velocityY = +(8 - 2 * score / 150);
    sheild.addImage("sheildImage", sheildImage);
    sheildGroup.add(sheild);
    sheild.lifetime = 110;

  }
}

function destroySheild(spriteA){
//spriteA.remove()
spriteA.visible=false
spriteA.destroy()


}



function reset() {
  gameState = PLAY;
  gameOver.visible = false;

  stonesGroup.destroyEach();
  honeyGroup.destroyEach();
  ballsGroup.destroyEach()
  level = 1
  score = 0;
}
var tower, towerImg;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg
var invisibleBlock, invisibleBlockGroup;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  
  climberImg = loadImage("climber.png");
  
  ghostImg = loadImage("ghost-standing.png")
  
  spookySound= loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;
  
  climbersGroup = new Group();
  doorsGroup = new Group();
  invisibleBlockGroup = new Group();
  
  ghost = createSprite(300,300,20,20);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.3;
  
  
  
  
}

function draw(){ 
  background(0); 
  
  if (gameState === "play") {
    
  if(keyDown("left_arrow")){ 
    ghost.x = ghost.x - 3; 
  } 
    if(keyDown("right_arrow")){ 
      ghost.x = ghost.x + 3; 
    } 
    if(keyDown("space")){ 
      ghost.velocityY = -10; 
    } ghost.velocityY = ghost.velocityY + 0.8;
    if(tower.y > 400){ 
      tower.y = 300; 
    } 
    spawnDoors(); 
    
    //climbersGroup.collide(ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0; 
    } 
    spookySound.play();
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){ ghost.destroy();
                                                               gameState = "end";
                                                               
                                                              } drawSprites(); 
  } 
  if (gameState === "end"){
    stroke("yellow"); 
    fill("yellow"); 
    textSize(30); 
    text("Game Over", 230,250); 
    spookySound.stop();
  } 
}


function spawnDoors(){
  if(frameCount % 144 === 0){
    
  var door = createSprite(200,0)
  door.addImage("door", doorImg);
    
    var climber = createSprite(200,50);
    climber.addImage(climberImg);
    
    invisibleBlock = createSprite(200,55)
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.velocityY = 3;
    climber.velocityY = 3;
    invisibleBlock.velocityY = 3;
    
    
    
    door.lifetime = 800;
    climber.lifetime = 800;
    
    ghost.depth = door.depth
    ghost.depth = ghost.depth + 1
    
    invisibleBlock.debug = true;
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
  }
}
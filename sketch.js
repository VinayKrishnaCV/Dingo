//dog variables
var dog, happyDog, Dingo, sadDog;

//database variable
var database;

//food variables
var foodS, foodObj;

//buttons
var feedDingo, addFood

//background var
var bedroomImg,gardenImg,washroomImg;

//time var
var fedTime, lastFed, currentTime, n 

//name var
var Name ,nameChanger


function preload()
{
  //loding dog images
  dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
  bedroomImg = loadImage("images/Bed Room.png");
  gardenImg = loadImage("images/Garden.png");
  washroomImg = loadImage("images/Wash Room.png");
  sadDog=loadImage("images/Dog.png");
}

function setup() 
{
  //creating canvas
  createCanvas( 500, 500);
  
  //database related stuff
  database = firebase.database();
  foodObj = new Food();
  foodObj.getFoodStock()

  //creating Dingo
  Dingo = createSprite(260,300,20,50);
  Dingo.addImage(dog);
  Dingo.scale = 0.2;

  //button creations
  feedDingo = createButton()
  feedDingo.position(355,225)
  feedDingo.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(355,250)
  addFood.mousePressed(addFoods)

  //name input
  nameChanger=createInput("")
  nameChanger.position(20,20)

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
}


function draw() 
{  
  //giving name
  if(nameChanger.value()){
    Name = nameChanger.value()
    feedDingo.html("Feed "+Name)
  }

  currentTime=hour();
  if(currentTime==(lastFed+0.1)){
    update("Playing");
    foodObj.garden();
  }else if(currentTime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }else{
    update("Hungry")
    foodObj.display();
  }

  //colouring/refreshing the background
  if(gameState==="Hungry"){
  background(46, 139, 87)
  }

  //drawing Sprites
  drawSprites();
  if(frameCount===n+100){
    Dingo.addImage(sadDog)
  }

  //defining
  foodS = foodObj.foodStock

  //add styles here
  push()
  textSize(20)
  fill("black")
  noStroke()
  text("I Am "+ Name,200,20)
  text("Give Me A Name",180,400)
  textSize(20)
  fill("blue")
  text("ꘘ💿ᴑ𝓭 டə𝒇Ե:"+foodS,330,200)
  pop()

  //Displating X and Y in screen
  text(mouseX+","+mouseY,mouseX,mouseY)

  //displaying
  foodObj.display();

  //last fed time checker
  feedTime = database.ref('feedTime')
  feedTime.on("value",function(data){ 
    lastFed=data.val(); 
  });

  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
   text("Last Fed :" + lastFed%12 + "PM", 336, 160);
  }else if(lastFed ===0 ){
   text("Last Fed : 12 AM" , 336, 160)
  }else{
    
   text("Last Fed :" + lastFed + "AM", 336, 160);
  }

  //hungermeter
  if(gameState!="Hungry"){
    feedDingo.hide();
    addFood.hide();
    Dingo.remove();
  }else{
   feedDingo.show();
   addFood.show();
   //Dingo.addImage(sadDog);
  }
}

//fuction to update food stock and last fed time
function feedDog(){
  Dingo.addImage(happyDog);
  foodObj.deductFood(foodS)
  n = frameCount;
  console.log(n)
}

//function to add food in stock
function addFoods(){
  if(foodS<20){
    foodS++;
    foodObj.updateFoodStock(foodS)
  }
}

//update gameState
function update(state){
  database.ref('/').update({
    gameState:state
  })
}
  
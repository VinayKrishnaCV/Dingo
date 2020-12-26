//dog variables
var dog, happyDog, Dingo;

//database variable
var database;

//food variables
var foodS, foodStock, foodObj;

//buttons
var feedDingo, addFood

//others
var fedTime, lastFed

function preload()
{
  //loding dog images
  dog = loadImage("images/Dog.png");
	happyDog = loadImage("images/happydog.png");
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
  feedDingo = createButton("Feed Dingo")
  feedDingo.position(355,200)
  feedDingo.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(355,250)
  addFood.mousePressed(addFoods)
}


function draw() 
{  
  //colouring/refreshing the background
  background(46, 139, 87)

  //drawing Sprites
  drawSprites();

  //reset
  if(keyWentUp("r")){
    database.ref('/').set({
      food:20
    })
  }

  //add styles here
  push()
  textSize(20)
  fill("black")
  noStroke()
  text("Note: Feed Dingo By Pressing Up Arrow ⬆",60,20)
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
   text("Last Fed :" + lastFed%12 + "PM", 150, 100);
  }else if(lastFed ===0 ){
   text("Last Fed : 12 AM" , 150,100)
  }else{
    
   text("Last Fed :" + lastFed + "AM", 150,100);
  }
}

//fuction to update food stock and last fed time
function feedDog(){
  Dingo.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
   food:foodObj.getFoodStock(),
   feedTime:hour ()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
  
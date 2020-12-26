//dog variables
var dog, happyDog, Dingo, Name;

//database variable
var database;

//food variables
var foodS, foodObj;

//buttons
var feedDingo, addFood

//others
var fedTime, lastFed, nameChanger

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
  feedDingo = createButton()
  feedDingo.position(355,225)
  feedDingo.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(355,250)
  addFood.mousePressed(addFoods)

  //name input
  nameChanger=createInput("")
  nameChanger.position(20,20)
}


function draw() 
{  
  //giving name
  if(nameChanger.value()){
    Name = nameChanger.value()
    feedDingo.html("Feed "+Name)
  }

  //colouring/refreshing the background
  background(46, 139, 87)

  //drawing Sprites
  drawSprites();

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
}

//fuction to update food stock and last fed time
function feedDog(){
  Dingo.addImage(happyDog);
  foodObj.deductFood(foodS)
}

//function to add food in stock
function addFoods(){
  if(foodS<20){
    foodS++;
    foodObj.updateFoodStock(foodS)
  }
}
  
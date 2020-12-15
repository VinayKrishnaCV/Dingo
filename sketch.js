//dog variables
var dog, happyDog, Dingo;

//database variable
var database;

//food variables
var foodS, foodStock;

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
  
  database = firebase.database();
  foodStock = database.ref('food')
  foodStock.on("value",readStokingMec)

  //creating Dingo
  Dingo = createSprite(260,300,20,50);
  Dingo.addImage(dog);
  Dingo.scale = 0.2;
}


function draw() 
{  
  //colouring/refreshing the background
  background(46, 139, 87)

  //drawing Sprites
  drawSprites();

  //feed it
  Dingo.addImage(dog)
  if(keyDown(UP_ARROW)){
    Dingo.addImage(happyDog)
  }
  if(keyWentUp(UP_ARROW)){
    writeStokingMec(foodS);
    Dingo.addImage(happyDog)
  }

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
}

//function to read values from DB
function readStokingMec(data){
  foodS=data.val();
}

//function to write values in DB
function writeStokingMec(x){

  if(x<=0){
    x=0
  }else{
    x=x-1
  }
  database.ref('/').set({
    food:x
  })
}
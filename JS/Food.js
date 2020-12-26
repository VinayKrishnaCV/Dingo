class Food {
    constructor(){
        this.foodImage = loadImage("images/Milk.png")
        var lastFed
        this.foodStock=0
    }

    display(){
        var x=10,y=10;
        
        imageMode(CENTER);
        
        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=10;
                    y=y+50;
                }
                image(this.foodImage,x,y,50,50);
                x+=20;
            }
        }
    }
    
    updateFoodStock(foodStock){
        database.ref("/").update({
            food:foodStock
        })
    }
    
    deductFood(foodStock){
        if(foodStock>0){
            database.ref("/").update({
                food:foodStock-1,
                feedTime:hour ()
            })
        }
    }
    
    getFoodStock(){
        var foodStockRef=database.ref("food")
        foodStockRef.on("value",(data)=>{
            this.foodStock=data.val()
        })
    }
}
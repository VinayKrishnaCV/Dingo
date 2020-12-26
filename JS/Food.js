class Food {
    constructor(){
        this.foodImage = loadImage("images/Milk.png")
        var lastFed
        this.foodStock=0
    }

    display(){
        var x=80,y=170;
        
        imageMode(CENTER);
        
        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+50;
                }
                image(this.foodImage,x,y,50,50);
                x=x+30;
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
                food:foodStock-1
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
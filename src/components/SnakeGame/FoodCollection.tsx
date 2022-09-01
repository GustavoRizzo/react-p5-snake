import Food from "./Food";
import { P5Instance } from "react-p5-wrapper";
import Position2D from "./Position2D";

export default class FoodCollection {

    _p5: P5Instance;
    resolution: number;
    minAmountFoodAvailable: number;
    foods: Food[];

    constructor(p5:P5Instance, resolution:number=1, minAmountFoodAvailable:number=0){
        this._p5 = p5;
        this.resolution = resolution;
        this.minAmountFoodAvailable = minAmountFoodAvailable;
        this.foods = [];
    }

    addFood( food: Food){
        this.foods.push(food);
    }

    getRandomInt(max:number) {
        return Math.floor(Math.random() * max);
    }

    addRandomFood(){
        let maxWidth = this._p5.width / this.resolution;
        let maxHeight = this._p5.height / this.resolution;        
        let randomX =  this.getRandomInt(maxWidth);
        let randomY =  this.getRandomInt(maxHeight);
        let randomFood = new Food(this._p5, {x:randomX, y:randomY});
        this.foods.push(randomFood);
    }

    checkThereAreminAmountFoodAvailable():boolean{
        let count = this.foods.filter(Food.checkAvailable).length;
        return (count >= this.minAmountFoodAvailable);
    }

    update(){
        this.foods = this.foods.filter(Food.checkNotEaten);

        if (!this.checkThereAreminAmountFoodAvailable()) {
            this.addRandomFood();
        }
    }

    show(){
        this.foods.map( (item:Food) => { item.show(); });
    }

    checkFoodIsInSamePosition(pos: Position2D, action:string): boolean{
        let flag = false;
        const jsonpos = JSON.stringify(pos);

        this.foods.map( (food:Food) => {
            const jsonFoodPos = JSON.stringify(food.pos);            
            if(jsonpos == jsonFoodPos) {
                flag = true;
                switch (action) {
                    case 'swallow':
                        food.setSwallowed();
                        break;
                    case 'eaten':
                        food.setEaten();
                        break;
                }
            }
        });

        return flag;  
    }
}
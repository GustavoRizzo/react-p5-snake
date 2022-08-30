import { P5Instance } from "react-p5-wrapper";
import Food from "./Food";
import FoodCollection from "./FoodCollection";
import Snake from "./Snake";

const resolution = 10;
let minAmountFoodAvailable = 3;
let snake: Snake;
let foods:FoodCollection;

export function snakeGameSketch (p5: P5Instance) {
  p5.setup = () => {
    p5.createCanvas(400, 400, p5.P2D);
    p5.frameRate(5);    
    snake = new Snake(p5);
    foods = new FoodCollection(p5, resolution, minAmountFoodAvailable);
    foods.addFood(new Food(p5, {x:2, y:2}));
    foods.addFood(new Food(p5, {x:20, y:20})); 
    foods.addRandomFood();  
  }  

  p5.keyPressed =() => {
    snake.moveControl(p5.keyCode);
  }

  p5.draw = () => {
    p5.background(111);
    p5.scale(resolution);
    snake.update(foods);
    foods.update();
    snake.show();
    foods.show();
  };
}

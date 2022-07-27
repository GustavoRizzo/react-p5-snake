import { P5Instance } from "react-p5-wrapper";
import Food from "./Food";
import Snake from "./Snake";

const resolution = 10;
let snake: Snake;
let foods: Food[] = [];

export function snakeGameSketch (p5: P5Instance) {
  p5.setup = () => {
    p5.createCanvas(400, 400, p5.P2D);
    p5.frameRate(5);
    snake = new Snake(p5);
    foods.push(new Food(p5, {x:2, y:2}));
    foods.push(new Food(p5, {x:20, y:20}));
  }  

  p5.keyPressed =() => {
    snake.moveControl(p5.keyCode);
  }

  p5.draw = () => { 
    p5.scale(resolution);
    p5.background(111);
    snake.update(foods);

    snake.show();
    foods.map( (item:Food) => { item.show(); });
  };
}

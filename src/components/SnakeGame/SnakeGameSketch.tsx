import { P5Instance } from "react-p5-wrapper";
import Snake from "./Snake";

const resolution = 10;
let snake: Snake;
export function snakeGameSketch (p5: P5Instance) {
  p5.setup = () => {
    p5.createCanvas(400, 400, p5.P2D);
    p5.frameRate(5);
    snake = new Snake(p5);    
  }  

  p5.keyPressed =() => {
    snake.moveControl(p5.keyCode);
  }

  p5.draw = () => { 
    p5.scale(resolution);
    p5.background(111);
    snake.update();
    snake.show();
  };
}

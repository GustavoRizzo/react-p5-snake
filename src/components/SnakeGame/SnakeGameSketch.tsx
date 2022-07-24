import { P5Instance } from "react-p5-wrapper";

export function snakeGameSketch (p5: P5Instance) {
  p5.setup = () => p5.createCanvas(400, 400, p5.P2D);

  p5.draw = () => {
    p5.background(111);
  };
}

import { P5Instance } from "react-p5-wrapper";
import Vector from "./Vector";

export default class Food {

    _p5: P5Instance;
    pos: Vector;

    constructor(p5: P5Instance, pos: Vector) {
        this._p5 = p5;
        this.pos = pos;
    }

    show() {
        const p5 = this._p5; // just to be more readable
        p5.fill(100,0,0);
        p5.noStroke();
        p5.rect( this.pos.x, this.pos.y, 1);
    }
}
import { P5Instance } from "react-p5-wrapper";

interface Vector {
    x: number,
    y: number
}

export default class Snake {
    _p5: P5Instance;
    pos: Vector;
    vel: Vector;

    constructor(p5: P5Instance) {
        this._p5 = p5;
        this.pos = {x: 20 , y: 10};
        this.vel = {x: 0 , y: 0};
    }

    setDir(x: number, y: number) {
        this.vel = {x: x , y: y};
    }

    moveControl (keyPressed: number) {
        const p5 = this._p5; // just to be more readable
        switch (this._p5.keyCode) {
            case p5.LEFT_ARROW:
                this.setDir(-1,0);
                break;
            case p5.RIGHT_ARROW:
                this.setDir(1,0);
                break;
            case p5.DOWN_ARROW:
                this.setDir(0,1);
                break;
            case p5.UP_ARROW:
                this.setDir(0,-1);
                break;
          }
    }

    update() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    show() {
        const p5 = this._p5; // just to be more readable
        p5.fill(0);
        p5.noStroke();
        p5.rect( this.pos.x, this.pos.y, 1);
    }

}
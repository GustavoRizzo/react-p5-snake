import { P5Instance } from "react-p5-wrapper";
import Food from "./Food";
import Vector from "./Vector";

export default class Snake {
    _p5: P5Instance;
    body:Vector[] =[] ;
    vel: Vector;

    constructor(p5: P5Instance) {
        this._p5 = p5;
        this.body[0] = {x: 20 , y: 10};
        this.vel = {x: 0 , y: 0};

        this.body[1] = {x: 20 , y: 20};
    }

    setDir(x: number, y: number) {
        this.vel = {x: x , y: y};
    }

    moveControl (keyPressed: number) {
        const p5 = this._p5; // to be more readable
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
            case 71: // tecla G to Grow
                this.grow();
                break;
            case 83: // tecla S to Stop
                this.setDir(0,0);
                break;
          }
    }

    grow() {
        let tail = this.body[this.body.length-1];
        this.body.push(tail);
    }

    update(foods:Food[]) {
        this.updatePosition();

        if(this.checkFeeding(foods)) {
            console.log("comeu");
            this.grow();
        }
    }

    updatePosition() {
        this.body.unshift();
        let newPos = {
            x: this.body[0].x + this.vel.x,
            y: this.body[0].y + this.vel.y
        }
        this.body.unshift(newPos);
        this.body.pop();
    }

    checkFeeding(foods:Food[]) :boolean {
        let flag = false;
        let head = {
            x: this.body[0].x,
            y: this.body[0].y
        }
        foods.map( (item:Food) => {
            if(head.x==item.pos.x && head.y==item.pos.y) {
                flag=true;
            }
        })
        return flag;        
    }

    show() {
        const p5 = this._p5; // to be more readable
        p5.fill(0);
        p5.noStroke();
        this.body.map( (item:Vector) => {
            p5.rect( item.x, item.y, 1);
        })
    }

}
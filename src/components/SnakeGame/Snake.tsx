import { P5Instance } from "react-p5-wrapper";
import Food from "./Food";
import Position2D from "./Position2D";

export default class Snake {
    _p5: P5Instance;
    body:Position2D[] = [];
    vel: Position2D;

    constructor(p5: P5Instance) {
        this._p5 = p5;
        this.body[0] = {x: 20 , y: 10};
        this.vel = {x: 0 , y: 0};

        this.body[1] = {x: 20 , y: 10};
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
        this.checkFinishedFeeding(foods);

        this.updatePosition();

        if(this.checkFeeding(foods)) {
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
        const headPosition = JSON.stringify(this.body[0]);

        foods.map( (food:Food) => {
            const foodPosition = JSON.stringify(food.pos);
            if(headPosition == foodPosition) {
                flag = true;
                food.wasSwallowed();
            }
        });

        return flag;        
    }

    checkFinishedFeeding(foods:Food[]) {
        let flag = false;
        const tailPosition = JSON.stringify(this.body[this.body.length-1]);

        foods.map( (food:Food) => {
            const foodPosition = JSON.stringify(food.pos);
            if(tailPosition == foodPosition) {
                food.wasEaten();
            }
        });     
    }

    show() {
        const p5 = this._p5; // to be more readable
        p5.fill(0);
        p5.noStroke();
        this.body.map( (item:Position2D) => {
            p5.rect( item.x, item.y, 1);
        })
    }

}
import { P5Instance } from "react-p5-wrapper";
import FoodCollection from "./FoodCollection";
import Position2D from "./Position2D";

export default class Snake {
    _p5: P5Instance;
    body:Position2D[] = [];
    vel: Position2D;

    constructor(p5: P5Instance) {
        this._p5 = p5;
        this.body[0] = {x: 20 , y: 10};
        this.body[1] = {x: 20 , y: 10};        
        this.vel = {x: 0 , y: 0};
    }

    setDirection(x: number, y: number) {
        this.vel = {x: x , y: y};
    }

    moveControl (keyPressed: number) {
        const p5 = this._p5; // to be more readable
        switch (this._p5.keyCode) {
            case p5.LEFT_ARROW:
                this.setDirection(-1,0);
                break;
            case p5.RIGHT_ARROW:
                this.setDirection(1,0);
                break;
            case p5.DOWN_ARROW:
                this.setDirection(0,1);
                break;
            case p5.UP_ARROW:
                this.setDirection(0,-1);
                break;
            case 71: // Key G to Grow
                this.grow();
                break;
            case 83: // Key S to Stop
                this.setDirection(0,0);
                break;
          }
    }

    grow() {
        let tail = this.body[this.body.length-1];
        this.body.push(tail);
    }

    update(foods:FoodCollection) {
        this.checkIfFed(foods);

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

    checkFeeding(foodCollection:FoodCollection) :boolean {
        let head = this.body[0]
        return foodCollection.checkFoodIsInSamePosition(head, 'swallow');        
    }

    checkIfFed(foodCollection:FoodCollection) :boolean {
        let tail = this.body[this.body.length-1];
        return foodCollection.checkFoodIsInSamePosition(this.body[0], 'eaten');   
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
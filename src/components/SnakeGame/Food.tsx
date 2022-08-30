import { P5Instance } from "react-p5-wrapper";
import Position2D from "./Position2D";

enum State {
    Available,
    Swallowed,
    Eaten
}

export default class Food {

    _p5: P5Instance;
    pos: Position2D;
    state: State;

    constructor(p5: P5Instance, pos: Position2D) {
        this._p5 = p5;
        this.pos = pos;
        this.state = State.Available;
    }

    setSwallowed () {
        this.state = State.Swallowed;
    }

    setEaten () {
        this.state = State.Eaten; 
    }

    static checkNotEaten (food: Food) {
        return (food.state != State.Eaten);
    }

    static checkAvailable (food: Food) {
        return (food.state == State.Available);
    }

    show() {
        const p5 = this._p5; // just to be more readable
        (this.state == State.Available) ? p5.fill(150,0,0) : p5.fill(60,0,0);
        p5.noStroke();
        p5.rect( this.pos.x, this.pos.y, 1);
    }
}
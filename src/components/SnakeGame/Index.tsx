import { ReactP5Wrapper } from "react-p5-wrapper";
import { snakeGameSketch } from "./SnakeGameSketch";

export default function SnakeGame() {
    return (
        <>
            <h1>Awasome Snake Game!</h1>
            <ReactP5Wrapper sketch={snakeGameSketch} />
        </>
    )
}
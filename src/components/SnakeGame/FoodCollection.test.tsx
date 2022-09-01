import FoodCollection from "./FoodCollection";
import { describe, expect, it} from "vitest";
import { P5Instance } from "react-p5-wrapper";
import Food from "./Food";

let p5 : P5Instance = { 
    height: 10
    ,width: 10
} as P5Instance;

describe('FoodCollection', () => {    

    it("when getgetRandomInt recive input 3 shuld return a number less ou equal to 3", () => {
        let collection = new FoodCollection(p5);
        let t = collection.getRandomInt(3);
        expect(t).toBeLessThanOrEqual(3);
    });

    it("when call addFood length of FoodCollection should incrice", () => {
        let collection = new FoodCollection(p5);
        collection.addFood(new Food(p5, {x:2, y:2}));
        let init_lenght = collection.foods.length;
        collection.addFood(new Food(p5, {x:2, y:2}));
        let final_lenght = collection.foods.length;
        expect(final_lenght).toBeGreaterThan(init_lenght);
    });

    it("when call addRandomFood length of FoodCollection should incrice", () => {
        let collection = new FoodCollection(p5);
        collection.addRandomFood();
        let init_lenght = collection.foods.length;
        collection.addRandomFood();
        let final_lenght = collection.foods.length;
        expect(final_lenght).toBeGreaterThan(init_lenght);
    });

});
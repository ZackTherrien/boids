import SelfBehavior, { ISelfBehavior } from "../../../Behavior/SelfBehavior";
import { 
    BIRD_EATING_SPEED,
    MAX_BIRD_ENERGY,
    ACCELERATION_ENERGY_COST,
    LIVING_ENERGY_COST,
    // BIRD_VISUAL_RANGE
} from "../../../constants";
import Boids from "../../..";

interface IEating extends ISelfBehavior {
}

export default class Eating extends SelfBehavior implements IEating {
    perform(deltaTime: number) {
        if(this.bird.landed) {
            const square = Boids.instance.terrain.getSquareAtLocation(this.bird.position);
            if(square && square.foodLevel > 0) {
                const potentialConsumption = BIRD_EATING_SPEED * deltaTime;
                let actualConsumption = potentialConsumption;
                if(potentialConsumption > square.foodLevel) {
                    actualConsumption = square.foodLevel;
                }
                if(actualConsumption + this.bird.energy > MAX_BIRD_ENERGY) {
                    actualConsumption = MAX_BIRD_ENERGY - this.bird.energy;
                }

                // birds will consume everything until there is no more food.
                square.foodLevel -= actualConsumption;
                this.bird.energy += actualConsumption;
            } else {
                this.bird.landed = false;
            }
        }

        this.bird.energy -= (
            ACCELERATION_ENERGY_COST * this.bird.acceleration.magnitude() * deltaTime * deltaTime +
            LIVING_ENERGY_COST * deltaTime
        );
    }
}
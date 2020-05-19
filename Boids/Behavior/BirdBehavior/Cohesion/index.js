"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
const constants_1 = require("../../../constants");
class Cohesion extends __1.default {
    perform(birdCount) {
        return this.value
            .divide(birdCount)
            .sub(this.bird.position)
            .normalize()
            .multiply(constants_1.BIRD_SPEED)
            .sub(this.bird.velocity)
            .multiply(constants_1.BIRD_COHESION_EAGERNESS);
    }
    accumulate(bird) {
        this.value.add(bird.position);
    }
}
exports.default = Cohesion;

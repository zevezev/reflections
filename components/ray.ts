import { Viewer } from "./viewer";
import { Mirror } from "./mirror";

export class Ray {
  viewer: Viewer;
  targetX: number;
  targetY: number;
  mirrors: Mirror[];
  slope: number;
  reflectionPointX: number;
  diamondY: number;
  diamondX: number;
  mirrorY: number;
  numReflections: number;
  mirror2Y: number;
  constructor(viewer, targetX, targetY, mirrors, numReflections = 1) {
    this.viewer = viewer;
    this.targetX = targetX;
    this.targetY = targetY;
    this.mirrors = mirrors;
    this.mirrorY = mirrors[0].getCoords()[1];
    this.mirror2Y = mirrors[1].getCoords()[1];
    this.slope = 0;
    this.reflectionPointX;
    //TODO: don't calculate this way
    this.diamondY = 2 * mirrors[0].getCoords()[1] - targetY;
    this.diamondX = targetX;
    this.numReflections = numReflections;
  }
  show(p5) {
    p5.stroke("blue");
    //dumb version that only works for horizontal lines but saves me from solving the
    //system of equations for line intersections
    let currentStartPtX = this.viewer.getX() + this.viewer.getW() / 2;
    let currentStartPtY = this.viewer.getY();
    let currentEndPtX = this.reflectionPointX;
    let currentEndPtY = this.mirrorY;
    let Xdistance = currentEndPtX - currentStartPtX;
    p5.line(currentStartPtX, currentStartPtY, currentEndPtX, currentEndPtY);

    for (let i = 0; i < this.numReflections - 1; i++) {
      const negativeSlope = currentEndPtY === this.mirrorY;
      let newEndPtY = negativeSlope ? this.mirror2Y : this.mirrorY;
      let newEndPtX =
        (newEndPtY - currentEndPtY) /
          (negativeSlope ? -this.slope : this.slope) +
        currentEndPtX;
      p5.line(currentEndPtX, currentEndPtY, newEndPtX, newEndPtY);
      currentEndPtX = newEndPtX;
      currentEndPtY = newEndPtY;
    }
    //TODO: get diamond radius from constants file
    p5.line(currentEndPtX, currentEndPtY, this.diamondX, this.diamondY - 20);
    p5.stroke("yellow");
    p5.line(this.reflectionPointX, this.mirrorY, this.targetX, this.targetY);
  }
  update() {
    this.updateSlope();
    this.updateMirrorIntercept();
  }
  updateSlope() {
    //dx/dy
    this.slope =
      (this.targetY - this.viewer.getY()) /
      (this.targetX - (this.viewer.getX() + this.viewer.getW() / 2));
  }
  //TODO: make so it doesn't only work for y=b mirrors
  updateMirrorIntercept() {
    //point slope form: y-y1 = m(x-x1), (y1,x1) = (this.mirrorDiamondX, this.mirrorDiamondY)
    // y-this.mirrorDiamondY = this.slope(x-this.mirrorDiamondX)
    this.reflectionPointX =
      (this.mirrorY - this.targetY) / this.slope + this.targetX;
  }
  setTarget(x, y, numReflections) {
    this.targetX = x;
    this.targetY = y;
    this.numReflections = numReflections;
  }
}

export class Ray {
  constructor(viewer, targetX, targetY, mirrors) {
    this.viewer = viewer;
    this.targetX = targetX;
    this.targetY = targetY;
    this.mirrors = mirrors;
    this.slope = 0;
    this.reflectionPoints = [];
    //TODO: don't calculate this way
    this.diamondY = 2 * mirrors[0].getCoords()[1] - targetY;
    this.diamondX = targetX;
  }
  show(p5) {
    p5.stroke("blue");
    p5.line(
      this.viewer.getX() + this.viewer.getW() / 2,
      this.viewer.getY(),
      this.reflectionPointX,
      this.mirrorY
    );
    //TODO: get diamond radius from constants file
    p5.line(
      this.reflectionPointX,
      this.mirrorY,
      this.diamondX,
      this.diamondY - 20
    );
    p5.stroke("yellow");
    p5.getYline(
      this.reflectionPointX,
      this.mirrorY,
      this.targetX,
      this.targetY
    );
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
  //TODO: make so it works for the whole mirror line, instead of just y = b
  //make line equations and use slope + line equations.
  updateMirrorIntercept() {
    //point slope form: y-y1 = m(x-x1), (y1,x1) = (this.targetX, this.targetY)
    // y-this.targetY = this.slope(x-this.targetX)
    let currentTargetX = this.targetX;
    let currentTargetY = this.targetY;
    //TODO: until intersects with diamond
    this.mirrors.forEach((mirror) => {
      let mirrorY = mirror.getCoords()[1];
      const reflectionPointX =
        (mirrorY - currentTargetY) / this.slope + currentTargetX;
      this.reflectionPoints.push([reflectionPointX, mirrorY]);
      this.slope = -this.slope;
    });
    // this.reflectionPointX =
    //   (this.mirrorY - this.targetY) / this.slope + this.targetX;
  }
  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
  }
}

export class Diamond {
  constructor(x, y, radius, setTarget) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.setTarget = setTarget;
  }
  show(p5) {
    p5.strokeWeight(3);
    p5.stroke("black");
    p5.fill("lightgreen");
    p5.ellipse(this.x, this.y, this.radius);
  }
  pressed(p5) {
    // Did I click on the rectangle?
    //TODO: use the actual shape of the ojbect
    if (
      p5.mouseX > this.x - this.radius &&
      p5.mouseX < this.x + this.radius &&
      p5.mouseY > this.y - this.radius &&
      p5.mouseY < this.y + this.radius
    ) {
      this.setTarget(this.x, this.y);
    }
  }
}

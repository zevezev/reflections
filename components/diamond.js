export class Diamond {
  constructor(x, y, radius, setTarget, reflectionIndex = 1) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.setTarget = setTarget;
    this.reflectionIndex = reflectionIndex;
    this.rollover = false;
  }
  show(p5) {
    p5.strokeWeight(3);
    this.rollover ? p5.stroke("lightgreen") : p5.stroke("black");
    p5.fill("lightgreen");
    p5.beginShape();
    p5.vertex(this.x - 10, this.y - 10);
    p5.vertex(this.x + 10, this.y - 10);
    p5.vertex(this.x + 15, this.y - 5);
    p5.vertex(this.x, this.y + 10);
    p5.vertex(this.x - 15, this.y - 5);
    p5.vertex(this.x - 10, this.y - 10);
    p5.endShape();
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
      this.setTarget(this.x, this.y, this.reflectionIndex);
    }
  }

  over(p5) {
    // Is mouse over object
    if (
      p5.mouseX > this.x - this.radius &&
      p5.mouseX < this.x + this.radius &&
      p5.mouseY > this.y - this.radius &&
      p5.mouseY < this.y + this.radius
    ) {
      this.rollover = true;
      p5.cursor("grab");
    } else {
      if (this.rollover === true) p5.cursor("auto");

      this.rollover = false;
    }
  }
}

import p5Types from "p5";

export class Mirror {
  x: number;
  y: number;
  x2: number;
  y2: number;
  constructor(x, y, x2, y2) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
  }
  show(p5: p5Types) {
    p5.stroke("blue");
    p5.strokeWeight(3);
    p5.line(this.x, this.y, this.x2, this.y2);
  }
  getCoords() {
    return [this.x, this.y, this.x2, this.y2];
  }
}

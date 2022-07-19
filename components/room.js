export class Room {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  show(p5) {
    p5.fill("white");
    p5.stroke("black");
    p5.rect(this.x, this.y, this.w, this.h);
  }
}

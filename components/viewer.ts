import p5Types from "p5";

// Click and Drag an object
// referenced from Daniel Shiffman <http://www.shiffman.net>

export class Viewer {
  dragging: boolean;
  rollover: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  offsetX: number;
  offsetY: number;
  roomWidth: number;
  roomHeight: number;
  roomX: number;
  roomY: number;
  constructor(x, y, roomX, roomY, roomWidth, roomHeight) {
    this.dragging = false; // Is the object being dragged?
    this.rollover = false; // Is the mouse over the ellipse?
    this.x = x;
    this.y = y;
    //TODO: use constants
    this.w = 40;
    this.h = 40;
    this.offsetX = 0;
    this.offsetY = 0;
    this.roomWidth = roomWidth;
    this.roomHeight = roomHeight;
    //TODO: use constants
    this.roomX = roomX;
    this.roomY = roomY;
  }

  over(p5: p5Types) {
    // Is mouse over object
    if (
      p5.mouseX > this.x &&
      p5.mouseX < this.x + this.w &&
      p5.mouseY > this.y &&
      p5.mouseY < this.y + this.h
    ) {
      this.rollover = true;
    } else {
      this.rollover = false;
    }
  }

  update(p5: p5Types) {
    // Adjust location if being dragged
    if (this.dragging) {
      this.x = Math.min(
        this.roomX + this.roomWidth - this.w,
        Math.max(this.roomX, p5.mouseX + this.offsetX)
      );
      this.y = Math.min(
        this.roomY + this.roomHeight - this.h,
        Math.max(this.roomY, p5.mouseY + this.offsetY)
      );
    }
  }

  show(p5: p5Types) {
    p5.stroke(0);
    // Different fill based on state
    if (this.dragging) {
      p5.fill(50);
    } else if (this.rollover) {
      p5.fill(100);
    } else {
      p5.fill(175, 200);
    }
    p5.rect(this.x, this.y, this.w, this.h);
  }

  pressed(p5: p5Types) {
    // Did I click on the rectangle?
    if (
      p5.mouseX > this.x &&
      p5.mouseX < this.x + this.w &&
      p5.mouseY > this.y &&
      p5.mouseY < this.y + this.h
    ) {
      this.dragging = true;
      //TODO: use room as bounding box
      // If so, keep track of relative location of click to corner of rectangle
      this.offsetX = this.x - p5.mouseX;
      this.offsetY = this.y - p5.mouseY;
    }
  }

  released() {
    // Quit dragging
    this.dragging = false;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
  getW() {
    return this.w;
  }
  getH() {
    return this.h;
  }
}

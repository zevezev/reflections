import Sketch from "react-p5";
import { Diamond } from "../../components/diamond";
import { Room } from "../../components/room.js";
import { Mirror } from "../../components/mirror";
import { Ray } from "../../components/ray";
import { Viewer } from "../../components/viewer";
import p5Types from "p5";
import dynamic from "next/dynamic";

let x = 50;
let y = 50;
const Content = () => {
  if (typeof window !== "undefined") {
    const Sketch = dynamic(() => import("react-p5"));
    //mvp: the viewer is the mouse. we calculate the vector from the diamond to the mouse to get the angle shape
    //later make it so the angle is controlled by another diamond
    //let's get right to the angle stuff as it's the key

    let mirrors: Mirror[] = [];
    let mirrorDiamonds: Diamond[] = [];
    let viewer: Viewer;
    let ray: Ray;
    let room: Room;
    let diamond: Diamond;
    const setup = (p5: p5Types, canvasParentRef: Element) => {
      const canvasWidth = 750;
      const canvasHeight = 750;

      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

      const buildRoom = () => {
        //TODO: use a constants file
        const roomWidth = 600;
        const roomHeight = 250;
        const roomX = canvasWidth / 2 - roomWidth / 2;
        const roomY = canvasHeight / 2;

        const diamondX = roomX + (roomWidth * 3) / 4;
        const diamondY = roomY + (roomHeight * 1) / 2;

        const viewerX = roomX + roomWidth / 4;
        const viewerY = roomY + (roomHeight * 1) / 2;

        const diamondRadius = 40;
        const mirrorDiamondX = diamondX;
        const mirrorDiamondY = roomY - (diamondY - roomY) - diamondRadius / 2;
        room = new Room(roomX, roomY, roomWidth, roomHeight);
        mirrors.push(new Mirror(roomX, roomY, roomX + roomWidth, roomY));
        diamond = new Diamond(diamondX, diamondY, diamondRadius, () => {});
        mirrorDiamonds.push(
          new Diamond(mirrorDiamondX, mirrorDiamondY, diamondRadius, () => {})
        );
        viewer = new Viewer(
          viewerX,
          viewerY,
          roomX,
          roomY,
          roomWidth,
          roomHeight
        );
        ray = new Ray(viewer, mirrorDiamondX, mirrorDiamondY, mirrors);
      };

      const buildDoubleMirrorRoom = () => {
        const roomWidth = 600;
        const roomHeight = 130;
        const roomX = canvasWidth / 2 - roomWidth / 2;
        const roomY = canvasHeight - roomHeight - 10;

        const diamondX = roomX + (roomWidth * 3) / 4;
        const diamondY = roomY + (roomHeight * 1) / 2;

        const viewerX = roomX + roomWidth / 4;
        const viewerY = roomY + (roomHeight * 1) / 2;

        const diamondRadius = 40;
        const mirrorDiamondX = diamondX;
        const mirrorDiamondY = roomY - (diamondY - roomY) - diamondRadius / 2;
        const numReflections = 6;
        room = new Room(roomX, roomY, roomWidth, roomHeight);
        mirrors.push(new Mirror(roomX, roomY, roomX + roomWidth, roomY));
        mirrors.push(
          new Mirror(
            roomX,
            roomY + roomHeight,
            roomX + roomWidth,
            roomY + roomHeight
          )
        );

        viewer = new Viewer(
          viewerX,
          viewerY,
          roomX,
          roomY,
          roomWidth,
          roomHeight
        );
        ray = new Ray(viewer, mirrorDiamondX, mirrorDiamondY, mirrors);
        const setTarget = (x, y, numReflections) =>
          ray.setTarget(x, y, numReflections);
        diamond = new Diamond(diamondX, diamondY, diamondRadius, () => {});
        for (let i = 0; i < numReflections; i++) {
          mirrorDiamonds.push(
            new Diamond(
              diamondX,
              diamondY - (i + 1) * 2 * (diamondY - roomY),
              diamondRadius,
              setTarget,
              i + 1
            )
          );
        }
      };

      buildDoubleMirrorRoom();
    };

    const draw = (p5: p5Types) => {
      p5.background(200);
      room?.show(p5);

      //TODO: find intersection of ray and mirror, then create the ray to the diamond

      ray?.update();
      ray?.show(p5);

      viewer?.over(p5);
      viewer?.update(p5);
      viewer?.show(p5);

      diamond?.show(p5);
      mirrorDiamonds?.forEach((diamond) => diamond.show(p5));
      mirrors?.forEach((mirror) => mirror.show(p5));
    };

    const mousePressed = (p5: p5Types) => {
      viewer.pressed(p5);
      diamond.pressed(p5);
      mirrorDiamonds.forEach((diamond) => diamond.pressed(p5));
    };

    const mouseReleased = () => {
      viewer.released();
    };

    return (
      <Sketch
        setup={setup}
        draw={draw}
        mousePressed={mousePressed}
        mouseReleased={mouseReleased}
      />
    );
  } else {
    return null;
  }
};
export default Content;

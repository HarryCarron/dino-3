import { Layer } from "../classes/Layer";
import container, { CanvasContext, CanvasDims } from "../container";

const backgroundCacti = container.resolve<Layer>(Layer);

const cactus1 = new Image();
cactus1.src = "assets/img/cacti/cactus_1.webp";

let activeCacti: number[] = [];

backgroundCacti.setFrameRate(1);
backgroundCacti.setRenderer(
  (ctx: CanvasContext, dims: CanvasDims, clock: number) => {
    const rand = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    if (rand(1, 450) > 449) {
      activeCacti.push(600);
    }

    activeCacti = activeCacti
      .map(cactus => {
        const newX = cactus - 1;
        ctx.ctx.drawImage(cactus1, newX, 30);
        return newX;
      })
      .filter(cactus => cactus > -50);
  }
);

export default backgroundCacti;

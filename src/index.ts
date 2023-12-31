import { Layer } from "./classes/Layer";
import "reflect-metadata";
import container, { CanvasDims } from "./container";
import background from "./layers/background.layer";

export interface CanvasContext {
  ctx: CanvasRenderingContext2D;
}

const masterLayer = container.resolve<Layer>(Layer);

masterLayer.setRenderer(
  (ctx: CanvasContext, dims: CanvasDims, clock: number) => {
    ctx.ctx.clearRect(0, 0, dims.width, dims.height);
  }
);

masterLayer.setFrameRate(1);
masterLayer.setSubLayers([background]);

let clock = -1;

const start = () => {
  requestAnimationFrame(() => {
    clock = clock + 1;
    masterLayer.render(clock);
    start();
  });
};

start();

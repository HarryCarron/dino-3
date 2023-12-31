import { Layer } from "../classes/Layer";
import container, { CanvasContext, CanvasDims } from "../container";
import backgroundCacti from "./background-cacti.layer";

const background = container.resolve<Layer>(Layer);

let activeGrit: [number, number][] = [];

let currentLookAhead: number = 0;

const makeGrit = (
  h: number,
  w: number,
  am: number,
  x: number = 0
): [number, number][] => {
  const rand = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  return Array.from({ length: am }).map(() => {
    return [rand(x, x + w), h + (rand(1, 2) === 1 ? 5 : 7)];
  });
};

background.setFrameRate(1);
background.setSubLayers([backgroundCacti]);
background.setRenderer(
  (ctx: CanvasContext, dims: CanvasDims, clock: number) => {
    const floorBeginsAt = dims.height - 30;

    if (clock === 1) {
      activeGrit = makeGrit(floorBeginsAt, dims.width, 30);
    }

    ctx.ctx.beginPath();
    ctx.ctx.moveTo(0, floorBeginsAt);
    ctx.ctx.lineTo(dims.width, floorBeginsAt);
    ctx.ctx.stroke();

    activeGrit = activeGrit
      .map(grit => {
        const [x, y] = grit;
        ctx.ctx.beginPath();
        ctx.ctx.moveTo(x, y);
        ctx.ctx.lineTo(x + 2, y);
        ctx.ctx.stroke();

        const newX = x - 1;

        return [newX, y] as [number, number];
      })
      .filter(grit => {
        return grit[0] > 0;
      });

    if (currentLookAhead === 0) {
      currentLookAhead = 50;
      const lookAheadGrit = makeGrit(floorBeginsAt, 50, 3, 600);
      activeGrit = [...activeGrit, ...lookAheadGrit];
    }

    currentLookAhead--;
  }
);

export default background;

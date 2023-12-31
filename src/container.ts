import { Layer } from "./classes/Layer";
import "reflect-metadata";
import { Container } from "inversify";

const host: HTMLElement = document.getElementById("host")!;

export interface CanvasContext {
  ctx: CanvasRenderingContext2D;
}

export interface CanvasDims {
  height: number;
  width: number;
}

const canvas = document.createElement("canvas");

canvas.width = 600;
canvas.height = 150;

host.appendChild(canvas);

const ctx: CanvasRenderingContext2D = canvas.getContext("2d")!;

const container = new Container();
container.bind<CanvasContext>("CanvasContext").toConstantValue({ ctx });
container
  .bind<CanvasDims>("CanvasDims")
  .toConstantValue({ height: 150, width: 600 });
container.bind<Layer>(Layer).toSelf();

export default container;

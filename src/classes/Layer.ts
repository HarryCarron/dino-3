import "reflect-metadata";

import { injectable, inject } from "inversify";
import { CanvasContext } from "..";
import { CanvasDims } from "../container";

export type LayerRenderer = (
  context: CanvasContext,
  dims: CanvasDims,
  clock: number
) => void;

@injectable()
export class Layer {
  private subLayers: Layer[] = [];
  private frameRate: number = 1;
  private renderer: LayerRenderer | undefined;

  constructor(
    @inject("CanvasContext") private readonly canvasContext: CanvasContext,
    @inject("CanvasDims") private readonly canvasDims: CanvasDims
  ) {}

  setFrameRate(frameRate: number) {
    this.frameRate = frameRate;
  }

  setSubLayers(subLayers: Layer[]) {
    this.subLayers = subLayers;
  }

  setRenderer(renderer: LayerRenderer) {
    this.renderer = renderer;
  }

  render(clock: number) {
    if (clock % this.frameRate === 0) {
      this.renderer?.(this.canvasContext, this.canvasDims, clock);
    }

    this.subLayers.forEach(layer => {
      layer.render(clock);
    });
  }
}

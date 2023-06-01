import { Position, Size, ArrowKeys, WsKeys } from "features/ping-pong/types";

export class Player {
  constructor(
    private ctx: CanvasRenderingContext2D,
    public position: Position,
    public size: Size,
    private keyType: "WS" | "ARROWS",
    private wsKeys: WsKeys,
    private arrowKeys: ArrowKeys,
    private velocityY: number
  ) {}

  draw = (color: string) => {
    const { x, y } = this.position;
    const { w, h } = this.size;

    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, w, h);

    if (this.keyType === "WS") {
      if (this.wsKeys.KeyW && y > 10) {
        this.position.y -= this.velocityY;
      }

      if (this.wsKeys.KeyS && y < this.ctx.canvas.height - this.size.h - 10) {
        this.position.y += this.velocityY;
      }
    }

    if (this.keyType === "ARROWS") {
      if (this.arrowKeys.ArrowUp && y > 10) {
        this.position.y -= this.velocityY;
      }

      if (
        this.arrowKeys.ArrowDown &&
        y < this.ctx.canvas.height - this.size.h - 10
      ) {
        this.position.y += this.velocityY;
      }
    }
  };
}

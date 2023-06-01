import { Position } from "features/ping-pong/types/position";
import { Player } from "features/ping-pong/Player";

export class Ball {
  constructor(
    private ctx: CanvasRenderingContext2D,
    public position: Position,
    private leftPlayer: Player,
    private rightPlayer: Player,
    private ballRadius: number,
    public velocityX: number,
    public velocityY: number
  ) {
    this.ctx = ctx;
  }

  draw = (color: string) => {
    const { x, y } = this.position;

    this.ctx.beginPath();
    this.ctx.fillStyle = color;
    this.ctx.arc(x, y, this.ballRadius, 0, 2 * Math.PI);
    this.ctx.fill();

    // Collision with TOP || BOTTOM of canvas
    if (y + this.ballRadius >= this.ctx.canvas.height) {
      this.velocityY = -this.velocityY;
    }

    if (y - this.ballRadius <= 0) {
      this.velocityY = Math.abs(this.velocityY);
    }

    // Collision with LEFT || RIGHT player
    if (
      x - this.ballRadius - this.leftPlayer.size.w <=
        this.leftPlayer.position.x &&
      y >= this.leftPlayer.position.y - this.ballRadius &&
      y <= this.leftPlayer.position.y + this.leftPlayer.size.h + this.ballRadius
    ) {
      this.velocityX = Math.abs(this.velocityX);
    }

    if (
      x + this.ballRadius + this.rightPlayer.size.w >=
        this.rightPlayer.position.x &&
      y >= this.rightPlayer.position.y - this.ballRadius &&
      y - this.ballRadius <=
        this.rightPlayer.position.y + this.rightPlayer.size.h + this.ballRadius
    ) {
      this.velocityX = -this.velocityX;
    }

    if (x < this.leftPlayer.position.x) {
      this.velocityX = Math.abs(this.velocityX);
    }

    if (x > this.rightPlayer.position.x) {
      this.velocityX = -this.velocityX;
    }

    this.position.x += this.velocityX;
    this.position.y += this.velocityY;
  };
}

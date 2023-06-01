import { Ball } from "features/ping-pong/Ball";
import { Player } from "features/ping-pong/Player";
import { Controls } from "features/ping-pong/Controls";

export class PingPong {
  private readonly ctx: CanvasRenderingContext2D;
  private controls: Controls;
  private intervalId: NodeJS.Timer | number = 0;
  private ball: Ball;
  private readonly leftPlayer: Player;
  private readonly rightPlayer: Player;
  private velocityX = -5;
  private velocityY = 5;
  onScore!: (info: { left: boolean; right: boolean }) => void;

  constructor(
    private canvas: HTMLCanvasElement,
    private canvasParent: HTMLDivElement,
    private ballRadius = 20
  ) {
    this.ctx = canvas.getContext("2d")!;
    this.controls = new Controls();
    this.leftPlayer = new Player(
      this.ctx,
      { x: 10, y: this.canvas.height / 2 - 50 },
      { w: 10, h: 100 },
      "WS",
      this.controls.wsKeys,
      this.controls.arrowKeys,
      this.velocityY
    );
    this.rightPlayer = new Player(
      this.ctx,
      { x: this.canvas.width - 20, y: this.canvas.height / 2 - 50 },
      { w: 10, h: 100 },
      "ARROWS",
      this.controls.wsKeys,
      this.controls.arrowKeys,
      this.velocityY
    );
    this.ball = new Ball(
      this.ctx,
      {
        x: this.ctx.canvas.width / 2,
        y: this.ctx.canvas.height / 2,
      },
      this.leftPlayer,
      this.rightPlayer,
      ballRadius,
      this.velocityX,
      this.velocityY
    );
  }

  loop = () => {
    this.intervalId = setInterval(() => {
      this.render();
    }, 10);
  };

  private render = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawDividerLine();
    this.ball.draw("red");
    this.leftPlayer.draw("white");
    this.rightPlayer.draw("orange");

    // If player didn't touch the ball, reset ball to center of a canvas
    // and increase score the other player
    if (this.ball.position.x < this.leftPlayer.position.x) {
      this.onScore({ left: false, right: true });
      this.ball.position = {
        x: this.ctx.canvas.width / 2,
        y: this.ctx.canvas.height / 2,
      };
      this.ball.velocityX = Math.abs(this.ball.velocityX);
    }

    if (this.ball.position.x > this.rightPlayer.position.x) {
      this.onScore({ left: true, right: false });
      this.ball.position = {
        x: this.ctx.canvas.width / 2,
        y: this.ctx.canvas.height / 2,
      };
      this.ball.velocityX = -this.ball.velocityX;
    }
  };

  private resize = () => {
    this.canvas.width = this.canvasParent.offsetWidth;
    this.canvas.height = this.canvasParent.offsetHeight;
  };

  private drawDividerLine = () => {
    this.ctx.beginPath();
    this.ctx.setLineDash([5, 15]);
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.strokeStyle = "white";
    this.ctx.stroke();
  };

  mountEvents = () => {
    this.resize();
    addEventListener("resize", this.resize);
    this.controls.mountEvents();
  };

  unMountEvents = () => {
    clearInterval(this.intervalId);
    removeEventListener("resize", this.resize);
    this.controls.unMountEvents();
  };
}

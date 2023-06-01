import { ArrowKeys, WsKeys } from "features/ping-pong/types/keys";

export class Controls {
  wsKeys: WsKeys;
  arrowKeys: ArrowKeys;

  constructor() {
    this.wsKeys = { KeyW: false, KeyS: false };
    this.arrowKeys = { ArrowUp: false, ArrowDown: false };
  }

  private onKeydown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "KeyW":
        this.wsKeys.KeyW = true;
        break;
      case "KeyS":
        this.wsKeys.KeyS = true;
        break;
      case "ArrowUp":
        this.arrowKeys.ArrowUp = true;
        break;
      case "ArrowDown":
        this.arrowKeys.ArrowDown = true;
        break;
    }
  };

  private onKeyup = (event: KeyboardEvent) => {
    switch (event.code) {
      case "KeyW":
        this.wsKeys.KeyW = false;
        break;
      case "KeyS":
        this.wsKeys.KeyS = false;
        break;
      case "ArrowUp":
        this.arrowKeys.ArrowUp = false;
        break;
      case "ArrowDown":
        this.arrowKeys.ArrowDown = false;
        break;
    }
  };

  mountEvents = () => {
    addEventListener("keydown", this.onKeydown);
    addEventListener("keyup", this.onKeyup);
  };

  unMountEvents = () => {
    removeEventListener("keydown", this.onKeydown);
    removeEventListener("keyup", this.onKeyup);
  };
}

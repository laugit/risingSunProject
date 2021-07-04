import { Sun } from './sun';

// the state in which the sun is according to the user choices
export abstract class SunState {
  height = 0;
  upheight = 0;
  width = 0;
  quart = 0;
  half = 0;
  tqrt = 0; // three quarter of width
  heightoffset = 0;
  yoffset = 0;
  reflectOffset = 0;
  blur = 0;
  sun: Sun;

  constructor() {
    this.height = Math.floor(window.innerHeight * 0.7);
    this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
    this.width = window.innerWidth;
    this.quart = Math.floor(this.width / 4);
    this.half = Math.floor(this.width / 2);
    this.tqrt = Math.floor((this.width * 3) / 4); // three quarter of width
    this.blur = 8;
    this.reflectOffset = 40;
    this.yoffset = 10;
  }

  getSun(): Sun {
    return this.sun;
  }

  getHeightOffset(): number {
    return this.heightoffset;
  }

  abstract goToNextState(): SunState;

  getScreenRatio() {
    const w = window.innerWidth;
    if (w >= 1008) {
      return 1;
    }
    if (w >= 640 && w < 1008) {
      return 1.2;
    }
    if (w >= 375 && w < 640) {
      return 1.5;
    }
    return 1.9;
  }

  //set the visibility of the continue, yes and no buttons
  setButtonsVisibility(
    isContinueVisible: boolean,
    isYesVisible: boolean,
    isNoVisible: boolean
  ) {
    (
      document.getElementsByClassName('continuebtn')[0] as HTMLElement
    ).style.visibility = isContinueVisible ? 'visible' : 'hidden';
    (
      document.getElementsByClassName('yesbtn')[0] as HTMLElement
    ).style.visibility = isYesVisible ? 'visible' : 'hidden';
    (
      document.getElementsByClassName('nobtn')[0] as HTMLElement
    ).style.visibility = isNoVisible ? 'visible' : 'hidden';
  }

  sWP(initialWidthPos: number): string {
    return Math.floor(
      // we divide the position by a ratio to make it fit to the screen (narrow it or extend it according to the screen)
      initialWidthPos / (1280 / (window.innerWidth * this.getScreenRatio())) +
        window.innerWidth * 0.45 -
        (this.getScreenRatio() > 1 ? 10 * this.getScreenRatio() : 0) // this is the offset to avoid the sun to go to far to the right
    ).toString();
  }

  sHP(initialHeightPos: number): string {
    return (
      initialHeightPos / (window.screen.availHeight / window.innerHeight) +
      Math.floor(window.innerHeight * 0.7)
    ).toString();
  }
}

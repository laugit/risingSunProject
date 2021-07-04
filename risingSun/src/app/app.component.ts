import { Component, OnInit } from '@angular/core';
import { Sun } from './sun';
import { SunContext } from './suncontext';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'rebirthForRomania';
  context: SunContext;
  scrollMode = false;
  height = 0;
  upheight = 0;
  maxheight = 0;
  width = 0;
  quart = 0;
  half = 0;
  tqrt = 0; // three quarter of width

  //TODO size of text responsive
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

  //scale x position according to the screen width
  sWP(initialWidthPos: number): string {
    return Math.floor(
      // we divide the position by a ratio to make it fit to the screen (narrow it or extend it according to the screen)
      // 1280 is a standard width
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

  makeSunRise(btn?: Element): void {
    if (btn) {
      const isPositive = btn.innerHTML === 'YES';
      this.context.getSun().setChoice(isPositive ? 'YES' : 'NO');
    }
    this.context.handleState();
  }

  resizeText(): void {
    // change the font size according to the screen size
    if (this.width >= 640) {
      (
        document.getElementsByClassName('currenttext')[0] as HTMLElement
      ).style.fontSize = '2em';
      return;
    }
    if (this.width >= 375 && this.width < 640) {
      (
        document.getElementsByClassName('currenttext')[0] as HTMLElement
      ).style.fontSize = '1.7em';
      return;
    }
    (
      document.getElementsByClassName('currenttext')[0] as HTMLElement
    ).style.fontSize = '1.5em';
  }

  resizeYesNoButtons() {
    if (this.width < 375) {
      (
        document.getElementsByClassName('yesbtn')[0] as HTMLElement
      ).style.width = '25%';
      (document.getElementsByClassName('yesbtn')[0] as HTMLElement).style.left =
        '25%';
      (document.getElementsByClassName('nobtn')[0] as HTMLElement).style.width =
        '25%';
      return;
    }
    (document.getElementsByClassName('yesbtn')[0] as HTMLElement).style.width =
      '12%';
    (document.getElementsByClassName('yesbtn')[0] as HTMLElement).style.left =
      '37%';
    (document.getElementsByClassName('nobtn')[0] as HTMLElement).style.width =
      '12%';
  }

  resizeContinueButton() {
    if (this.width < 640) {
      (
        document.getElementsByClassName('continuebtn')[0] as HTMLElement
      ).style.width = '50%';
      (
        document.getElementsByClassName('continuebtn')[0] as HTMLElement
      ).style.left = '25%';
      return;
    }
    (
      document.getElementsByClassName('continuebtn')[0] as HTMLElement
    ).style.width = '25%';
    (
      document.getElementsByClassName('continuebtn')[0] as HTMLElement
    ).style.left = '37%';
  }

  adaptTextColor() {
    if (window.innerHeight < 640) {
      (
        document.getElementsByClassName('currenttext')[0] as HTMLElement
      ).style.color = '#ffffff';
      return;
    }
    (
      document.getElementsByClassName('currenttext')[0] as HTMLElement
    ).style.color = '#ff9d52';
  }

  ngOnInit(): void {
    this.context = new SunContext(new Sun());
    this.height = Math.floor(window.innerHeight * 0.7);
    this.maxheight = Math.floor(window.innerHeight * 0.7);
    this.upheight = Math.floor((this.height * 6) / 7);
    this.width = window.innerWidth;
    this.quart = Math.floor(this.width / 4);
    this.half = Math.floor(this.width / 2);
    this.tqrt = Math.floor((this.width * 3) / 4); // three quarter of width
    //hide continue button on click
    (document.getElementsByClassName('continuebtn')[0] as HTMLElement).onclick =
      (evt) => {
        (evt.target as HTMLElement).style.visibility = 'hidden';
      };
    this.resizeText();
    this.resizeContinueButton();
    this.resizeYesNoButtons();
    this.adaptTextColor();
    window.onresize = () => {
      this.height = Math.floor(window.innerHeight * 0.7);
      this.width = window.innerWidth;
      this.quart = Math.floor(this.width / 4);
      this.half = Math.floor(this.width / 2);
      this.tqrt = Math.floor((this.width * 3) / 4); // three quarter of width
      this.upheight =
        Math.floor((this.height * 6) / 7) -
        this.context.getState().getHeightOffset();
      this.resizeText();
      this.resizeContinueButton();
      this.resizeYesNoButtons();
      this.adaptTextColor();
    };
  }
}

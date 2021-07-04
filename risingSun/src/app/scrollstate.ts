import { SunState } from './sunstate';
import { Sun } from './sun';
import { EndState } from './endstate';

export class ScrollState extends SunState {
  sun: Sun;
  text =
    'GO TO A QUIET PLACE AND REPEAT THIS TEXT: <br /> I FORGET ALL THE ISSUES IN MY LIFE. I DO NOT CARE ABOUT THE REST RIGHT NOW. I AM IMMERGED IN THE SUN. CONTINUE TO SAY RELAXING PHRASE : A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXT A LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXTA LONG TEXT A LONG TEXT';
  endtext = 'BE HAPPY AND CONTINUE TO ENJOY THE SUN!';
  initLightOffset = '25';
  initSeaShadow = '0 -5vh 110px 50px #ff9d52';
  initGrad1Offset = '65%';
  initGrad2Offset = '63%';
  initSunPartY = (this.height - 10).toString();
  initReflect1 = `M${this.sWP(15)} ${this.height} L${this.sWP(65)} ${this.sHP(
    57
  )} L${this.sWP(115)} ${this.height}`;
  initReflect2 = `M${this.sWP(15)} ${this.height} L${this.sWP(65)} ${this.sHP(
    57
  )} L${this.sWP(95)} ${this.height}`;
  initSkyColor = '#287db380';
  initSeaColor = '#114f7e80';
  constructor(sun: Sun) {
    super();
    this.sun = sun;
    this.heightoffset = 30;
    this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
    this.blur = 15;
    this.yoffset = -14;
    this.reflectOffset = 57;
    this.sun
      .withLightOffset('25')
      .withCurrentText(this.text)
      .withSeaShadow('0 -5vh 110px 50px #ff9d52')
      .withSunGradsOffset('65%', '63%')
      .withSunpartY(this.yoffset)
      .withReflectsPath(this.reflectOffset)
      .withColors('#287db380', '#114f7e80')
      .withHalo(this.height, this.width, this.upheight, this.blur);
    //hide all buttons
    this.setButtonsVisibility(false, false, false);
    (
      document.getElementsByClassName('currenttext')[0] as HTMLElement
    ).onscroll = (evt) => {
      const target = evt.target as HTMLElement;
      const txtScroll = target.scrollTop;
      const maxScroll = target.scrollHeight - target.clientHeight;
      const offset = Math.floor(txtScroll / 15);
      if (txtScroll < maxScroll) {
        const lightOffset = (
          Number.parseInt(this.initLightOffset) + offset
        ).toString();
        const shadowHeight = (
          Number.parseInt(this.initSeaShadow.split(' ')[3]) +
          Math.floor(offset / 2)
        ).toString();
        const shadowBlur = (
          Number.parseInt(this.initSeaShadow.split(' ')[2]) +
          Math.floor(offset / 2)
        ).toString();
        const seaShadow = this.initSeaShadow
          .replace('110px', `${shadowBlur}px`)
          .replace('50px', `${shadowHeight}px`);
        const gradOffset1 =
          (
            Number.parseInt(this.initGrad1Offset.replace('%', '')) +
            Math.floor(offset / 2)
          ).toString() + '%';
        const gradOffset2 =
          (
            Number.parseInt(this.initGrad2Offset.replace('%', '')) +
            Math.floor(offset / 2)
          ).toString() + '%';
        const colorsOpacity = (128 + offset).toString(16);
        this.heightoffset = 30 + offset;
        this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
        this.blur += this.blur < 40 ? Math.floor(offset / 2) : 0;
        this.sun
          .withLightOffset(lightOffset)
          .withSeaShadow(seaShadow)
          .withSunGradsOffset(gradOffset1, gradOffset2)
          .withSunpartY(this.yoffset - offset)
          .withReflectsPath(this.reflectOffset + offset * 2)
          .withColors(`#287db3${colorsOpacity}`, `#114f7e${colorsOpacity}`)
          .withHalo(this.height, this.width, this.upheight, this.blur);
      } else {
        //change text before next state
        setTimeout(() => {
          const sleep = (milliseconds) => {
            const date = Date.now();
            let currDate = null;
            do {
              currDate = Date.now();
            } while (currDate - date < milliseconds);
          };
          (
            document.getElementsByClassName('continuebtn')[0] as HTMLElement
          ).style.visibility = 'visible';
          sleep(1000);
        }, 2500);
        setTimeout(() => {
          this.sun.withCurrentText(this.endtext);
          (
            document.getElementsByClassName('currenttext')[0] as HTMLElement
          ).style.visibility = 'hidden';
        }, 2000);
      }
    };
  }

  goToNextState(): SunState {
    return new EndState(this.sun);
  }
}

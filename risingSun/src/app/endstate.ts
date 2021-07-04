import { SunState } from './sunstate';
import { Sun } from './sun';

export class EndState extends SunState {
  sun: Sun;
  initLightOffset = '25';
  endtext = 'BE HAPPY AND CONTINUE TO ENJOY THE SUN!';
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
  initLeafOpacity = 64;
  initParlamentOpacity = 128;
  initGroundOpacity = 80;
  initReflectOpacity = 53;
  constructor(sun: Sun) {
    super();
    this.sun = sun;
    const txt = document.getElementsByClassName(
      'currenttext'
    )[0] as HTMLElement;
    const maxScroll = txt.scrollHeight - txt.clientHeight;
    const offset = Math.floor(maxScroll / 15);
    // setting sun halo parameters
    this.heightoffset = 30 + offset;
    this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
    this.blur = 40;
    this.reflectOffset = 57 + offset;
    this.yoffset = -14 - offset;

    const lightOffset = (
      Number.parseInt(this.initLightOffset) + offset
    ).toString();
    const shadowHeight = (
      Number.parseInt(this.initSeaShadow.split(' ')[3]) + offset
    ).toString();
    const shadowBlur = (
      Number.parseInt(this.initSeaShadow.split(' ')[2]) + offset
    ).toString();
    const seaShadow = this.initSeaShadow
      .replace('110px', `${shadowBlur}px`)
      .replace('50px', `${shadowHeight}px`);
    const gradOffset1 =
      (
        Number.parseInt(this.initGrad1Offset.replace('%', '')) + offset
      ).toString() + '%';
    const gradOffset2 =
      (
        Number.parseInt(this.initGrad2Offset.replace('%', '')) + offset
      ).toString() + '%';
    const sunPartY = (Number.parseInt(this.initSunPartY) - offset).toString();
    const colorsOpacity = (128 + offset).toString(16);
    //place sun at maxScroll
    this.sun
      .withLightOffset(lightOffset)
      .withSeaShadow(seaShadow)
      .withSunGradsOffset(gradOffset1, gradOffset2)
      .withSunpartY(this.yoffset)
      .withReflectsPath(this.reflectOffset)
      .withColors(`#287db3${colorsOpacity}`, `#114f7e${colorsOpacity}`)
      .withHalo(this.height, this.width, this.upheight, this.blur);
    //hide all buttons
    this.setButtonsVisibility(false, false, false);
    const riseSun = (diff: number) => {
      if (diff > 200) {
        (
          document.getElementsByClassName('currenttext')[0] as HTMLElement
        ).style.visibility = 'visible';
        return;
      }
      if (diff === 140) {
        // show third layer of sun
        (
          document.getElementsByClassName('sunpart')[0] as HTMLElement
        ).style.visibility = 'visible';
      }
      const lo = (Number.parseInt(lightOffset) + diff).toString();
      const sh = (
        diff < Number.parseInt(shadowHeight)
          ? Number.parseInt(shadowHeight) - diff
          : 1
      ).toString();
      const seash = seaShadow.replace(`${shadowHeight}px`, `${sh}px`);
      const go1 =
        (
          Number.parseInt(this.initGrad1Offset.replace('%', '')) +
          offset +
          Math.floor(diff / 2)
        ).toString() + '%';
      const go2 =
        (
          Number.parseInt(this.initGrad2Offset.replace('%', '')) +
          offset +
          Math.floor(diff / 2)
        ).toString() + '%';
      const sPY = (
        Number.parseInt(sunPartY) - Math.floor((4 * diff) / 5)
      ).toString();
      const cOpacity = (
        128 + offset + diff < 255 ? 128 + offset + diff : 255
      ).toString(16);
      const leaf = document.getElementsByClassName(
        'leafcolor'
      )[0] as HTMLElement;
      const parlament = document.getElementsByClassName(
        'parlamentcolor'
      )[0] as HTMLElement;
      const ground = document.getElementsByClassName(
        'groundcolor'
      )[0] as HTMLElement;
      const leafOpacity = (
        diff + this.initLeafOpacity < 255 ? diff + this.initLeafOpacity : 255
      ).toString(16);
      leaf.setAttribute('flood-color', `#006400${leafOpacity}`);
      const parlamentOpacity = (
        diff + this.initParlamentOpacity < 255
          ? diff + this.initParlamentOpacity
          : 255
      ).toString(16);
      parlament.setAttribute('flood-color', `#fefefe${parlamentOpacity}`);
      const groundOpacity = (
        diff + this.initGroundOpacity < 255
          ? diff + this.initGroundOpacity
          : 255
      ).toString(16);
      ground.setAttribute('flood-color', `#5f4527${groundOpacity}`);
      const reflect1 = document.getElementsByClassName(
        'reflect1'
      )[0] as HTMLElement;
      const reflect2 = document.getElementsByClassName(
        'reflect2'
      )[0] as HTMLElement;
      const reflectOpacity = (
        Math.floor(diff / 4) + this.initReflectOpacity
      ).toString(16);
      reflect1.setAttribute('fill', `#f8ff98${reflectOpacity}`);
      reflect2.setAttribute('fill', `#fefefe${reflectOpacity}`);
      this.heightoffset += diff / 20;
      this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
      this.sun
        .withLightOffset(lo)
        .withSeaShadow(seash)
        .withSunGradsOffset(go1, go2)
        .withSunpartY(this.yoffset - Math.floor((4 * diff) / 5))
        .withReflectsPath(this.reflectOffset + diff)
        .withColors(`#287db3${cOpacity}`, `#114f7e${cOpacity}`)
        .withHalo(this.height, this.width, this.upheight, this.blur);
      setTimeout(() => {
        requestAnimationFrame(() => riseSun(diff + 5));
      }, 100);
    };
    requestAnimationFrame(() => riseSun(5));
  }

  goToNextState(): SunState {
    return this;
  }
}

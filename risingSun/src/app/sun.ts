//the class allowing to redraw the sun
export class Sun {
  choice = '';
  reflectOffset = 0;
  yoffset = 0;
  constructor() {}

  setChoice(choice: string) {
    this.choice = choice;
  }

  //Output: the answer from the user to the current question
  getChoice(): string {
    return this.choice;
  }

  getReflectOffset(): number {
    return this.reflectOffset;
  }

  getYOffset(): number {
    return this.yoffset;
  }

  withLightOffset(lightOffset: string) {
    // make lights extend to the right
    Array.from(document.getElementsByClassName('lightoffset')).forEach((el) =>
      (el as HTMLElement).setAttribute('dx', lightOffset)
    );
    return this;
  }

  withCurrentText(currText: string) {
    //change the current text on the screen
    (
      document.getElementsByClassName('currenttext')[0] as HTMLElement
    ).innerHTML = currText;
    return this;
  }

  withSeaShadow(seaShadow: string) {
    // rising the sun reflects on background
    (document.getElementsByClassName('sea')[0] as HTMLElement).style.boxShadow =
      seaShadow;
    return this;
  }
  withSunGradsOffset(sungrad1: string, sungrad2: string) {
    //changing the part of the sun hidden by the sea
    const appendices = ['', '2', '3'];
    appendices.forEach((appendix) => {
      const sungrad = appendix === '' ? sungrad1 : sungrad2;
      document
        .getElementById(`sungrad${appendix}`)
        .children[1].setAttribute('offset', sungrad);
      document
        .getElementById(`sungrad${appendix}`)
        .children[2].setAttribute('offset', sungrad);
    });
    return this;
  }
  withSunpartY(yoffset: number) {
    //changing sun y position
    this.yoffset = yoffset;
    return this;
  }
  withReflectsPath(reflectOffset: number) {
    //changing reflects size
    this.reflectOffset = reflectOffset;
    return this;
  }
  withColors(skyColor: string, seaColor: string) {
    //changing sky and sea colors
    (
      document.getElementsByClassName('sky')[0] as HTMLElement
    ).style.backgroundColor = skyColor;
    (
      document.getElementsByClassName('sea')[0] as HTMLElement
    ).style.backgroundColor = seaColor;
    return this;
  }

  withHalo(height: number, width: number, upheight: number, blur: number) {
    // draw a "salmon" colored gauss curve around the sun with width `width`, height `height` - `upheight` and a blur factor `blur`
    const quart = Math.floor(width / 4);
    const half = Math.floor(width / 2);
    const tqrt = Math.floor((width * 3) / 4);
    (document.getElementsByClassName('halo')[0] as HTMLElement).setAttribute(
      'd',
      `M0 ${height} C${quart} ${height}, ${quart} ${upheight}, ${half} ${upheight}, ${tqrt} ${upheight}, ${tqrt} ${height}, ${width} ${height}`
    );
    (
      document.getElementsByClassName('haloblur')[0] as HTMLElement
    ).setAttribute('stdDeviation', blur.toString());
    return this;
  }
}

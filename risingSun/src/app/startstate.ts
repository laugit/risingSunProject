import { SunState } from './sunstate';
import { HappyChoiceState } from './happychoicestate';
import { Sun } from './sun';

export class StartState extends SunState {
  startText = 'WELCOME, DEAR RESIDENT<br />OF BELGIUM...';
  sun: Sun;
  constructor(sun: Sun) {
    super();
    this.sun = sun;

    //setting sun halo parameters
    this.heightoffset = 0;
    this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
    this.blur = 8;

    this.reflectOffset = 40;
    this.yoffset = 10;

    this.sun
      .withLightOffset('5')
      .withCurrentText(this.startText)
      .withSeaShadow('0 -5vh 75px 15px #ff9d52')
      .withSunGradsOffset('34%', '40%')
      .withSunpartY(this.yoffset)
      .withReflectsPath(this.reflectOffset)
      .withColors('#287db344', '#114f7e44')
      .withHalo(this.height, this.width, this.upheight, this.blur);
    // show first (continue) button and hide 'YES' and 'NO' buttons
    this.setButtonsVisibility(true, false, false);
  }

  goToNextState(): SunState {
    return new HappyChoiceState(this.sun);
  }
}

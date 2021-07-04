import { SunState } from './sunstate';
import { PlaceChoiceState } from './placechoicestate';
import { HappinessChoiceState } from './happinesschoicestate';
import { Sun } from './sun';

export class HappyChoiceState extends SunState {
  questionOne = 'ARE YOU HAPPY WITH YOUR <br />LIFE?';
  sun: Sun;
  constructor(sun: Sun) {
    super();
    this.sun = sun;
    this.heightoffset = 15;
    this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
    this.blur = 10;
    this.yoffset = -5;
    this.reflectOffset = 50;
    this.sun
      .withLightOffset('15')
      .withCurrentText(this.questionOne)
      .withSeaShadow('0 -5vh 90px 40px #ff9d52')
      .withSunGradsOffset('52%', '56%')
      .withSunpartY(this.yoffset)
      .withReflectsPath(this.reflectOffset)
      .withColors('#287db365', '#114f7e65')
      .withHalo(this.height, this.width, this.upheight, this.blur);
    // hide first button and show yes and no buttons
    this.setButtonsVisibility(false, true, true);
  }

  goToNextState(): SunState {
    const nextState =
      this.sun.getChoice() === 'YES'
        ? new PlaceChoiceState(this.sun)
        : new HappinessChoiceState(this.sun);
    return nextState;
  }
}

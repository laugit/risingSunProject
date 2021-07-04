import { SunState } from './sunstate';
import { Sun } from './sun';
import { PlaceChoiceState } from './placechoicestate';

export class HappinessChoiceState extends SunState {
  questionTwoTwo = 'DO YOU WANT TO BE HAPPY?';
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
      .withCurrentText(this.questionTwoTwo)
      .withSeaShadow('0 -5vh 90px 40px #ff9d52')
      .withSunGradsOffset('52%', '56%')
      .withSunpartY(this.yoffset)
      .withReflectsPath(this.reflectOffset)
      .withColors('#287db365', '#114f7e65')
      .withHalo(this.height, this.width, this.upheight, this.blur);
    //hide first button and show yes and no buttons
    this.setButtonsVisibility(false, true, true);
  }

  goToNextState(): SunState {
    if (this.sun.getChoice() === 'NO') {
      // reload the page
      window.location.href = '/';
      return;
    }
    return new PlaceChoiceState(this.sun);
  }
}

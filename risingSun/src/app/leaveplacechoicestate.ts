import { SunState } from './sunstate';
import { Sun } from './sun';
import { MostImportantChoiceState } from './mostimportantchoicestate';

export class LeavePlaceChoiceState extends SunState {
  questionThreeTwo = 'DO YOU WANT TO LEAVE A PLACE <br />TO JOY IN YOUR LIFE?';
  sun: Sun;
  constructor(sun: Sun) {
    super();
    this.sun = sun;
    this.heightoffset = 15;
    this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
    this.blur = 10;
    this.yoffset = -8;
    this.reflectOffset = 50;
    this.sun
      .withLightOffset('15')
      .withCurrentText(this.questionThreeTwo)
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
    if (this.sun.getChoice() === 'NO') {
      //refresh the page
      window.location.href = '/';
      return;
    }
    return new MostImportantChoiceState(this.sun);
  }
}

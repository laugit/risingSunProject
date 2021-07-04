import { SunState } from './sunstate';
import { Sun } from './sun';
import { MostImportantChoiceState } from './mostimportantchoicestate';
import { EndState } from './endstate';

export class SunChoiceState extends SunState {
  questionThreeOne = 'HAVE YOU BEEN EXPOSED TO THE SUN RECENTLY?';
  sun: Sun;
  endtext = 'BE HAPPY AND CONTINUE TO ENJOY THE SUN!';
  constructor(sun: Sun) {
    super();
    this.sun = sun;
    this.heightoffset = 30;
    this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
    this.blur = 12;
    this.yoffset = -12;
    this.reflectOffset = 55;
    this.sun
      .withLightOffset('20')
      .withCurrentText(this.questionThreeOne)
      .withSeaShadow('0 -5vh 100px 45px #ff9d52')
      .withSunGradsOffset('60%', '62%')
      .withSunpartY(this.yoffset)
      .withReflectsPath(this.reflectOffset)
      .withColors('#287db375', '#114f7e75')
      .withHalo(this.height, this.width, this.upheight, this.blur);
    //hide first button and show yes and no buttons
    this.setButtonsVisibility(false, true, true);
  }

  goToNextState(): SunState {
    if (this.sun.getChoice() === 'NO') {
      return new MostImportantChoiceState(this.sun);
    }
    this.sun.withCurrentText(this.endtext);
    (
      document.getElementsByClassName('currenttext')[0] as HTMLElement
    ).style.visibility = 'hidden';
    return new EndState(this.sun.withCurrentText(this.endtext));
  }
}

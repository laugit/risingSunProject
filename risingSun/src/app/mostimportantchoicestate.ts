import { SunState } from './sunstate';
import { Sun } from './sun';
import { ScrollState } from './scrollstate';

export class MostImportantChoiceState extends SunState {
  questionFour = 'DO YOU WANT TO TAKE A MOMENT <br /> TO WATCH THE SUN?';
  sun: Sun;
  constructor(sun: Sun) {
    super();
    this.sun = sun;
    this.heightoffset = 30;
    this.upheight = Math.floor((this.height * 6) / 7) - this.heightoffset;
    this.blur = 15;
    this.yoffset = -12;
    this.reflectOffset = 57;
    this.sun
      .withLightOffset('25')
      .withCurrentText(this.questionFour)
      .withSeaShadow('0 -5vh 110px 50px #ff9d52')
      .withSunGradsOffset('65%', '63%')
      .withSunpartY(this.yoffset)
      .withReflectsPath(this.reflectOffset)
      .withColors('#287db380', '#114f7e80')
      .withHalo(this.height, this.width, this.upheight, this.blur);
    //hide first button and show yes and no buttons
    this.setButtonsVisibility(false, true, true);
  }

  goToNextState(): SunState {
    if (this.sun.getChoice() === 'NO') {
      //refresh the page
      window.location.href = '/';
      return;
    }
    return new ScrollState(this.sun);
  }
}

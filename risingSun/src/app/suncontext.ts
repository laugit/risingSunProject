import { SunState } from './sunstate';
import { StartState } from './startstate';
import { Sun } from './sun';

export class SunContext {
  sunState: SunState;
  sun: Sun;
  constructor(sun: Sun) {
    this.sunState = new StartState(sun);
    this.sun = sun;
  }

  //go to the next state
  handleState() {
    this.sunState = this.sunState.goToNextState();
  }

  getSun() {
    return this.sun;
  }

  getState(): SunState {
    return this.sunState;
  }
}

import { observable } from 'mobx'

class Session {
  @observable logedIn = false;
  @observable editInfo = false;
  @observable newcomer = false;

  @observable email = null;
  @observable taskQueue = [0, 0, 'A'];
  @observable myXcoord = null;
  @observable myYcoord = null;
  @observable narumiXcoord = null;
  @observable narumiYcoord = null;
}

export default Session;

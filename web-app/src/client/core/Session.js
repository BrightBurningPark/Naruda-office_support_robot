import { observable } from 'mobx'

class Session {
  @observable logedIn = false;
  @observable editInfo = false;
  @observable newcomer = false;

  @observable email = null;
  @observable taskQueue = null;
  @observable myXcoord = null;
  @observable myYcoord = null;
  @observable narumiXcoord = null;
  @observable narumiYcoord = null;
}

export default Session;

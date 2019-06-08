import { observable, computed, action } from 'mobx'

class Session {
  @observable logedIn = false;
  @observable email = null;
  @observable xcoord = null;
  @observable ycoord = null;
  @observable newcomer = false;
}

export default Session;

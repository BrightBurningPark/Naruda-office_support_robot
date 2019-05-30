import { observable, computed, action } from 'mobx'

class Session {
  @observable logedIn = false;
  @observable email = null;

}

export default Session;

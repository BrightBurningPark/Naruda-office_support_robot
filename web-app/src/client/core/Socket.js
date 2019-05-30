import io from 'socket.io-client';

class Socket {
  constructor({ session }) {
    this.io = null;
    this.session = session;
  }

  login = () => {
    this.session.logedIn = true;
  }

  signout = () => {
    this.session.logedIn = false;
  }
}

export default Socket;

import io from 'socket.io-client';

class Socket {
  constructor({ session }) {
    this.io = null;
    this.session = session;
  }

  login = (email) => {
    /*
    server에 db 조회 id, password 맞는지 확인
    맞으면 this.session.logedIn = true;
      this.session.email = email;
      this.io = 뭐시기;
    틀리면 false
    */
    this.session.logedIn = true;
    this.session.email = email;
  }

  signout = () => {
    //this.session.logedIn = false; this.io = null;
    this.session.logedIn = false;
    this.session.email = null;
  }
}

export default Socket;

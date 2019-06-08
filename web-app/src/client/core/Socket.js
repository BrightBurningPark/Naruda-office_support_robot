import io from 'socket.io-client';
import axios from 'axios';

class Socket {
  constructor({ session }) {
    this.io = null;
    this.session = session;
  }

  signUp = (email, password, xcoord, ycoord) => {
    /*
    todo: 회원가입 정보 valid한지 확인하는 함수
    */
    this.session.newcomer = false;
  }

  setNewcomer = () => {
    this.session.newcomer = true;
  }

  resetNewcomer = () => {
    this.session.newcomer = false;
  }

  /* function: Socket.auth(email, password)
  서버DB에 확인
  맞으면 login
  틀리면 return false;
  */
  auth = (email, password) => {
    // axios.post('http://localhost:3000/signin', {
    //   email: email,
    //   password: password
    // }).then((res) => {
    //   if (res == 'true') {
    //     console.log('true')
          this.login(email)
    //     return true
    //   }
    //   else if (res == 'false') {
    //     alert('E-mail 혹은 password가 확인되지 않습니다.')
    //     return false
    //   }
    // }).catch(function (error) {
    //   console.log(error)
    // })
  }


  login = (email) => {
    //this.io = socket connection;
    this.session.logedIn = true;
    this.session.email = email;
  }

  signout = () => {
    //this.io = null;
    this.session.logedIn = false;
    this.session.email = null;
  }
}

export default Socket;

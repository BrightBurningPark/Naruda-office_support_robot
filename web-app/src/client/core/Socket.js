import io from 'socket.io-client';
import axios from 'axios';

class Socket {
  constructor({ session }) {
    this.socket = null;
    this.session = session;
  }

  signUp = (email, password, xcoord, ycoord) => {
    var dbCheck = false
    /*
     * axios: DB에 email 이미 존재하는지 확인, res
     */
    if (dbCheck) {
      // db에 새로운 account 추가
      this.session.newcomer = false;
      return true
    }
    return false
  }

  /* Home 컴포넌트에서 조건부 rendering
   * this.session.newcomer => signUpForm render
   * !this.session.newcomer => Home render
   */
  setNewcomer = () => {
    this.session.newcomer = true;
  }
  resetNewcomer = () => {
    this.session.newcomer = false;
  }

  /* function: Socket.auth(email, password)
   * axios: 서버DB에 email과 password 일치 확인
   * 맞으면 login
   * 틀리면 return false;
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
    this.socket = io.connect('http://localhost:3000');
    this.session.logedIn = true;
    this.session.email = email;
  }

  signout = () => {
    this.socket.close();
    this.session.logedIn = false;
    this.session.email = null;
  }
}

export default Socket;

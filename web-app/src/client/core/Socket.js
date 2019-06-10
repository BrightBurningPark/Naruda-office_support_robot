import io from 'socket.io-client';
import axios from 'axios';

// todo : 사용자 위치 DB 동기화?
class Socket {
  constructor({ session }) {
    this.socket = null;
    this.session = session;
    this.myXcoord = null;
    this.myYcoord = null;
  }

  signUp = (email, name, password) => {
    var dbCheck = false

    // axios: email, name, password 보내고 res.code에 따라 행동
    axios.post('http://localhost:3000/signup', {
      email: email,
      name: name,
      password: password
    }).then((res) => {
      return res;
    }).catch(function (error) {
      console.log(error)
    })
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
    axios.post('http://localhost:3000/signin', {
      email: email,
      password: password
    }).then((res) => {
      console.log(res.data)
      if (res.data == false) {
        console.log('login success')
        return false
      }
      else {
        console.log('login failed')
        this.login(email)
        return true
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  login = (email) => {
    this.socket = io.connect('http://localhost:3000');
    this.session.logedIn = true;
    this.session.email = email;
  }

  signout = () => {
    this.socket.off('update_pos')
    this.socket.off('update_task')
    this.socket.close();
    this.session.logedIn = false;
    this.session.email = null;
  }

  setMyPos = () => {

  }

  addTask = (xcoord, ycoord) => {
    this.socket.emit('new_task', { fromXcoord: this.myXcoord, fromYcoord: this.myYcoord, toXcoord: xcoord, toYcoord: ycoord })
    console.log('emit new_task')
  }

  updatePos = () => {
    return new Promise((resolve, reject) => {
      this.socket.on('update_pos', (res) => {
        console.log(res);
        resolve(res)
      })
    })
  }

  updateTask = () => {
    return new Promise((resolve, reject) => {
      this.socket.on('update_task', (res) => {
        console.log(res);
        resolve(res)
      })
    })
  }
}

export default Socket;

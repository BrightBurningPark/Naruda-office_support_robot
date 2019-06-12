import io from 'socket.io-client';
import axios from 'axios';

// todo : 사용자 위치 DB 동기화?
class Socket {
  constructor({ session }) {
    this.socket = null;
    this.session = session;
  }

  signUp = (email, name, password) => {
    axios.post('http://13.209.49.139:3000/signup', {
      email: email,
      name: name,
      password: password
    }).then((res) => {
      if (res.data == 'signup_success') {
        console.log('signup success')
        this.resetNewcomer()
      }
      else if (res.data == 'email_error') {
        console.log('email error')
      }
      else
        console.log(res.data)
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
    axios.post('http://13.209.49.139:3000/signin', {
      email: email,
      password: password
    }).then((res) => {
      console.log(res.data)
      if (res.data == false) {
        console.log('login failed')
        return false
      }
      else {
        console.log('login success')
        this.login(email, res.data[0], res.data[1])
        return true
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  login = (email, x, y) => {
    this.socket = io.connect('http://13.209.49.139:3000');
    this.session.email = email;
    this.session.myXcoord = x;
    this.session.myYcoord = y;
    this.session.logedIn = true;
  }

  signout = () => {
    this.socket.off('update_pos')
    this.socket.off('update_task')
    this.socket.close();
    this.session.logedIn = false;
    this.session.email = null;
    this.session.myXcoord = null;
    this.session.myYcoord = null;
  }

  addTask = (xcoord, ycoord) => {
    this.socket.emit('new_task', { fromXcoord: this.session.myXcoord, fromYcoord: this.session.myYcoord, toXcoord: xcoord, toYcoord: ycoord })
    console.log('emit new_task')
  }

  updatePos = () => {
    return new Promise((resolve, reject) => {
      this.socket.on('update_pos', (res) => {
        this.session.narumiXcoord = parseInt(res.xcoord, 10)
        this.session.narumiYcoord = parseInt(res.ycoord, 10)
        resolve(res)
      })
    })
  }

  updateTask = () => {
    return new Promise((resolve, reject) => {
      this.socket.on('update_task', (res) => {
        if (res._arr) {
          console.log('is res._arr : ' + res._arr)
          this.session.taskQueue = res._arr
        }
      })
    })
  }
}

export default Socket;

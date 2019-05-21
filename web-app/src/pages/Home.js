import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/LoginForm'

const Home = () => {
  return (
    <div>
      <LoginForm></LoginForm>
      <Link to="/Main">서비스로 이동</Link>
    </div >
  );
};

export default Home;
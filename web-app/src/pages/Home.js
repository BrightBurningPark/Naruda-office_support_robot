import React from 'react'
import { Link } from 'react-router-dom'
import HomeMenu from '../components/HomeMenu'

const Home = () => {
  return (
    <div>
      <p>안녕하세요.</p>
      <p>Narumi 서비스를 이용해주셔서 감사합니다.</p>
      <HomeMenu></HomeMenu>
      <Link to="/Main">서비스로 이동</Link>
    </div >
  );
};

export default Home;
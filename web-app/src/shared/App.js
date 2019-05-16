import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Main } from '../pages';

const App = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/main" component={Main} />
    </div>
  );
};

export default App;
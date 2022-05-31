import { Pane } from 'evergreen-ui';
import { Route, Routes } from 'react-router-dom';
import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Transfer from './components/Transfer';
import Game from './components/Game';
import Menu from './elements/Menu';
import Admin from './components/Admin';
import Api from './components/API';

function App() {
  return (
    <Pane
      display="flex"
      justifyContent="center"
      flexDirection="column"
      maxWidth={1000}
      width="100%"
      margin="auto"
    >
      <Menu></Menu>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/transfer" element={<Transfer />} />
        <Route exact path="/game/:type/:id" element={<Game />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/api" element={<Api />} />
      </Routes>
    </Pane>
  );
}

export default App;

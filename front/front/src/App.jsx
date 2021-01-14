import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';

// Components
import { Posts } from './containers/Posts.jsx';
import Users from './containers/Users.jsx';

function App() {
  return (
    <Router>
      <Switch>
        {/* 投稿一覧 */}
        <Route exact path="/posts" component={Posts} />
        {/* ユーザー一覧 */}
        <Route exact path="/posts" component={Users} />
      </Switch>
    </Router>
  )
}

export default App;
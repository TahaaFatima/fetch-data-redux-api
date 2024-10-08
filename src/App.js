import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PostsList from './components/PostsList';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PostsList />
      </div>
    </Provider>
  );
}

export default App;

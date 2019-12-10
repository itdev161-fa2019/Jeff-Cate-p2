import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';

class App extends Component {
  state = {
    todos: [
    {
      id: 1,
      title: "Take out Trash",
      comlete: false
    },
    {
      id: 2,
      title: "Empty dish washer",
      comlete: false
    },
    {
      id: 3,
      title: "Load dish washer",
      comlete: false
    }]
  };

  render () {
    return (
      <div className="App">
        <Todos />
      </div>
    );
  }
}
export default App;

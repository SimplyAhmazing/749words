import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {wordCount: 0}

    this.updateCount = this.updateCount.bind(this)
  }

  updateCount (e) {
    this.setState({wordCount: e.target.value.split(' ').length})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to 749 Words</h1>
        </header>
        <p className="App-intro">
          <textarea
            className="editor"
            onChange={this.updateCount}
            rows="20"
            cols="40"></textarea>
        </p>
        <footer>
          <div className="word-counter">{this.state.wordCount}</div>
        </footer>
      </div>
    );
  }
}

export default App;

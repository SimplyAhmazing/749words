import React, { Component } from 'react';
import update from 'immutability-helper';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {wordCount: 0, postBody: props.postBody || '', postBodyHidden: props.postBodyHidden || ''}

    this.updateCount = this.updateCount.bind(this)
    this.updatePost = this.updatePost.bind(this)
    this.handlePostChange = this.handlePostChange.bind(this)
  }

  updateCount (e) {
    const rows = e.target.value.split('\n').map(w => w.trim()).map(w => w.split(' '))
    const counts = rows.map(r => r === "" ? 0 : r.length)
    let tot = 0
    counts.forEach(n => {tot += n})

    const newState = update(
      this.state,
      {wordCount: {$set: tot}})
    this.setState(newState)
  }

  updatePost (e) {
    const rawPost = e.target.value
    const hiddenPost = Array.from(rawPost).map(char => char === ' ' ? ' ' : '*')//.join('')
    console.log(hiddenPost)
    const newState = update(this.state,
      {postBody: {$set: rawPost}},
      {postBodyHidden: {$set: hiddenPost}}
    )

    this.setState(newState)
  }

  _savePost(data) {
    fetch('/post', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({post: data})
    }).then(response => {
      console.log(response.json)
    }).catch(err => {
      console.log(err)
    })
  }
  
  _handleKeyDown(event) {
    if (event.metaKey && event.which === 83) {
      event.preventDefault()
      this._savePost()
      console.log('Submitting.')
    }
  }

  handlePostChange(...args) {
    this.updateCount(...args)
    this.updatePost(...args)
  }

  componentWillMount() {
    document.addEventListener("keydown", this._handleKeyDown.bind(this))
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
            onChange={this.handlePostChange}
            value={this.state.postBodyHidden}
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

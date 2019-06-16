import React from 'react';
import './App.css';

import { sounds } from './Sound'

class DrumPad extends React.Component{
  constructor(props){
    super(props)
    this.audio = React.createRef()

    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount(){
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount(){
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(e){
    if(e.keyCode === this.props.keyCode){
      this.audio.current.play()
      this.props.handleDisplay(this.props.name)
    }
  }

  handleClick(name){
    this.audio.current.play()
    this.props.handleDisplay(this.props.name)
  }

  render(){
    return(
      <button onClick={this.handleClick} className="drum-pad" id={this.props.keyCode}>
        {this.props.letter}
        <audio
          ref={this.audio}
          className="clip" 
          id={this.props.letter} 
          src={this.props.src}
        />
      </button>
    )
  }
}

class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      display: 'Press a key or button'
    }

    this.handleDisplay = this.handleDisplay.bind(this)
  }

  handleDisplay(display){
    this.setState({ display })
  }

  render(){
    return(
      <div id="drum-machine">
        <h2 id="display">{this.state.display}</h2>
        <div id="drum-pad-container">
          {sounds.map(sound => (
            <DrumPad 
              name={sound.name}
              letter={sound.letter}
              src={sound.src}
              key={sound.letter.charCodeAt()}
              keyCode={sound.letter.charCodeAt()}
              handleDisplay={this.handleDisplay}
            />
          ))}
        </div>
      </div>
    )
  }
}

export default App;
